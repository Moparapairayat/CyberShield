import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    department: {
      type: String,
      default: "Cyber Operations"
    },
    lastLoginAt: Date,
    loginCount: {
      type: Number,
      default: 0
    },
    security: {
      failedLoginCount: {
        type: Number,
        default: 0
      },
      lockedUntil: {
        type: Date,
        default: null
      },
      lastFailedLoginAt: {
        type: Date,
        default: null
      },
      lockReason: {
        type: String,
        default: null
      }
    },
    preferences: {
      soundAlerts: {
        type: Boolean,
        default: true
      },
      theme: {
        type: String,
        enum: ["dark", "light"],
        default: "dark"
      }
    }
  },
  {
    timestamps: true,
    collection: "users"
  }
);

userSchema.virtual("password").set(function setPassword(password) {
  this.passwordHash = password;
});

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("passwordHash")) {
    return next();
  }

  const salt = await bcrypt.genSalt(12);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  const lockedUntil = this.security?.lockedUntil || null;

  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    department: this.department,
    lastLoginAt: this.lastLoginAt,
    loginCount: this.loginCount,
    security: {
      failedLoginCount: this.security?.failedLoginCount || 0,
      lockedUntil,
      lockReason: this.security?.lockReason || null,
      isLocked: lockedUntil ? lockedUntil > new Date() : false
    },
    preferences: this.preferences,
    createdAt: this.createdAt
  };
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
