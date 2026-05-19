import { Fingerprint, LockKeyhole, Mail, Network, ScanLine, ShieldPlus, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import NeonButton from "../components/NeonButton.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "Threat Intelligence",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      await register(form);
      navigate("/app/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
            <ShieldPlus className="h-8 w-8 text-cyber-cyan" />
            <span className="text-xl font-extrabold text-white light:text-slate-950">CyberShield</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="glass-panel hud-panel corner-brackets rounded-lg p-6">
            <p className="font-mono text-sm uppercase text-cyber-lime">Analyst Registration</p>
            <h1 className="mt-2 text-3xl font-extrabold text-white light:text-slate-950">Create Account</h1>
            <p className="mt-3 text-sm leading-6 text-slate-400 light:text-slate-600">
              Create a SOC analyst profile and start using the secure CyberShield dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-slate-400 light:text-slate-600">
                    <UserRound className="h-4 w-4 text-cyber-cyan" />
                    Name
                  </span>
                  <input
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    className="tech-input mt-2 h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 text-white outline-none ring-cyber-cyan transition focus:border-cyber-cyan focus:ring-2 light:border-slate-200 light:bg-white/85 light:text-slate-950"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-slate-400 light:text-slate-600">
                    <Network className="h-4 w-4 text-cyber-cyan" />
                    Department
                  </span>
                  <input
                    value={form.department}
                    onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))}
                    className="tech-input mt-2 h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 text-white outline-none ring-cyber-cyan transition focus:border-cyber-cyan focus:ring-2 light:border-slate-200 light:bg-white/85 light:text-slate-950"
                  />
                </label>
              </div>

              <label className="mt-4 block">
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
                  minLength={8}
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  className="tech-input mt-2 h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 text-white outline-none ring-cyber-cyan transition focus:border-cyber-cyan focus:ring-2 light:border-slate-200 light:bg-white/85 light:text-slate-950"
                  required
                />
              </label>

              <NeonButton loading={loading} className="mt-6 w-full">
                Create Secure Account
              </NeonButton>

              <p className="mt-5 text-sm text-slate-400 light:text-slate-600">
                Already registered? <Link to="/login" className="text-cyber-cyan hover:text-cyan-200">Login</Link>
              </p>
            </form>
          </section>

          <aside className="glass-panel hud-panel corner-brackets hidden rounded-lg p-6 lg:block">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-sm uppercase text-cyber-lime">Account Security Overview</p>
                <h2 className="mt-2 text-2xl font-extrabold text-white light:text-slate-950">Secure Analyst Setup</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-md border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan">
                <Fingerprint className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {[
                ["JWT Session", "A protected token is issued after registration."],
                ["bcrypt Password", "Passwords are stored as secure hashes."],
                ["Threat Monitoring", "Login activity is monitored for suspicious behavior."],
                ["OOP User Model", "User and Admin classes support the project explanation."]
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
              Registration status: ready to create a secure analyst account.
            </div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
