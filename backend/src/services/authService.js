import LoginAttemptModel from "../models/LoginAttemptModel.js";
import UserModel from "../models/UserModel.js";
import { Admin } from "../classes/Admin.js";
import { User } from "../classes/User.js";
import { AppError } from "../middleware/errorMiddleware.js";
import { signToken } from "../utils/token.js";
import { runThreatPipeline } from "./securityService.js";

const LOCK_THRESHOLD = 5;
const LOCK_DURATION_MINUTES = 15;

export class AuthService {
  createDomainUser(userDocument) {
    const rawUser = userDocument.toObject ? userDocument.toObject() : userDocument;
    const payload = {
      id: rawUser._id?.toString() || rawUser.id,
      name: rawUser.name,
      email: rawUser.email,
      passwordHash: rawUser.passwordHash,
      role: rawUser.role,
      department: rawUser.department
    };

    return rawUser.role === "admin" ? new Admin(payload) : new User(payload);
  }

  async register({ name, email, password, department }) {
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await UserModel.findOne({ email: normalizedEmail });

    if (existingUser) {
      throw new AppError("An account with this email already exists.", 409);
    }

    const user = await UserModel.create({
      name,
      email: normalizedEmail,
      password,
      department
    });

    const token = signToken({ id: user._id, role: user.role });

    return {
      user: user.toSafeJSON(),
      domainUser: this.createDomainUser(user).getProfile(),
      token
    };
  }

  async login({ email, password, expectedRole = null, requestInfo }) {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await UserModel.findOne({ email: normalizedEmail }).select("+passwordHash");

    if (!user) {
      await this.#recordRejectedLogin({
        normalizedEmail,
        requestInfo,
        reason: "User not found"
      });
    }

    if (expectedRole && user.role !== expectedRole) {
      await this.#recordRejectedLogin({
        normalizedEmail,
        requestInfo,
        userId: user._id,
        reason: `Role mismatch: ${expectedRole} required`
      });
    }

    if (this.#isAccountLocked(user)) {
      await this.#recordRejectedLogin({
        normalizedEmail,
        requestInfo,
        userId: user._id,
        reason: "Account locked",
        publicMessage: "Account temporarily locked due to repeated failed login attempts.",
        statusCode: 423,
        lockout: this.#buildLockoutDetails(user)
      });
    }

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      const lockout = await this.#registerFailedPassword(user);
      await this.#recordRejectedLogin({
        normalizedEmail,
        requestInfo,
        userId: user._id,
        reason: lockout.isLocked ? "Account locked after repeated failures" : "Invalid password",
        publicMessage: lockout.isLocked
          ? "Account temporarily locked due to repeated failed login attempts."
          : "Invalid email or password.",
        statusCode: lockout.isLocked ? 423 : 401,
        lockout
      });
    }

    user.lastLoginAt = new Date();
    user.loginCount += 1;
    user.security.failedLoginCount = 0;
    user.security.lockedUntil = null;
    user.security.lastFailedLoginAt = null;
    user.security.lockReason = null;
    await user.save();

    const attempt = await LoginAttemptModel.create({
      email: normalizedEmail,
      userId: user._id,
      ipAddress: requestInfo.ipAddress,
      userAgent: requestInfo.userAgent,
      endpoint: requestInfo.endpoint,
      success: true,
      reason: "Successful authentication"
    });

    const threatResult = await runThreatPipeline(attempt);
    const token = signToken({ id: user._id, role: user.role });
    const domainUser = this.createDomainUser(user);

    return {
      user: user.toSafeJSON(),
      domainUser: domainUser.getProfile(),
      token,
      threatResult
    };
  }

  #isAccountLocked(user) {
    const lockedUntil = user.security?.lockedUntil;
    return Boolean(lockedUntil && lockedUntil > new Date());
  }

  #buildLockoutDetails(user) {
    return {
      isLocked: this.#isAccountLocked(user),
      failedLoginCount: user.security?.failedLoginCount || 0,
      lockedUntil: user.security?.lockedUntil || null,
      lockReason: user.security?.lockReason || null,
      threshold: LOCK_THRESHOLD,
      durationMinutes: LOCK_DURATION_MINUTES
    };
  }

  async #registerFailedPassword(user) {
    user.security.failedLoginCount = (user.security?.failedLoginCount || 0) + 1;
    user.security.lastFailedLoginAt = new Date();

    if (user.security.failedLoginCount >= LOCK_THRESHOLD) {
      user.security.lockedUntil = new Date(Date.now() + LOCK_DURATION_MINUTES * 60 * 1000);
      user.security.lockReason = `Reached ${LOCK_THRESHOLD} failed login attempts`;
    }

    await user.save();
    return this.#buildLockoutDetails(user);
  }

  async #recordRejectedLogin({
    normalizedEmail,
    requestInfo,
    userId = null,
    reason,
    publicMessage = "Invalid email or password.",
    statusCode = 401,
    lockout = null
  }) {
    const attempt = await LoginAttemptModel.create({
      email: normalizedEmail,
      userId,
      ipAddress: requestInfo.ipAddress,
      userAgent: requestInfo.userAgent,
      endpoint: requestInfo.endpoint,
      success: false,
      reason
    });

    const threatResult = await runThreatPipeline(attempt);

    throw new AppError(publicMessage, statusCode, {
      risk: {
        score: threatResult.analysis.score,
        level: threatResult.analysis.level,
        factors: threatResult.analysis.factors
      },
      lockout,
      alert: threatResult.alert
        ? {
            title: threatResult.alert.title,
            level: threatResult.alert.level
          }
        : null
    });
  }
}

export const authService = new AuthService();
