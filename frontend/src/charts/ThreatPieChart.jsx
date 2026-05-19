import { Doughnut } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext.jsx";
import { createChartOptions } from "./chartOptions.js";

export default function ThreatPieChart({ items = [] }) {
  const { theme } = useTheme();
  const safeItems = items.length ? items : [{ label: "No threats", value: 1 }];
  const data = {
    labels: safeItems.map((item) => item.label || item._id),
    datasets: [
      {
        data: safeItems.map((item) => item.value || item.count),
        backgroundColor: ["#22d3ee", "#a3e635", "#f59e0b", "#fb3d5d", "#8b5cf6"],
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="h-72">
      <Doughnut data={data} options={{ ...createChartOptions(theme, { doughnut: true }), cutout: "64%" }} />
    </div>
  );
}
