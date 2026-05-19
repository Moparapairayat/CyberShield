export class ThreatLogger {
  buildLog(analysis, attempt) {
    const category = analysis.categories[0] || "Normal Activity";

    return {
      category,
      level: analysis.level,
      score: analysis.score,
      event: `${category} detected`,
      description: analysis.analysis,
      email: attempt.email,
      ipAddress: attempt.ipAddress,
      source: analysis.detector,
      metadata: {
        factors: analysis.factors,
        categories: analysis.categories,
        userAgent: attempt.userAgent,
        endpoint: attempt.endpoint,
        simulation: Boolean(attempt.metadata?.simulation)
      }
    };
  }
}
