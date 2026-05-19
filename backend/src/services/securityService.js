import AlertModel from "../models/AlertModel.js";
import LoginAttemptModel from "../models/LoginAttemptModel.js";
import RiskAnalysisModel from "../models/RiskAnalysisModel.js";
import ThreatLogModel from "../models/ThreatLogModel.js";
import { AlertSystem } from "../classes/AlertSystem.js";
import { ThreatDetector } from "../classes/ThreatDetector.js";
import { ThreatLogger } from "../classes/ThreatLogger.js";

const detector = new ThreatDetector();
const alertSystem = new AlertSystem();
const threatLogger = new ThreatLogger();

export async function runThreatPipeline(attemptDocument) {
  const attempt = attemptDocument.toObject ? attemptDocument.toObject() : attemptDocument;
  const now = Date.now();
  const tenMinutesAgo = new Date(now - 10 * 60 * 1000);
  const oneMinuteAgo = new Date(now - 60 * 1000);

  const [recentFailures, rapidRequests, ipFailures] = await Promise.all([
    LoginAttemptModel.countDocuments({
      email: attempt.email,
      success: false,
      createdAt: { $gte: tenMinutesAgo }
    }),
    LoginAttemptModel.countDocuments({
      ipAddress: attempt.ipAddress,
      createdAt: { $gte: oneMinuteAgo }
    }),
    LoginAttemptModel.countDocuments({
      ipAddress: attempt.ipAddress,
      success: false,
      createdAt: { $gte: tenMinutesAgo }
    })
  ]);

  const context = {
    recentFailures,
    rapidRequests,
    ipFailures
  };

  const analysis = detector.analyze(attempt, context);

  const riskAnalysis = await RiskAnalysisModel.create({
    email: attempt.email,
    ipAddress: attempt.ipAddress,
    score: analysis.score,
    level: analysis.level,
    factors: analysis.factors,
    recommendations: analysis.recommendations,
    analysis: analysis.analysis,
    metadata: {
      detector: analysis.detector,
      context
    }
  });

  const threatLog = analysis.score >= 25 || !attempt.success
    ? await ThreatLogModel.create(threatLogger.buildLog(analysis, attempt))
    : null;

  const alert = alertSystem.shouldCreateAlert(analysis)
    ? await AlertModel.create(alertSystem.buildAlert(analysis, attempt))
    : null;

  return {
    analysis,
    riskAnalysis,
    threatLog,
    alert
  };
}
