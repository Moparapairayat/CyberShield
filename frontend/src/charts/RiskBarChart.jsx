import { Bar } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext.jsx";
import { createChartOptions } from "./chartOptions.js";

export default function RiskBarChart({ items = [] }) {
  const { theme } = useTheme();
  const safeItems = items.length ? items : [
    { label: "Low", value: 4 },
    { label: "Medium", value: 6 },
    { label: "High", value: 3 },
    { label: "Critical", value: 1 }
  ];

  const data = {
    labels: safeItems.map((item) => item.label || item._id),
    datasets: [
      {
        label: "Threat Levels",
        data: safeItems.map((item) => item.value || item.count),
        backgroundColor: ["#a3e635", "#f59e0b", "#fb923c", "#fb3d5d"],
        borderRadius: 6
      }
    ]
  };

  return (
    <div className="h-72">
      <Bar data={data} options={createChartOptions(theme)} />
    </div>
  );
}
