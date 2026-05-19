export class DashboardManager {
  constructor({ LoginAttemptModel, AlertModel, ThreatLogModel, RiskAnalysisModel }) {
    this.LoginAttemptModel = LoginAttemptModel;
    this.AlertModel = AlertModel;
    this.ThreatLogModel = ThreatLogModel;
    this.RiskAnalysisModel = RiskAnalysisModel;
  }

  async getOverview() {
    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalAttempts,
      failedAttempts,
      totalThreats,
      activeAlerts,
      recentAttempts,
      recentAlerts,
      threatDistribution,
      levelDistribution,
      trend,
      latestRisk
    ] = await Promise.all([
      this.LoginAttemptModel.countDocuments({ createdAt: { $gte: since24h } }),
      this.LoginAttemptModel.countDocuments({ success: false, createdAt: { $gte: since24h } }),
      this.ThreatLogModel.countDocuments({ createdAt: { $gte: since24h } }),
      this.AlertModel.countDocuments({ acknowledged: false }),
      this.LoginAttemptModel.find().sort({ createdAt: -1 }).limit(10).lean(),
      this.AlertModel.find().sort({ createdAt: -1 }).limit(8).lean(),
      this.ThreatLogModel.aggregate([
        { $match: { createdAt: { $gte: since7d } } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      this.ThreatLogModel.aggregate([
        { $match: { createdAt: { $gte: since7d } } },
        { $group: { _id: "$level", count: { $sum: 1 } } }
      ]),
      this.LoginAttemptModel.aggregate([
        { $match: { createdAt: { $gte: since7d } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            attempts: { $sum: 1 },
            failed: { $sum: { $cond: [{ $eq: ["$success", false] }, 1, 0] } }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      this.RiskAnalysisModel.findOne().sort({ createdAt: -1 }).lean()
    ]);

    const riskScore = latestRisk?.score || 18;

    return {
      summary: {
        totalAttempts,
        failedAttempts,
        threatCount: totalThreats,
        activeAlerts,
        riskScore,
        systemHealth: this.#calculateSystemHealth(activeAlerts, riskScore)
      },
      recentAttempts,
      recentAlerts,
      charts: {
        threatDistribution: this.#mapDistribution(threatDistribution),
        levelDistribution: this.#mapDistribution(levelDistribution),
        trend: this.#fillTrend(trend)
      },
      latestRisk
    };
  }

  #mapDistribution(rows) {
    return rows.map((row) => ({
      label: row._id || "Unknown",
      value: row.count
    }));
  }

  #fillTrend(rows) {
    return rows.map((row) => ({
      date: row._id,
      attempts: row.attempts,
      failed: row.failed
    }));
  }

  #calculateSystemHealth(activeAlerts, riskScore) {
    if (activeAlerts > 12 || riskScore >= 85) return "Critical";
    if (activeAlerts > 6 || riskScore >= 65) return "Degraded";
    if (activeAlerts > 2 || riskScore >= 35) return "Guarded";
    return "Operational";
  }
}
