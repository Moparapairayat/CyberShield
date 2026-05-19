import { ArrowRight, LockKeyhole, Radar, Shield, Siren } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, stagger } from "../animations/variants.js";
import DigitalClock from "../components/DigitalClock.jsx";
import NeonButton from "../components/NeonButton.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

const signals = [
  { label: "Failed Logins", value: "37", icon: LockKeyhole, tone: "text-cyber-red" },
  { label: "Risk Score", value: "72", icon: Radar, tone: "text-cyber-amber" },
  { label: "Active Alerts", value: "06", icon: Siren, tone: "text-cyber-cyan" }
];

export default function LandingPage() {
  return (
    <div className="cyber-shell min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 grid-overlay" />
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-cyber-cyan text-slate-950 shadow-neon">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-white light:text-slate-950">CyberShield</p>
            <p className="text-xs text-slate-500">AI-Based Threat Detection</p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <DigitalClock />
          <ThemeToggle />
          <Link to="/login" className="hidden text-sm font-semibold text-slate-300 hover:text-cyber-cyan md:block">
            Login
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-84px)] w-full max-w-7xl items-center gap-8 px-4 pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.section variants={stagger} initial="hidden" animate="visible" className="py-8">
          <motion.p variants={fadeUp} className="mb-4 font-mono text-sm font-bold uppercase text-cyber-lime">
            Intelligent AI-Based Cyber Threat Detection and Alert System
          </motion.p>
          <motion.h1 variants={fadeUp} className="max-w-3xl text-5xl font-extrabold text-white light:text-slate-950 md:text-7xl">
            CyberShield
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-8 text-slate-300 light:text-slate-700">
            A modern MERN security dashboard for suspicious login detection, brute-force analysis, risk scoring, smart alerts, analytics, and safe attack simulation.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/admin-login">
              <NeonButton icon={ArrowRight} className="w-full sm:w-auto">Open Admin Console</NeonButton>
            </Link>
            <Link to="/register">
              <NeonButton variant="ghost" className="w-full sm:w-auto">Create Analyst Account</NeonButton>
            </Link>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="scanline neon-border rounded-lg"
        >
          <div className="glass-panel rounded-lg p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase text-cyber-cyan">Live SOC Preview</p>
                <h2 className="text-2xl font-extrabold text-white light:text-slate-950">Threat Command Center</h2>
              </div>
              <span className="rounded bg-cyber-lime px-2 py-1 text-xs font-bold text-slate-950">ONLINE</span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {signals.map((signal) => (
                <div key={signal.label} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <signal.icon className={`mb-4 h-6 w-6 ${signal.tone}`} />
                  <p className="text-sm text-slate-400">{signal.label}</p>
                  <p className="mt-2 text-3xl font-extrabold text-white light:text-slate-950">{signal.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-md border border-cyan-300/20 bg-slate-950/60 p-4">
                <div className="mb-4 h-2 rounded bg-white/10">
                  <div className="h-2 w-[72%] rounded bg-cyber-amber" />
                </div>
                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <p><span className="text-cyber-red">BLOCK</span> 203.0.113.91 admin@cybershield.local</p>
                  <p><span className="text-cyber-amber">WARN</span> 198.51.100.33 unknown account target</p>
                  <p><span className="text-cyber-lime">ALLOW</span> 10.0.0.12 analyst session verified</p>
                </div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm text-slate-400">Threat Level</p>
                <p className="mt-2 text-4xl font-extrabold text-cyber-red">HIGH</p>
                <p className="mt-4 text-sm leading-6 text-slate-300 light:text-slate-700">
                  The risk engine identifies credential attack behavior from repeated failed login activity.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
