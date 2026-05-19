export class AttackSimulator {
  constructor({ LoginAttemptModel, runThreatPipeline }) {
    this.LoginAttemptModel = LoginAttemptModel;
    this.runThreatPipeline = runThreatPipeline;
  }

  async simulateBruteForce({ email = "victim@cybershield.local", ipAddress = "203.0.113.91" }) {
    return this.#createAttempts({
      count: 8,
      email,
      ipAddress,
      reason: "Invalid password",
      attackType: "Brute Force Simulation"
    });
  }

  async simulateUnknownAccount({ email = "unknown@cybershield.local", ipAddress = "198.51.100.66" }) {
    return this.#createAttempts({
      count: 5,
      email,
      ipAddress,
      reason: "User not found",
      attackType: "Unknown Account Login Simulation"
    });
  }

  async simulateSuspiciousRequests({ email = "analyst@cybershield.local", ipAddress = "192.0.2.44" }) {
    return this.#createAttempts({
      count: 6,
      email,
      ipAddress,
      reason: "Rapid repeated request",
      attackType: "Rapid Request Simulation"
    });
  }

  async #createAttempts({ count, email, ipAddress, reason, attackType }) {
    const results = [];

    for (let index = 0; index < count; index += 1) {
      const attempt = await this.LoginAttemptModel.create({
        email,
        ipAddress,
        userAgent: `CyberShield Attack Simulator/${index + 1}`,
        endpoint: "POST /api/threats/simulate",
        success: false,
        reason,
        metadata: {
          simulation: true,
          attackType,
          sequence: index + 1
        }
      });

      results.push(await this.runThreatPipeline(attempt));
    }

    return {
      attackType,
      generatedAttempts: count,
      highestScore: Math.max(...results.map((item) => item.analysis.score)),
      finalLevel: results.at(-1)?.analysis.level || "Low",
      results
    };
  }
}
