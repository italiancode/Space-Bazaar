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
        "space-mid": "#1e1b4b",

        // "space-gray": "var(--space-gray)",

        "space-gray": "#0a0a1e",
        "space-light": "#e2e8f0",

        "gradient-start": "#030014",

        "gradient-mid": "#1e1b4b" /* Midnight Blue */,
        "gradient-end": "#312e81" /* Deep Indigo */,

        "header-bg": "#030014", // Deep Space Black base
        "header-blur": "rgba(3, 0, 20, 0.8)", // Matching space theme with transparency
        "header-border": "#4F46E5", // Electric Indigo for the bottom border
        "header-hover": "#4f46e5", // Electric Indigo for hover states
      },
      fontFamily: {
        "space-mono": ['"Space Mono"', "monospace"],
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        "fade-in-down": "fadeInDown 0.5s ease-out",
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
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
