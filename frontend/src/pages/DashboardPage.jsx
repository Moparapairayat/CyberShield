import {
  Activity,
  AlertTriangle,
  Download,
  LogIn,
  Presentation,
  ShieldAlert,
  Siren
} from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fadeUp, stagger } from "../animations/variants.js";
import ThreatLineChart from "../charts/ThreatLineChart.jsx";
import ThreatPieChart from "../charts/ThreatPieChart.jsx";
import ActivityTable from "../components/ActivityTable.jsx";
import AlertTicker from "../components/AlertTicker.jsx";
import CyberCard from "../components/CyberCard.jsx";
import NeonButton from "../components/NeonButton.jsx";
import RiskMeter from "../components/RiskMeter.jsx";
import SimulatorPanel from "../components/SimulatorPanel.jsx";
import SoundToggle from "../components/SoundToggle.jsx";
import StatCard from "../components/StatCard.jsx";
import ThreatAlertOverlay from "../components/ThreatAlertOverlay.jsx";
import { useInterval } from "../hooks/useInterval.js";
import { dashboardApi, reportApi } from "../services/api.js";
import { threatApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { playAlertTone, stopAlertTone } from "../hooks/useSoundAlert.js";
import { mockDashboard } from "../services/mockData.js";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(mockDashboard);
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [presentationLoading, setPresentationLoading] = useState(false);
  const [activeThreatAlert, setActiveThreatAlert] = useState(null);
  const { isAdmin } = useAuth();

  const loadDashboard = useCallback(async (quiet = false) => {
    try {
      const response = await dashboardApi.getOverview();
      setDashboard(response.data.data);
    } catch (error) {
      if (!quiet) {
        toast.error("Showing demo dashboard data. Start the backend to view live records.");
      }
      setDashboard(mockDashboard);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  useInterval(() => loadDashboard(true), 8000);

  async function downloadReport() {
    try {
      const response = await reportApi.downloadThreatReport();
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "CyberShield-Threat-Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Threat report downloaded successfully.");
    } catch (error) {
      toast.error("Report download is available when the backend API is running.");
    }
  }

  async function runPresentationDemo() {
    if (!isAdmin) {
      toast.error("Please sign in as an admin to run the presentation demo.");
      return;
    }

    try {
      setPresentationLoading(true);
      toast.loading("Running presentation demo: generating safe attack signals.", {
        id: "presentation-demo"
      });

      const bruteForceResponse = await threatApi.simulateBruteForce({ email: "victim@cybershield.local", ipAddress: "203.0.113.91" });
      await new Promise((resolve) => setTimeout(resolve, 600));
      await threatApi.simulateUnknownAccount({ email: "root@cybershield.local", ipAddress: "198.51.100.66" });
      await new Promise((resolve) => setTimeout(resolve, 600));
      const suspiciousResponse = await threatApi.simulateSuspiciousRequests({ email: "analyst@cybershield.local", ipAddress: "192.0.2.44" });

      const presentationAlert = {
        ...suspiciousResponse.data.data,
        title: "Presentation Demo Sequence Detected",
        message: "CyberShield processed brute-force, unknown-account, and rapid-request patterns in one safe demo sequence.",
        highestScore: Math.max(
          bruteForceResponse.data.data.highestScore || 0,
          suspiciousResponse.data.data.highestScore || 0
        )
      };

      setActiveThreatAlert(presentationAlert);
      playAlertTone(soundEnabled);
      await loadDashboard(true);
      toast.success("Presentation demo completed. Dashboard, alerts, and charts are updated.", {
        id: "presentation-demo"
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Presentation demo could not be completed.", {
        id: "presentation-demo"
      });
    } finally {
      setPresentationLoading(false);
    }
  }

  const { summary, charts, recentAttempts, recentAlerts } = dashboard;

  function closeThreatAlert() {
    setActiveThreatAlert(null);
    stopAlertTone();
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      <ThreatAlertOverlay alert={activeThreatAlert} onClose={closeThreatAlert} />

      <motion.div variants={fadeUp} className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono text-sm uppercase text-cyber-lime">Security Overview</p>
          <h1 className="mt-1 text-3xl font-extrabold text-white light:text-slate-950">Cyber Threat Dashboard</h1>
          <p className="mt-2 text-slate-400 light:text-slate-600">
            Monitor authentication activity, risk scores, alerts, and threat trends in one dashboard.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SoundToggle enabled={soundEnabled} setEnabled={setSoundEnabled} />
          <NeonButton
            icon={Presentation}
            variant="lime"
            loading={presentationLoading}
            onClick={runPresentationDemo}
          >
            Presentation Demo
          </NeonButton>
          <NeonButton icon={Download} variant="ghost" onClick={downloadReport}>
            PDF Report
          </NeonButton>
        </div>
      </motion.div>

      <AlertTicker alerts={recentAlerts} />

      <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Login Attempts" value={summary.totalAttempts} icon={LogIn} tone="cyan" />
        <StatCard title="Failed Attempts" value={summary.failedAttempts} icon={AlertTriangle} tone="red" />
        <StatCard title="Detected Threats" value={summary.threatCount} icon={ShieldAlert} tone="amber" />
        <StatCard title="Active Alerts" value={summary.activeAlerts} icon={Siren} tone="violet" />
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <CyberCard>
          <RiskMeter score={summary.riskScore} />
          <div className="mt-5 rounded-md border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-slate-400 light:text-slate-600">System Health</p>
            <p className="mt-2 text-2xl font-extrabold text-cyber-cyan">{summary.systemHealth}</p>
          </div>
        </CyberCard>

        <CyberCard>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white light:text-slate-950">Threat Trend</h2>
            <Activity className="h-5 w-5 text-cyber-cyan" />
          </div>
          <ThreatLineChart trend={charts.trend} />
        </CyberCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <CyberCard>
          <h2 className="mb-4 text-lg font-bold text-white light:text-slate-950">Threat Distribution</h2>
          <ThreatPieChart items={charts.threatDistribution} />
        </CyberCard>

        <CyberCard>
          <SimulatorPanel
            soundEnabled={soundEnabled}
            onAlert={setActiveThreatAlert}
            onComplete={() => {
              loadDashboard(true);
            }}
          />
        </CyberCard>
      </div>

      <CyberCard>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white light:text-slate-950">Recent Activity Feed</h2>
          <span className="rounded bg-cyber-cyan/15 px-2 py-1 font-mono text-xs text-cyber-cyan">
            {loading ? "SYNCING" : "LIVE"}
          </span>
        </div>
        <ActivityTable rows={recentAttempts} />
      </CyberCard>
    </motion.div>
  );
}
