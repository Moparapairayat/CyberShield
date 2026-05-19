import { AppError } from "./errorMiddleware.js";
import { verifyToken } from "../utils/token.js";
import UserModel from "../models/UserModel.js";

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      throw new AppError("Authentication token is required.", 401);
    }

    const decoded = verifyToken(token);
    const user = await UserModel.findById(decoded.id).select("-passwordHash");

    if (!user) {
      throw new AppError("User session is no longer valid.", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new AppError("Invalid or expired token.", 401));
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return next(new AppError("Admin access is required.", 403));
  }

  next();
}
