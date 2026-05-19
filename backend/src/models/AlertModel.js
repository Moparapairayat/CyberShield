import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      required: true
    },
    type: {
      type: String,
      enum: ["info", "warning", "danger", "critical"],
      default: "info"
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    email: String,
    ipAddress: String,
    recommendation: String,
    acknowledged: {
      type: Boolean,
      default: false
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true,
    collection: "alerts"
  }
);

alertSchema.index({ level: 1, createdAt: -1 });
alertSchema.index({ acknowledged: 1, createdAt: -1 });

const AlertModel = mongoose.model("Alert", alertSchema);

export default AlertModel;
