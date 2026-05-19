/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#05070f",
          panel: "#0a1020",
          panel2: "#101827",
          cyan: "#22d3ee",
          lime: "#a3e635",
          red: "#fb3d5d",
          amber: "#f59e0b",
          violet: "#8b5cf6",
          white: "#e6f6ff"
        }
      },
      boxShadow: {
        neon: "0 0 24px rgba(34, 211, 238, 0.35)",
        danger: "0 0 24px rgba(251, 61, 93, 0.35)",
        lime: "0 0 24px rgba(163, 230, 53, 0.25)"
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)"
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"]
      }
    }
  },
  plugins: [
    function lightVariant({ addVariant }) {
      addVariant("light", ".light &");
    }
  ]
};
