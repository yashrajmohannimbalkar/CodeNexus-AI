import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505", // Deepest Black
        surface: "#0a0a0a",     // Dark Grey for boxes
        primary: "#00ff9d",     // 🟢 THE GLOWING GREEN
        secondary: "#00cc7d",
        muted: "#333333",
        error: "#ff3333",
      },
      fontFamily: {
        mono: ['"Courier New"', "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;