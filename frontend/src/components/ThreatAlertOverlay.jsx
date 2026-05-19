import { AlertOctagon, Eye, LockKeyhole, Radar, ShieldAlert, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const levelTone = {
  Low: "from-cyber-lime/25 via-cyber-cyan/10 to-transparent text-cyber-lime border-cyber-lime/40",
  Medium: "from-cyber-amber/25 via-cyber-cyan/10 to-transparent text-cyber-amber border-cyber-amber/40",
  High: "from-orange-500/25 via-cyber-red/10 to-transparent text-orange-300 border-orange-400/40",
  Critical: "from-cyber-red/30 via-cyber-violet/15 to-transparent text-cyber-red border-cyber-red/50"
};

function getLatestResult(alert) {
  return alert?.results?.at?.(-1) || null;
}

function getAlertViewModel(alert) {
  const latest = getLatestResult(alert);
  const latestAlert = latest?.alert;
  const latestAnalysis = latest?.analysis;

  return {
    title: alert?.title || latestAlert?.title || alert?.attackType || "Security Threat Detected",
    level: alert?.level || alert?.finalLevel || latestAnalysis?.level || "Critical",
    score: alert?.score ?? alert?.highestScore ?? latestAnalysis?.score ?? 0,
    message:
      alert?.message ||
      latestAlert?.message ||
      `${alert?.generatedAttempts || 1} security events were processed by the CyberShield threat engine.`,
    recommendation:
      alert?.recommendation ||
      latestAlert?.recommendation ||
      latestAnalysis?.recommendations?.[0] ||
      "Review the suspicious source, preserve logs, and verify affected identities.",
    email: alert?.email || latestAlert?.email || latest?.riskAnalysis?.email || "Multiple targets",
    ipAddress: alert?.ipAddress || latestAlert?.ipAddress || latest?.riskAnalysis?.ipAddress || "Unknown source",
    eventCount: alert?.generatedAttempts || alert?.results?.length || 1
  };
}

export default function ThreatAlertOverlay({ alert, onClose }) {
  const view = getAlertViewModel(alert);
  const tone = levelTone[view.level] || levelTone.Critical;

  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/82 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.92, y: 28, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className={`relative w-full max-w-5xl overflow-hidden rounded-lg border bg-gradient-to-br ${tone} shadow-danger`}
          >
            <div className="absolute inset-0 bg-cyber-grid bg-[length:28px_28px] opacity-35" />
            <motion.div
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/14 to-transparent"
            />

            <button
              aria-label="Close threat alert"
              title="Close"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-md border border-white/15 bg-black/20 p-2 text-slate-200 transition hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative grid gap-6 p-6 lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
              <div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-black/24 p-6 text-center">
                <div className="relative flex h-52 w-52 items-center justify-center">
                  {[0, 0.4, 0.8].map((delay) => (
                    <motion.div
                      key={delay}
                      animate={{ scale: [0.45, 1.18], opacity: [0.85, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border border-cyber-red/55"
                    />
                  ))}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 rounded-full border border-dashed border-cyber-cyan/55"
                  />
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyber-red/40 bg-cyber-red/20 text-cyber-red shadow-danger">
                    <AlertOctagon className="h-14 w-14" />
                  </div>
                </div>

                <p className="mt-2 font-mono text-xs uppercase tracking-[0.28em] text-slate-300">Threat Level</p>
                <p className="mt-2 text-5xl font-black uppercase text-white">{view.level}</p>
                <p className="mt-2 font-mono text-cyber-cyan">AI SCORE {view.score}/100</p>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded bg-cyber-red px-2 py-1 font-mono text-xs font-black uppercase text-white">
                      Live Security Alert
                    </span>
                    <span className="rounded border border-cyber-cyan/35 bg-cyber-cyan/10 px-2 py-1 font-mono text-xs text-cyber-cyan">
                      {view.eventCount} events captured
                    </span>
                  </div>
                  <h2 className="text-3xl font-black uppercase text-white md:text-5xl">{view.title}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200">{view.message}</p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-md border border-white/10 bg-black/24 p-4">
                    <Radar className="mb-3 h-5 w-5 text-cyber-cyan" />
                    <p className="text-xs uppercase text-slate-400">Source IP</p>
                    <p className="mt-1 break-all font-mono text-sm font-bold text-white">{view.ipAddress}</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-black/24 p-4">
                    <Eye className="mb-3 h-5 w-5 text-cyber-amber" />
                    <p className="text-xs uppercase text-slate-400">Target Identity</p>
                    <p className="mt-1 break-all font-mono text-sm font-bold text-white">{view.email}</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-black/24 p-4">
                    <LockKeyhole className="mb-3 h-5 w-5 text-cyber-lime" />
                    <p className="text-xs uppercase text-slate-400">Response</p>
                    <p className="mt-1 font-mono text-sm font-bold text-white">Monitoring active</p>
                  </div>
                </div>

                <div className="rounded-md border border-cyber-cyan/25 bg-cyber-cyan/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-cyber-cyan" />
                    <p className="font-bold text-white">Recommended Action</p>
                  </div>
                  <p className="text-sm leading-6 text-cyan-100">{view.recommendation}</p>
                </div>

                <div className="grid gap-2 font-mono text-xs text-slate-300 md:grid-cols-3">
                  <span className="rounded bg-black/24 px-3 py-2">01 VERIFY IDENTITY</span>
                  <span className="rounded bg-black/24 px-3 py-2">02 PRESERVE LOGS</span>
                  <span className="rounded bg-black/24 px-3 py-2">03 REVIEW RESPONSE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
