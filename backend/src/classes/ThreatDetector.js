import { BaseThreatAnalyzer } from "./BaseThreatAnalyzer.js";
import { RiskAnalyzer } from "./RiskAnalyzer.js";

export class ThreatDetector extends BaseThreatAnalyzer {
  constructor() {
    super("AI-Like Login Threat Detector");
    this.riskAnalyzer = new RiskAnalyzer();
  }

  analyze(attempt, context) {
    const factors = [];
    const categories = [];

    if (!attempt.success) {
      factors.push("Failed login attempt");
      categories.push("Authentication Failure");
    }

    if (context.recentFailures >= 3) {
      factors.push("Multiple failed login attempts");
      categories.push("Credential Attack");
    }

    if (context.rapidRequests >= 5) {
      factors.push("Rapid repeated requests");
      categories.push("Rate Abuse");
    }

    if (context.ipFailures >= 6) {
      factors.push("Suspicious IP behavior");
      categories.push("Suspicious IP");
    }

    if (attempt.metadata?.simulation) {
      factors.push("Attack simulator signal");
      categories.push(attempt.metadata.attackType || "Simulation");
    }

    if (attempt.reason === "User not found") {
      factors.push("Unknown account target");
      categories.push("Account Enumeration");
    }

    if (attempt.reason?.includes("Account locked")) {
      factors.push("Automatic account lockout");
      categories.push("Account Lockout");
    }

    const score = this.riskAnalyzer.calculateScore({ attempt, context, factors });
    const level = this.riskAnalyzer.predictLevel(score);
    const recommendations = this.riskAnalyzer.buildRecommendations(level, factors);

    return {
      detector: this.name,
      score,
      level,
      factors,
      categories: [...new Set(categories.length ? categories : ["Normal Activity"])],
      recommendations,
      analysis: this.#buildAnalysis(level, score, factors)
    };
  }

  #buildAnalysis(level, score, factors) {
    if (level === "Critical") {
      return `Critical threat predicted with score ${score}. Immediate admin review is recommended.`;
    }

    if (level === "High") {
      return `High-risk behavior detected with score ${score}. The pattern should be investigated.`;
    }

    if (level === "Medium") {
      return `Moderate anomaly detected with score ${score}. Continue monitoring related events.`;
    }

    return factors.length
      ? `Low-level signal detected with score ${score}.`
      : `No meaningful threat pattern detected. Risk score ${score}.`;
  }
}
