import mongoose from "mongoose";
import { env } from "../src/config/env.js";
import AlertModel from "../src/models/AlertModel.js";
import LoginAttemptModel from "../src/models/LoginAttemptModel.js";
import RiskAnalysisModel from "../src/models/RiskAnalysisModel.js";
import ThreatLogModel from "../src/models/ThreatLogModel.js";
import UserModel from "../src/models/UserModel.js";
import { AttackSimulator } from "../src/classes/AttackSimulator.js";
import { runThreatPipeline } from "../src/services/securityService.js";

const daysAgo = (days, hours = 0) => new Date(Date.now() - (days * 24 + hours) * 60 * 60 * 1000);

async function seed() {
  await mongoose.connect(env.mongoUri);

  await Promise.all([
    UserModel.deleteMany({}),
    LoginAttemptModel.deleteMany({}),
    AlertModel.deleteMany({}),
    ThreatLogModel.deleteMany({}),
    RiskAnalysisModel.deleteMany({})
  ]);

  const admin = await UserModel.create({
    name: "Cyber Admin",
    email: "admin@cybershield.local",
    password: "Admin@12345",
    role: "admin",
    department: "Security Operations Center"
  });

  const analyst = await UserModel.create({
    name: "Demo Analyst",
    email: "analyst@cybershield.local",
    password: "User@12345",
    role: "user",
    department: "Threat Intelligence"
  });

  await LoginAttemptModel.insertMany([
    {
      email: analyst.email,
      userId: analyst._id,
      ipAddress: "10.0.0.12",
      userAgent: "Chrome / Windows",
      success: true,
      reason: "Successful authentication",
      createdAt: daysAgo(6),
      updatedAt: daysAgo(6)
    },
    {
      email: "unknown@cybershield.local",
      ipAddress: "198.51.100.33",
      userAgent: "curl/8.0",
      success: false,
      reason: "User not found",
      createdAt: daysAgo(5, 2),
      updatedAt: daysAgo(5, 2)
    },
    {
      email: admin.email,
      userId: admin._id,
      ipAddress: "203.0.113.20",
      userAgent: "Python requests",
      success: false,
      reason: "Invalid password",
      createdAt: daysAgo(3, 4),
      updatedAt: daysAgo(3, 4)
    }
  ]);

  await ThreatLogModel.insertMany([
    {
      category: "Account Enumeration",
      level: "Medium",
      score: 48,
      event: "Unknown account target detected",
      description: "Repeated attempts were made against accounts that do not exist.",
      email: "unknown@cybershield.local",
      ipAddress: "198.51.100.33",
      createdAt: daysAgo(5, 2),
      updatedAt: daysAgo(5, 2)
    },
    {
      category: "Credential Attack",
      level: "High",
      score: 72,
      event: "Password guessing pattern detected",
      description: "Failed administrator authentication attempts crossed the warning threshold.",
      email: admin.email,
      ipAddress: "203.0.113.20",
      createdAt: daysAgo(3, 4),
      updatedAt: daysAgo(3, 4)
    }
  ]);

  await AlertModel.insertMany([
    {
      title: "Suspicious Login Pattern",
      message: "CyberShield detected unknown account targeting from 198.51.100.33.",
      level: "Medium",
      type: "warning",
      score: 48,
      email: "unknown@cybershield.local",
      ipAddress: "198.51.100.33",
      recommendation: "Watchlist the IP and monitor account enumeration patterns.",
      acknowledged: true,
      createdAt: daysAgo(5, 2),
      updatedAt: daysAgo(5, 2)
    },
    {
      title: "High Threat Detected",
      message: "High-risk behavior detected against the administrator account.",
      level: "High",
      type: "danger",
      score: 72,
      email: admin.email,
      ipAddress: "203.0.113.20",
      recommendation: "Require MFA and inspect administrator authentication logs.",
      acknowledged: false,
      createdAt: daysAgo(3, 4),
      updatedAt: daysAgo(3, 4)
    }
  ]);

  await RiskAnalysisModel.insertMany([
    {
      email: "unknown@cybershield.local",
      ipAddress: "198.51.100.33",
      score: 48,
      level: "Medium",
      factors: ["Unknown account target", "Failed login attempt"],
      recommendations: ["Watchlist the IP and monitor account enumeration patterns."],
      analysis: "Moderate anomaly detected with score 48.",
      createdAt: daysAgo(5, 2),
      updatedAt: daysAgo(5, 2)
    },
    {
      email: admin.email,
      ipAddress: "203.0.113.20",
      score: 72,
      level: "High",
      factors: ["Multiple failed login attempts", "Suspicious IP behavior"],
      recommendations: ["Require MFA and inspect administrator authentication logs."],
      analysis: "High-risk behavior detected with score 72.",
      createdAt: daysAgo(3, 4),
      updatedAt: daysAgo(3, 4)
    }
  ]);

  const simulator = new AttackSimulator({
    LoginAttemptModel,
    runThreatPipeline
  });

  await simulator.simulateBruteForce({
    email: admin.email,
    ipAddress: "203.0.113.91"
  });

  console.log("CyberShield seed completed.");
  console.log("Admin: admin@cybershield.local / Admin@12345");
  console.log("User: analyst@cybershield.local / User@12345");

  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});

