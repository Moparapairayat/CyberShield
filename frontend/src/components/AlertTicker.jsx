import { AlertTriangle, RadioTower, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function AlertTicker({ alerts = [] }) {
  const activeAlerts = alerts.length
    ? alerts
    : [{ title: "No critical alerts", message: "CyberShield is monitoring normally.", level: "Low", score: 0 }];

  return (
    <div className="relative overflow-hidden rounded-lg border border-cyber-red/30 bg-gradient-to-r from-cyber-red/16 via-cyber-violet/10 to-cyber-cyan/10 px-4 py-3 shadow-danger light:from-rose-100 light:via-sky-50 light:to-cyan-50">
      <motion.div
        animate={{ opacity: [0.25, 0.65, 0.25] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="absolute inset-y-0 left-0 w-1 bg-cyber-red"
      />
      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-cyber-red text-white shadow-danger">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <div className="hidden items-center gap-2 rounded-md border border-cyber-cyan/20 bg-black/15 px-3 py-2 font-mono text-xs text-cyber-cyan md:flex light:bg-white/50">
          <RadioTower className="h-4 w-4" />
          LIVE SECURITY ALERT
        </div>

        <div className="min-w-0 flex-1 overflow-hidden border-l border-white/10 pl-3 light:border-slate-200">
          <motion.div
            animate={{ x: ["0%", "-45%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-10 whitespace-nowrap text-sm text-rose-100 light:text-rose-800"
          >
            {activeAlerts.map((alert) => (
              <span key={alert._id || alert.title} className="inline-flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-cyber-cyan" />
                <strong className="uppercase">{alert.level || "Signal"}:</strong>
                <strong>{alert.title}</strong>
                <span>- {alert.message}</span>
                {typeof alert.score === "number" && <span className="font-mono text-cyber-cyan">Score {alert.score}</span>}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
