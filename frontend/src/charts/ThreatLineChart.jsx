import { Line } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext.jsx";
import { createChartOptions } from "./chartOptions.js";

export default function ThreatLineChart({ trend = [] }) {
  const { theme } = useTheme();
  const data = {
    labels: trend.map((item) => item.date),
    datasets: [
      {
        label: "Login Attempts",
        data: trend.map((item) => item.attempts || item.threats || 0),
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34, 211, 238, 0.18)",
        fill: true,
        tension: 0.4
      },
      {
        label: "Failed / Threats",
        data: trend.map((item) => item.failed || item.threats || 0),
        borderColor: "#fb3d5d",
        backgroundColor: "rgba(251, 61, 93, 0.12)",
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="h-80">
      <Line data={data} options={createChartOptions(theme)} />
    </div>
  );
}
