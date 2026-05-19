import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-cyber-cyan text-slate-950 shadow-neon hover:bg-cyan-300",
  danger: "bg-cyber-red text-white shadow-danger hover:bg-rose-400",
  ghost: "border border-cyan-300/30 bg-white/5 text-cyber-white hover:bg-white/10 light:border-sky-200 light:bg-white/80 light:text-slate-900 light:hover:bg-sky-50",
  lime: "bg-cyber-lime text-slate-950 shadow-lime hover:bg-lime-300"
};

export default function NeonButton({
  children,
  icon: Icon,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2 focus:ring-offset-cyber-bg disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
      <span>{children}</span>
    </button>
  );
}
