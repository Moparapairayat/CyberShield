import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
);

export function createChartOptions(theme = "dark", { doughnut = false } = {}) {
  const isLight = theme === "light";
  const textColor = isLight ? "#475569" : "#cbd5e1";
  const mutedColor = isLight ? "#64748b" : "#94a3b8";
  const gridColor = isLight ? "rgba(100, 116, 139, 0.18)" : "rgba(148, 163, 184, 0.12)";

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          boxWidth: 12
        }
      },
      tooltip: {
        backgroundColor: isLight ? "rgba(255, 255, 255, 0.96)" : "rgba(15, 23, 42, 0.94)",
        titleColor: isLight ? "#0f172a" : "#f8fafc",
        bodyColor: isLight ? "#334155" : "#e2e8f0",
        borderColor: "rgba(34, 211, 238, 0.35)",
        borderWidth: 1
      }
    },
    scales: doughnut
      ? undefined
      : {
          x: {
            ticks: { color: mutedColor },
            grid: { color: gridColor }
          },
          y: {
            ticks: { color: mutedColor },
            grid: { color: gridColor }
          }
        }
  };
}
