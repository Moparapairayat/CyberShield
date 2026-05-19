const levelClass = {
  Low: "text-cyber-lime",
  Medium: "text-cyber-amber",
  High: "text-orange-400",
  Critical: "text-cyber-red"
};

export default function ActivityTable({ rows = [], mode = "attempts" }) {
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs uppercase text-slate-500 light:text-slate-500">
          <tr>
            <th className="px-3 py-3">Identity</th>
            <th className="px-3 py-3">IP Address</th>
            <th className="px-3 py-3">{mode === "attempts" ? "Result" : "Level"}</th>
            <th className="px-3 py-3">Signal</th>
            <th className="px-3 py-3">Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} className="border-t border-white/10">
              <td className="px-3 py-3 font-medium text-white light:text-slate-950">{row.email || "N/A"}</td>
              <td className="px-3 py-3 font-mono text-cyber-cyan">{row.ipAddress || "N/A"}</td>
              <td className="px-3 py-3">
                {mode === "attempts" ? (
                  <span className={row.success ? "text-cyber-lime" : "text-cyber-red"}>
                    {row.success ? "Allowed" : "Blocked"}
                  </span>
                ) : (
                  <span className={levelClass[row.level] || "text-slate-300"}>{row.level}</span>
                )}
              </td>
              <td className="px-3 py-3 text-slate-300 light:text-slate-600">
                {row.reason || row.event || row.description}
              </td>
              <td className="px-3 py-3 font-mono text-xs text-slate-500">
                {row.createdAt ? new Date(row.createdAt).toLocaleString() : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className="py-8 text-center text-sm text-slate-500">No security events match this view.</div>
      )}
    </div>
  );
}
