import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingScreen({ label = "Loading CyberShield security data" }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cyber-bg text-cyber-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel flex w-full max-w-sm flex-col items-center gap-4 rounded-lg p-8 text-center"
      >
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-cyber-cyan/25" />
          <ShieldCheck className="relative h-12 w-12 text-cyber-cyan" />
        </div>
        <p className="font-mono text-sm text-slate-300">{label}</p>
      </motion.div>
    </div>
  );
}
