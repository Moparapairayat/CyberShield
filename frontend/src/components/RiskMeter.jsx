import { motion } from "framer-motion";

export default function RiskMeter({ score = 0 }) {
  const level = score >= 85 ? "Critical" : score >= 65 ? "High" : score >= 35 ? "Medium" : "Low";
  const color = score >= 85 ? "bg-cyber-red" : score >= 65 ? "bg-orange-500" : score >= 35 ? "bg-cyber-amber" : "bg-cyber-lime";

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-slate-400 light:text-slate-600">Risk Score</span>
        <span className="font-mono text-sm font-bold text-cyber-cyan">{level}</span>
      </div>
      <div className="h-4 overflow-hidden rounded bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(score, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${color}`}
        />
      </div>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-4xl font-extrabold text-white light:text-slate-950">{score}</p>
        <p className="text-sm text-slate-400 light:text-slate-600">out of 100</p>
      </div>
    </div>
  );
}
