import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-cyan-300/20 bg-white/5 text-cyber-cyan transition hover:bg-white/10 light:border-slate-200 light:bg-white/80 light:text-sky-700 light:hover:bg-sky-50"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
