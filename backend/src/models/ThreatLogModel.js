import mongoose from "mongoose";

const threatLogSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      required: true
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    event: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    email: String,
    ipAddress: String,
    source: {
      type: String,
      default: "ThreatDetector"
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true,
    collection: "threatLogs"
  }
);

threatLogSchema.index({ category: 1, createdAt: -1 });
threatLogSchema.index({ level: 1, createdAt: -1 });
threatLogSchema.index({ ipAddress: 1, createdAt: -1 });

const ThreatLogModel = mongoose.model("ThreatLog", threatLogSchema);

export default ThreatLogModel;
