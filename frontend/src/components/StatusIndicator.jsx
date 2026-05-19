const statusColors = {
  Operational: "bg-cyber-lime text-slate-950",
  Guarded: "bg-cyber-amber text-slate-950",
  Degraded: "bg-orange-500 text-white",
  Critical: "bg-cyber-red text-white",
  Online: "bg-cyber-lime text-slate-950",
  Active: "bg-cyber-cyan text-slate-950",
  Connected: "bg-cyber-lime text-slate-950",
  Protected: "bg-cyber-lime text-slate-950",
  Locked: "bg-cyber-red text-white",
  "Analysis Mode": "bg-cyber-violet text-white"
};

export default function StatusIndicator({ label, status }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
      <span className="text-sm text-slate-300 light:text-slate-600">{label}</span>
      <span className={`rounded px-2 py-1 text-xs font-bold ${statusColors[status] || "bg-slate-700 text-white"}`}>
        {status}
      </span>
    </div>
  );
}
