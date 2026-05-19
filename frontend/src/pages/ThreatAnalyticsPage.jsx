import { BarChart3, Network, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ThreatLineChart from "../charts/ThreatLineChart.jsx";
import ThreatPieChart from "../charts/ThreatPieChart.jsx";
import RiskBarChart from "../charts/RiskBarChart.jsx";
import ActivityTable from "../components/ActivityTable.jsx";
import CyberCard from "../components/CyberCard.jsx";
import SearchFilterBar from "../components/SearchFilterBar.jsx";
import StatCard from "../components/StatCard.jsx";
import { useInterval } from "../hooks/useInterval.js";
import { threatApi } from "../services/api.js";
import { mockDashboard, mockThreatLogs } from "../services/mockData.js";

export default function ThreatAnalyticsPage() {
  const [analytics, setAnalytics] = useState({
    frequency: mockDashboard.charts.trend,
    distribution: mockDashboard.charts.levelDistribution,
    topIps: [],
    failedLogins: mockDashboard.charts.trend
  });
  const [logs, setLogs] = useState(mockThreatLogs);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");

  const loadAnalytics = useCallback(async (quiet = false) => {
    try {
      const [analyticsResponse, logsResponse] = await Promise.all([
        threatApi.getAnalytics(),
        threatApi.getLogs({ search, level, limit: 30 })
      ]);

      setAnalytics(analyticsResponse.data.data);
      setLogs(logsResponse.data.data.logs);
    } catch (error) {
      if (!quiet) toast.error("Showing demo analytics data. Start the backend to load live records.");
      setLogs(mockThreatLogs);
    }
  }, [level, search]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  useInterval(() => loadAnalytics(true), 10000);

  const distribution = analytics.distribution?.map((item) => ({
    label: item._id || item.label,
    value: item.count || item.value
  }));

  const frequency = analytics.frequency?.map((item) => ({
    date: item._id || item.date,
    threats: item.threats || item.attempts || 0,
    failed: Math.round(item.averageScore || item.failed || 0)
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <p className="font-mono text-sm uppercase text-cyber-lime">Threat Intelligence</p>
        <h1 className="mt-1 text-3xl font-extrabold text-white light:text-slate-950">Threat Analytics</h1>
        <p className="mt-2 max-w-3xl text-slate-400 light:text-slate-600">
          Review threat frequency, risk levels, categories, and searchable security logs.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Tracked Threat Logs" value={logs.length} icon={ShieldAlert} tone="red" />
        <StatCard title="Threat Categories" value={distribution?.length || 0} icon={Network} tone="cyan" />
        <StatCard title="Chart Data Points" value={frequency?.length || 0} icon={BarChart3} tone="lime" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <CyberCard>
          <h2 className="mb-4 text-lg font-bold text-white light:text-slate-950">Threat Frequency Over Time</h2>
          <ThreatLineChart trend={frequency} />
        </CyberCard>
        <CyberCard>
          <h2 className="mb-4 text-lg font-bold text-white light:text-slate-950">Risk Level Breakdown</h2>
          <RiskBarChart items={distribution} />
        </CyberCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <CyberCard>
          <h2 className="mb-4 text-lg font-bold text-white light:text-slate-950">Threat Category Distribution</h2>
          <ThreatPieChart items={distribution} />
        </CyberCard>
        <CyberCard>
          <div className="mb-4">
            <h2 className="mb-4 text-lg font-bold text-white light:text-slate-950">Search and Filter Threat Logs</h2>
            <SearchFilterBar search={search} setSearch={setSearch} level={level} setLevel={setLevel} />
          </div>
          <ActivityTable rows={logs} mode="threats" />
        </CyberCard>
      </div>
    </motion.div>
  );
}
