export const mockDashboard = {
  summary: {
    totalAttempts: 142,
    failedAttempts: 37,
    threatCount: 18,
    activeAlerts: 6,
    riskScore: 72,
    systemHealth: "Guarded"
  },
  recentAttempts: [
    {
      _id: "1",
      email: "admin@cybershield.local",
      ipAddress: "203.0.113.91",
      success: false,
      reason: "Invalid password",
      createdAt: new Date().toISOString()
    },
    {
      _id: "2",
      email: "analyst@cybershield.local",
      ipAddress: "10.0.0.12",
      success: true,
      reason: "Successful authentication",
      createdAt: new Date(Date.now() - 180000).toISOString()
    }
  ],
  recentAlerts: [
    {
      _id: "a1",
      title: "High-Risk Login Pattern Detected",
      message: "Repeated password attempts were detected against an administrator account.",
      level: "High",
      score: 72,
      createdAt: new Date().toISOString()
    }
  ],
  charts: {
    threatDistribution: [
      { label: "Credential Attack", value: 9 },
      { label: "Suspicious IP", value: 5 },
      { label: "Rate Abuse", value: 4 }
    ],
    levelDistribution: [
      { label: "Low", value: 4 },
      { label: "Medium", value: 7 },
      { label: "High", value: 5 },
      { label: "Critical", value: 2 }
    ],
    trend: [
      { date: "Day 1", attempts: 24, failed: 6 },
      { date: "Day 2", attempts: 31, failed: 8 },
      { date: "Day 3", attempts: 29, failed: 12 },
      { date: "Day 4", attempts: 42, failed: 18 }
    ]
  }
};

export const mockThreatLogs = [
  {
    _id: "t1",
    category: "Credential Attack",
    level: "High",
    score: 76,
    event: "Repeated password attempts detected",
    description: "Multiple failed administrator login attempts crossed the high-risk threshold.",
    email: "admin@cybershield.local",
    ipAddress: "203.0.113.91",
    createdAt: new Date().toISOString()
  },
  {
    _id: "t2",
    category: "Account Enumeration",
    level: "Medium",
    score: 48,
    event: "Unknown account target detected",
    description: "Login requests targeted accounts that do not exist.",
    email: "unknown@cybershield.local",
    ipAddress: "198.51.100.33",
    createdAt: new Date(Date.now() - 600000).toISOString()
  }
];
