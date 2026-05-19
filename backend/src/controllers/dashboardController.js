import AlertModel from "../models/AlertModel.js";
import LoginAttemptModel from "../models/LoginAttemptModel.js";
import RiskAnalysisModel from "../models/RiskAnalysisModel.js";
import ThreatLogModel from "../models/ThreatLogModel.js";
import { DashboardManager } from "../classes/DashboardManager.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const dashboardManager = new DashboardManager({
  LoginAttemptModel,
  AlertModel,
  ThreatLogModel,
  RiskAnalysisModel
});

export const getDashboard = asyncHandler(async (req, res) => {
  const overview = await dashboardManager.getOverview();

  res.json({
    success: true,
    data: overview
  });
});

export const getSystemStatus = asyncHandler(async (req, res) => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const [events, activeAlerts, criticalAlerts, latestRisk] = await Promise.all([
    LoginAttemptModel.countDocuments({ createdAt: { $gte: fiveMinutesAgo } }),
    AlertModel.countDocuments({ acknowledged: false }),
    AlertModel.countDocuments({ acknowledged: false, level: "Critical" }),
    RiskAnalysisModel.findOne().sort({ createdAt: -1 }).lean()
  ]);

  res.json({
    success: true,
    data: {
      apiGateway: "Online",
      threatEngine: "Active",
      database: "Connected",
      aiAnalyzer: "Analysis Mode",
      eventsPerFiveMinutes: events,
      activeAlerts,
      criticalAlerts,
      latestRiskScore: latestRisk?.score || 0,
      updatedAt: new Date()
    }
  });
});
