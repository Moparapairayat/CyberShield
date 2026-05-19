import { Activity, Bell, Boxes, Gauge, LayoutDashboard, Menu, ShieldAlert, UserRound, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import DigitalClock from "./DigitalClock.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const mobileNavItems = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/analytics", label: "Analytics", icon: Gauge },
  { to: "/app/alerts", label: "Alerts", icon: Bell },
  { to: "/app/oop-design", label: "OOP Design", icon: Boxes },
  { to: "/app/monitor", label: "Monitor", icon: Activity },
  { to: "/app/profile", label: "Profile", icon: UserRound }
];

export default function Topbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-cyan-300/15 bg-slate-950/[0.78] px-4 py-4 backdrop-blur-xl light:border-slate-200 light:bg-white/[0.88] lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open navigation"
            title="Navigation"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/5 text-cyber-cyan light:border-slate-200 light:bg-white/80 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/app/dashboard" className="flex items-center gap-2 lg:hidden">
            <ShieldAlert className="h-6 w-6 text-cyber-cyan" />
            <span className="font-extrabold text-white light:text-slate-950">CyberShield</span>
          </Link>
          <div className="hidden lg:block">
            <p className="text-xs uppercase text-slate-500 light:text-slate-500">Security Operations Center</p>
            <h1 className="text-xl font-extrabold text-white light:text-slate-950">Threat Monitoring Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DigitalClock />
          <ThemeToggle />
          <div className="hidden rounded-md border border-white/10 bg-white/5 px-3 py-2 light:border-slate-200 light:bg-white/80 md:block">
            <p className="text-xs text-slate-500 light:text-slate-500">Operator</p>
            <p className="text-sm font-semibold text-white light:text-slate-950">{user?.name || "Analyst"}</p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 grid gap-2 lg:hidden"
          >
            {mobileNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold ${
                    isActive
                      ? "bg-cyber-cyan text-slate-950"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 light:bg-white/80 light:text-slate-600 light:hover:bg-sky-50"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
