import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "accent-blue": "var(--accent-blue)",
        "accent-purple": "#7c3aed",
        "space-dark": "#030014",
        "space-mid": "var(--space-mid)",

        // "space-gray": "var(--space-gray)",

        "space-gray": "#0a0a1e",
        "space-light": "#e2e8f0",

        "gradient-start": "#030014",

        "gradient-mid": "#1e1b4b" /* Midnight Blue */,
        "gradient-end": "#312e81" /* Deep Indigo */,
      },
      fontFamily: {
        "space-mono": ['"Space Mono"', "monospace"],
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
