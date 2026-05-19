import { motion } from "framer-motion";

export default function StatCard({ title, value, icon: Icon, tone = "cyan", suffix = "" }) {
  const toneClasses = {
    cyan: "text-cyber-cyan shadow-neon",
    lime: "text-cyber-lime shadow-lime",
    red: "text-cyber-red shadow-danger",
    amber: "text-cyber-amber",
    violet: "text-cyber-violet"
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-panel hud-panel corner-brackets rounded-lg p-5"
    >
      <div className="mb-4 h-1 w-16 rounded bg-cyber-cyan/80" />
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400 light:text-slate-600">{title}</p>
          <p className="mt-2 text-3xl font-extrabold text-white light:text-slate-950">
            {value}
            <span className="text-lg">{suffix}</span>
          </p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-md bg-white/5 ${toneClasses[tone]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}
