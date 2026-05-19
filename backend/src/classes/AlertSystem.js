class SecurityAlert {
  constructor({ analysis, attempt }) {
    if (new.target === SecurityAlert) {
      throw new Error("SecurityAlert is abstract and cannot be instantiated directly.");
    }

    this.analysis = analysis;
    this.attempt = attempt;
  }

  format() {
    throw new Error("Subclasses must implement format().");
  }

  basePayload(type) {
    return {
      level: this.analysis.level,
      type,
      score: this.analysis.score,
      email: this.attempt.email,
      ipAddress: this.attempt.ipAddress,
      recommendation: this.analysis.recommendations[0],
      metadata: {
        factors: this.analysis.factors,
        categories: this.analysis.categories,
        detector: this.analysis.detector
      }
    };
  }
}

class WarningAlert extends SecurityAlert {
  format() {
    return {
      ...this.basePayload("warning"),
      title: "Suspicious Login Activity",
      message: `CyberShield detected ${this.analysis.factors.join(", ")} from source IP ${this.attempt.ipAddress}.`
    };
  }
}

class DangerAlert extends SecurityAlert {
  format() {
    const isLockout = this.analysis.factors.includes("Automatic account lockout");

    return {
      ...this.basePayload(this.analysis.level === "Critical" ? "critical" : "danger"),
      title: isLockout ? "Account Lockout Activated" : `${this.analysis.level} Risk Activity Detected`,
      message: `${this.analysis.analysis} Affected account: ${this.attempt.email}.`
    };
  }
}

export class AlertSystem {
  buildAlert(analysis, attempt) {
    const alert = analysis.score >= 65
      ? new DangerAlert({ analysis, attempt })
      : new WarningAlert({ analysis, attempt });

    return alert.format();
  }

  shouldCreateAlert(analysis) {
    return analysis.score >= 35 || analysis.factors.includes("Attack simulator signal");
  }
}
