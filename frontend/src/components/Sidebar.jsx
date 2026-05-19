import {
  Activity,
  Bell,
  Boxes,
  Gauge,
  LayoutDashboard,
  LogOut,
  Shield,
  UserRound
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/analytics", label: "Analytics", icon: Gauge },
  { to: "/app/alerts", label: "Alerts", icon: Bell },
  { to: "/app/oop-design", label: "OOP Design", icon: Boxes },
  { to: "/app/monitor", label: "Monitor", icon: Activity },
  { to: "/app/profile", label: "Profile", icon: UserRound }
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <aside className="hidden min-h-screen w-72 border-r border-cyan-300/15 bg-slate-950/[0.78] px-4 py-5 backdrop-blur-xl light:border-slate-200 light:bg-white/[0.88] lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-cyber-cyan text-slate-950 shadow-neon">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <p className="text-lg font-extrabold text-white light:text-slate-950">CyberShield</p>
          <p className="text-xs text-slate-500 light:text-slate-500">Threat Detection System</p>
        </div>
      </div>

      <div className="mb-5 rounded-md border border-cyber-cyan/20 bg-cyber-cyan/[0.08] px-3 py-2 font-mono text-[11px] uppercase text-cyber-cyan light:bg-sky-50">
        Secure Monitoring Active
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-cyber-cyan text-slate-950 shadow-neon"
                  : "text-slate-300 hover:bg-white/10 hover:text-white light:text-slate-600 light:hover:bg-sky-50 light:hover:text-slate-950"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-8 flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-slate-400 transition hover:bg-white/10 hover:text-white light:text-slate-500 light:hover:bg-slate-100 light:hover:text-slate-950"
      >
        <LogOut className="h-5 w-5" />
        Sign Out
      </button>
    </aside>
  );
}
