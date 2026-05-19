import LoginAttemptModel from "../models/LoginAttemptModel.js";
import ThreatLogModel from "../models/ThreatLogModel.js";
import { AttackSimulator } from "../classes/AttackSimulator.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runThreatPipeline } from "../services/securityService.js";

const simulator = new AttackSimulator({
  LoginAttemptModel,
  runThreatPipeline
});

export const getThreatLogs = asyncHandler(async (req, res) => {
  const { search = "", level = "", category = "", page = 1, limit = 20 } = req.query;
  const query = {};

  if (level) query.level = level;
  if (category) query.category = new RegExp(category, "i");
  if (search) {
    query.$or = [
      { email: new RegExp(search, "i") },
      { ipAddress: new RegExp(search, "i") },
      { event: new RegExp(search, "i") },
      { description: new RegExp(search, "i") }
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [logs, total] = await Promise.all([
    ThreatLogModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
    ThreatLogModel.countDocuments(query)
  ]);

  res.json({
    success: true,
    data: {
      logs,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)) || 1
    }
  });
});

export const getThreatAnalytics = asyncHandler(async (req, res) => {
  const since30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [frequency, distribution, topIps, failedLogins] = await Promise.all([
    ThreatLogModel.aggregate([
      { $match: { createdAt: { $gte: since30d } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          threats: { $sum: 1 },
          averageScore: { $avg: "$score" }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    ThreatLogModel.aggregate([
      { $group: { _id: "$level", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]),
    ThreatLogModel.aggregate([
      { $group: { _id: "$ipAddress", count: { $sum: 1 }, maxScore: { $max: "$score" } } },
      { $sort: { count: -1 } },
      { $limit: 8 }
    ]),
    LoginAttemptModel.aggregate([
      { $match: { createdAt: { $gte: since30d } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          failed: { $sum: { $cond: [{ $eq: ["$success", false] }, 1, 0] } },
          success: { $sum: { $cond: [{ $eq: ["$success", true] }, 1, 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ])
  ]);

  res.json({
    success: true,
    data: {
      frequency,
      distribution,
      topIps,
      failedLogins
    }
  });
});

export const simulateBruteForce = asyncHandler(async (req, res) => {
  const result = await simulator.simulateBruteForce(req.body || {});

  res.status(201).json({
    success: true,
    message: "Brute-force simulation completed successfully.",
    data: result
  });
});

export const simulateUnknownAccount = asyncHandler(async (req, res) => {
  const result = await simulator.simulateUnknownAccount(req.body || {});

  res.status(201).json({
    success: true,
    message: "Unknown-account simulation completed successfully.",
    data: result
  });
});


export const simulateSuspiciousRequests = asyncHandler(async (req, res) => {
  const result = await simulator.simulateSuspiciousRequests(req.body || {});

  res.status(201).json({
    success: true,
    message: "Rapid-request simulation completed successfully.",
    data: result
  });
});
