import { Cpu, Database, RadioTower, ServerCog } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CyberCard from "../components/CyberCard.jsx";
import StatusIndicator from "../components/StatusIndicator.jsx";
import StatCard from "../components/StatCard.jsx";
import { useInterval } from "../hooks/useInterval.js";
import { dashboardApi } from "../services/api.js";

const fallbackStatus = {
  apiGateway: "Online",
  threatEngine: "Active",
  database: "Connected",
  aiAnalyzer: "Analysis Mode",
  eventsPerFiveMinutes: 14,
  activeAlerts: 6,
  criticalAlerts: 1,
  latestRiskScore: 72,
  updatedAt: new Date()
};

export default function SystemMonitorPage() {
  const [status, setStatus] = useState(fallbackStatus);

  const loadStatus = useCallback(async (quiet = false) => {
    try {
      const response = await dashboardApi.getStatus();
      setStatus(response.data.data);
    } catch (error) {
      if (!quiet) toast.error("Showing demo system monitor data. Start the backend for live status.");
      setStatus(fallbackStatus);
    }
  }, []);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  useInterval(() => loadStatus(true), 7000);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <p className="font-mono text-sm uppercase text-cyber-lime">System Status</p>
        <h1 className="mt-1 text-3xl font-extrabold text-white light:text-slate-950">System Monitor</h1>
        <p className="mt-2 max-w-3xl text-slate-400 light:text-slate-600">
          Track API, database, threat engine, and alert activity during the demo.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Events in 5 Minutes" value={status.eventsPerFiveMinutes} icon={RadioTower} tone="cyan" />
        <StatCard title="Active Alerts" value={status.activeAlerts} icon={ServerCog} tone="amber" />
        <StatCard title="Critical Alerts" value={status.criticalAlerts} icon={Cpu} tone="red" />
        <StatCard title="Risk Score" value={status.latestRiskScore} icon={Database} tone="lime" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <CyberCard>
          <h2 className="mb-5 text-lg font-bold text-white light:text-slate-950">Service Status</h2>
          <div className="space-y-3">
            <StatusIndicator label="API Gateway" status={status.apiGateway} />
            <StatusIndicator label="Threat Engine" status={status.threatEngine} />
            <StatusIndicator label="MongoDB" status={status.database} />
            <StatusIndicator label="AI Analyzer" status={status.aiAnalyzer} />
          </div>
        </CyberCard>

        <CyberCard className="scanline">
          <h2 className="mb-5 text-lg font-bold text-white light:text-slate-950">Live System Messages</h2>
          <div className="space-y-3 font-mono text-sm">
            <p className="text-cyber-lime">[OK] JWT middleware is validating the active session.</p>
            <p className="text-cyber-cyan">[SCAN] Login attempts are indexed by email and IP address.</p>
            <p className="text-cyber-amber">[WATCH] RiskAnalyzer is monitoring rapid request bursts.</p>
            <p className="text-cyber-red">[ALERT] Critical alerts are enabled for brute-force patterns.</p>
            <p className="text-slate-500">Last update: {new Date(status.updatedAt).toLocaleString()}</p>
          </div>
        </CyberCard>
      </div>
    </motion.div>
  );
}
