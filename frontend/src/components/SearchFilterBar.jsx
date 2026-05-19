import { Search } from "lucide-react";

export default function SearchFilterBar({ search, setSearch, level, setLevel }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <label className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by email, IP, category, or event"
          className="h-11 w-full rounded-md border border-white/10 bg-white/5 pl-10 pr-3 text-sm text-white outline-none ring-cyber-cyan transition focus:ring-2 light:border-slate-200 light:bg-white/85 light:text-slate-950"
        />
      </label>
      <select
        value={level}
        onChange={(event) => setLevel(event.target.value)}
        className="h-11 rounded-md border border-white/10 bg-slate-950/80 px-3 text-sm text-white outline-none ring-cyber-cyan transition focus:ring-2 light:border-slate-200 light:bg-white light:text-slate-950"
      >
        <option value="">All levels</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>
    </div>
  );
}
