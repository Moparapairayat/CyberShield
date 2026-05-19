import { Activity, AlertOctagon, CheckCircle2, RadioTower, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CyberCard from "../components/CyberCard.jsx";
import NeonButton from "../components/NeonButton.jsx";
import { alertApi } from "../services/api.js";
import { mockDashboard } from "../services/mockData.js";

const typeClass = {
  Low: "border-cyber-lime/30 bg-cyber-lime/10 text-cyber-lime",
  Medium: "border-cyber-amber/30 bg-cyber-amber/10 text-cyber-amber",
  High: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  Critical: "border-cyber-red/30 bg-cyber-red/10 text-cyber-red"
};

const scoreBar = {
  Low: "bg-cyber-lime",
  Medium: "bg-cyber-amber",
  High: "bg-orange-400",
  Critical: "bg-cyber-red"
};

export default function AlertHistoryPage() {
  const [alerts, setAlerts] = useState(mockDashboard.recentAlerts);
  const [level, setLevel] = useState("");

  const loadAlerts = useCallback(async () => {
    try {
      const response = await alertApi.getAlerts({ level, limit: 40 });
      setAlerts(response.data.data.alerts);
    } catch (error) {
      setAlerts(mockDashboard.recentAlerts);
    }
  }, [level]);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  async function acknowledge(id) {
    try {
      await alertApi.acknowledge(id);
      toast.success("Alert marked as reviewed.");
      loadAlerts();
    } catch (error) {
      toast.error("This demo alert cannot be updated without the backend API.");
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-sm uppercase text-cyber-lime">Alert Center</p>
          <h1 className="mt-1 text-3xl font-extrabold text-white light:text-slate-950">Alert History</h1>
          <p className="mt-2 max-w-3xl text-slate-400 light:text-slate-600">
            Review generated security alerts, risk scores, source IPs, and recommended actions.
          </p>
        </div>
        <select
          value={level}
          onChange={(event) => setLevel(event.target.value)}
          className="h-11 rounded-md border border-white/10 bg-slate-950/80 px-3 text-sm text-white outline-none ring-cyber-cyan transition focus:ring-2 light:border-slate-200 light:bg-white light:text-slate-950"
        >
          <option value="">All levels</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert) => (
          <CyberCard key={alert._id} className={`relative overflow-hidden border ${typeClass[alert.level] || "border-white/10"}`}>
            <div className={`absolute inset-y-0 left-0 w-1 ${scoreBar[alert.level] || "bg-cyber-cyan"}`} />
            <div className="absolute right-4 top-4 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 md:block">
              CyberShield Alert Record
            </div>

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
              <div className="flex min-w-0 gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/20 light:bg-white/60">
                  <motion.span
                    animate={{ scale: [1, 1.45], opacity: [0.45, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="absolute inset-0 rounded-md border border-current"
                  />
                  <AlertOctagon className="relative h-7 w-7" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 pr-0 md:pr-36">
                    <h2 className="text-lg font-bold text-white light:text-slate-950">{alert.title}</h2>
                    <span className="rounded bg-white/10 px-2 py-1 text-xs font-bold light:bg-slate-900/5">{alert.level}</span>
                    {alert.acknowledged && (
                      <span className="rounded bg-cyber-lime/15 px-2 py-1 text-xs font-bold text-cyber-lime">Reviewed</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-slate-300 light:text-slate-700">{alert.message}</p>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-md border border-white/10 bg-black/15 p-3 light:border-slate-200 light:bg-white/60">
                      <div className="mb-1 flex items-center gap-2 text-xs uppercase text-slate-500">
                        <RadioTower className="h-3.5 w-3.5" />
                        Source IP
                      </div>
                      <p className="break-all font-mono text-xs text-white light:text-slate-950">{alert.ipAddress || "Unknown"}</p>
                    </div>
                    <div className="rounded-md border border-white/10 bg-black/15 p-3 light:border-slate-200 light:bg-white/60">
                      <div className="mb-1 flex items-center gap-2 text-xs uppercase text-slate-500">
                        <Activity className="h-3.5 w-3.5" />
                        Risk Score
                      </div>
                      <div className="h-2 overflow-hidden rounded bg-white/10 light:bg-slate-200">
                        <div
                          className={`h-full ${scoreBar[alert.level] || "bg-cyber-cyan"}`}
                          style={{ width: `${Math.min(alert.score || 0, 100)}%` }}
                        />
                      </div>
                      <p className="mt-1 font-mono text-xs text-white light:text-slate-950">{alert.score || 0}/100</p>
                    </div>
                    <div className="rounded-md border border-white/10 bg-black/15 p-3 light:border-slate-200 light:bg-white/60">
                      <div className="mb-1 flex items-center gap-2 text-xs uppercase text-slate-500">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Recommendation
                      </div>
                      <p className="line-clamp-2 text-xs text-slate-300 light:text-slate-700">
                        {alert.recommendation || "Continue monitoring and preserve logs."}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 font-mono text-xs text-slate-500">
                    {alert.createdAt ? new Date(alert.createdAt).toLocaleString() : "N/A"}
                  </p>
                </div>
              </div>
              {!alert.acknowledged && (
                <NeonButton icon={CheckCircle2} variant="ghost" onClick={() => acknowledge(alert._id)}>
                  Mark Reviewed
                </NeonButton>
              )}
            </div>
          </CyberCard>
        ))}
      </div>
    </motion.div>
  );
}
