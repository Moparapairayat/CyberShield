import { Bug, Radar, Skull, Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import { threatApi } from "../services/api.js";
import { playAlertTone } from "../hooks/useSoundAlert.js";
import NeonButton from "./NeonButton.jsx";

export default function SimulatorPanel({ onComplete, onAlert, soundEnabled = true }) {
  const [loading, setLoading] = useState("");
  const { isAdmin } = useAuth();

  async function runSimulation(type) {
    if (!isAdmin) {
      toast.error("Please sign in as an admin to run attack simulations.");
      return;
    }

    const actions = {
      brute: threatApi.simulateBruteForce,
      unknown: threatApi.simulateUnknownAccount,
      suspicious: threatApi.simulateSuspiciousRequests
    };

    try {
      setLoading(type);
      const response = await actions[type]({});
      onAlert?.(response.data.data);
      playAlertTone(soundEnabled);
      toast.success(response.data.message);
      onComplete?.(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Simulation could not be completed.");
    } finally {
      setLoading("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyber-red/15 text-cyber-red">
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white light:text-slate-950">Attack Simulator</h2>
          <p className="text-sm text-slate-400 light:text-slate-600">Generate safe demo events and watch the risk engine respond.</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <NeonButton
          icon={Skull}
          variant="danger"
          loading={loading === "brute"}
          onClick={() => runSimulation("brute")}
          className="w-full"
        >
          Brute Force
        </NeonButton>
        <NeonButton
          icon={Bug}
          variant="ghost"
          loading={loading === "unknown"}
          onClick={() => runSimulation("unknown")}
          className="w-full"
        >
          Unknown Login
        </NeonButton>
        <NeonButton
          icon={Radar}
          variant="lime"
          loading={loading === "suspicious"}
          onClick={() => runSimulation("suspicious")}
          className="w-full"
        >
          Rapid Requests
        </NeonButton>
      </div>
    </div>
  );
}
