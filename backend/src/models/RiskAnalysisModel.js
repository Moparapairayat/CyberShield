import mongoose from "mongoose";

const riskAnalysisSchema = new mongoose.Schema(
  {
    email: String,
    ipAddress: String,
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    level: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      required: true
    },
    factors: {
      type: [String],
      default: []
    },
    recommendations: {
      type: [String],
      default: []
    },
    analysis: {
      type: String,
      required: true
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true,
    collection: "riskAnalysis"
  }
);

riskAnalysisSchema.index({ level: 1, createdAt: -1 });
riskAnalysisSchema.index({ score: -1, createdAt: -1 });

const RiskAnalysisModel = mongoose.model("RiskAnalysis", riskAnalysisSchema);

export default RiskAnalysisModel;
