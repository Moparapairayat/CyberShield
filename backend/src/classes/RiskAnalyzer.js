export class RiskAnalyzer {
  #weights;

  constructor() {
    this.#weights = {
      failedLogin: 16,
      rapidRequest: 18,
      suspiciousIp: 22,
      unknownUser: 10,
      attackSimulation: 26,
      accountLockout: 20,
      criticalPattern: 18
    };
  }

  calculateScore({ attempt, context, factors }) {
    let score = attempt.success ? 8 : this.#weights.failedLogin;

    if (context.recentFailures >= 3) score += this.#weights.failedLogin;
    if (context.recentFailures >= 6) score += this.#weights.criticalPattern;
    if (context.rapidRequests >= 5) score += this.#weights.rapidRequest;
    if (context.ipFailures >= 6) score += this.#weights.suspiciousIp;
    if (attempt.reason === "User not found") score += this.#weights.unknownUser;
    if (attempt.metadata?.simulation) score += this.#weights.attackSimulation;
    if (attempt.reason?.includes("Account locked")) score += this.#weights.accountLockout;

    score += Math.min(factors.length * 4, 12);
    return Math.min(score, 100);
  }

  predictLevel(score) {
    if (score >= 85) return "Critical";
    if (score >= 65) return "High";
    if (score >= 35) return "Medium";
    return "Low";
  }

  buildRecommendations(level, factors) {
    const recommendations = [];

    if (factors.includes("Multiple failed login attempts")) {
      recommendations.push("Temporarily lock the account and require password reset verification.");
    }

    if (factors.includes("Rapid repeated requests")) {
      recommendations.push("Throttle requests from this IP and review rate-limit logs.");
    }

    if (factors.includes("Suspicious IP behavior")) {
      recommendations.push("Add the IP to a watchlist and inspect geolocation or VPN patterns.");
    }

    if (level === "Critical") {
      recommendations.push("Escalate to incident response and preserve authentication logs.");
    }

    if (factors.includes("Automatic account lockout")) {
      recommendations.push("Keep the account locked temporarily and verify the owner before reactivation.");
    }

    if (recommendations.length === 0) {
      recommendations.push("Continue monitoring this identity and enforce strong password hygiene.");
    }

    return recommendations;
  }
}
