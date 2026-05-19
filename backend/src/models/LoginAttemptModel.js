import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    ipAddress: {
      type: String,
      required: true
    },
    userAgent: {
      type: String,
      default: "Unknown client"
    },
    endpoint: {
      type: String,
      default: "POST /api/auth/login"
    },
    success: {
      type: Boolean,
      required: true
    },
    reason: {
      type: String,
      default: "Login attempt recorded"
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true,
    collection: "loginAttempts"
  }
);

loginAttemptSchema.index({ email: 1, createdAt: -1 });
loginAttemptSchema.index({ ipAddress: 1, createdAt: -1 });

const LoginAttemptModel = mongoose.model("LoginAttempt", loginAttemptSchema);

export default LoginAttemptModel;
