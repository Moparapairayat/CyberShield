import { Activity, Fingerprint, KeyRound, LockKeyhole, Mail, ScanLine, ShieldCheck, UserCog } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import NeonButton from "../components/NeonButton.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function formatLockoutTime(lockedUntil) {
  if (!lockedUntil) return "temporarily";
  return `until ${new Date(lockedUntil).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

export default function LoginPage({ mode = "user" }) {
  const [form, setForm] = useState({
    email: mode === "admin" ? "admin@cybershield.local" : "analyst@cybershield.local",
    password: mode === "admin" ? "Admin@12345" : "User@12345"
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      await login(form, mode);
      navigate("/app/dashboard");
    } catch (error) {
      const details = error.response?.data?.details;
      const risk = details?.risk;
      const lockout = details?.lockout;

      if (lockout?.isLocked) {
        toast.error(`This account is locked ${formatLockoutTime(lockout.lockedUntil)} after ${lockout.failedLoginCount} failed attempts.`);
      } else {
        toast.error(risk ? `Login blocked. Risk level: ${risk.level} (${risk.score}/100).` : "Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cyber-shell flex min-h-screen items-center justify-center px-4 py-8">
      <div className="pointer-events-none fixed inset-0 grid-overlay" />
      <div className="tactical-backdrop pointer-events-none fixed inset-0 opacity-70" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-6xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-cyber-cyan" />
            <span className="text-xl font-extrabold text-white light:text-slate-950">CyberShield</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <form onSubmit={handleSubmit} className="glass-panel hud-panel corner-brackets rounded-lg p-6">
            <p className="font-mono text-sm uppercase text-cyber-lime">{mode === "admin" ? "Admin Login" : "Analyst Login"}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-white light:text-slate-950">Secure Login</h1>
            <p className="mt-3 text-sm leading-6 text-slate-400 light:text-slate-600">
              Sign in to access the monitored CyberShield dashboard and review live security activity.
            </p>

            <label className="mt-6 block">
              <span className="mb-2 flex items-center gap-2 text-sm text-slate-400 light:text-slate-600">
                <Mail className="h-4 w-4 text-cyber-cyan" />
                Email
              </span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="tech-input mt-2 h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 text-white outline-none ring-cyber-cyan transition focus:border-cyber-cyan focus:ring-2 light:border-slate-200 light:bg-white/85 light:text-slate-950"
                required
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-2 flex items-center gap-2 text-sm text-slate-400 light:text-slate-600">
                <LockKeyhole className="h-4 w-4 text-cyber-cyan" />
                Password
              </span>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className="tech-input mt-2 h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 text-white outline-none ring-cyber-cyan transition focus:border-cyber-cyan focus:ring-2 light:border-slate-200 light:bg-white/85 light:text-slate-950"
                required
              />
            </label>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-cyber-cyan/20 bg-cyber-cyan/[0.07] p-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white light:text-slate-950">
                  <KeyRound className="h-4 w-4 text-cyber-cyan" />
                  JWT Session
                </div>
                <p className="mt-1 text-xs text-slate-400 light:text-slate-600">A protected session is created after login.</p>
              </div>
              <div className="rounded-md border border-cyber-lime/20 bg-cyber-lime/[0.07] p-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white light:text-slate-950">
                  <Activity className="h-4 w-4 text-cyber-lime" />
                  Risk Scan
                </div>
                <p className="mt-1 text-xs text-slate-400 light:text-slate-600">Each login is checked for unusual activity.</p>
              </div>
            </div>

            <NeonButton loading={loading} className="mt-6 w-full">
              Enter Dashboard
            </NeonButton>

            <div className="mt-5 flex items-center justify-between text-sm">
              <Link to="/register" className="text-cyber-cyan hover:text-cyan-200">Register</Link>
              <Link to={mode === "admin" ? "/login" : "/admin-login"} className="text-slate-400 hover:text-white light:hover:text-slate-950">
                {mode === "admin" ? "Analyst login" : "Admin login"}
              </Link>
            </div>
          </form>

          <aside className="glass-panel hud-panel corner-brackets hidden rounded-lg p-6 lg:block">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-sm uppercase text-cyber-lime">Access Control Overview</p>
                <h2 className="mt-2 text-2xl font-extrabold text-white light:text-slate-950">
                  {mode === "admin" ? "Administrator Console" : "Analyst Workspace"}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-md border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan">
                {mode === "admin" ? <UserCog className="h-6 w-6" /> : <Fingerprint className="h-6 w-6" />}
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {[
                ["Password Protection", "bcrypt is used to store passwords securely."],
                ["Risk Analysis", "Suspicious login patterns are scored automatically."],
                ["Alert Pipeline", "High-risk access attempts create security alerts."],
                ["Session Protection", "JWT middleware protects private dashboard routes."]
              ].map(([title, detail]) => (
                <div key={title} className="rounded-md border border-white/10 bg-white/[0.04] p-4 light:border-slate-200 light:bg-white/70">
                  <div className="flex items-center gap-3">
                    <ScanLine className="h-5 w-5 text-cyber-cyan" />
                    <p className="font-bold text-white light:text-slate-950">{title}</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-400 light:text-slate-600">{detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-md border border-cyber-lime/25 bg-cyber-lime/10 p-4 font-mono text-xs uppercase text-cyber-lime">
              Secure gateway is ready for monitored access.
            </div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
