import { Outlet } from "react-router-dom";
import AiAssistant from "../components/AiAssistant.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

export default function AppLayout() {
  return (
    <div className="cyber-shell min-h-screen">
      <div className="pointer-events-none fixed inset-0 grid-overlay" />
      <div className="tactical-backdrop pointer-events-none fixed inset-0 opacity-70" />
      <div className="relative flex min-h-screen">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Topbar />
          <div className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
      <AiAssistant />
    </div>
  );
}
