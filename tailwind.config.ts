import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        beige: "#F5EFE6",
        cocoa: "#8B6F47",
        accent: "#FF8C42",
        charcoal: "#3A3A3A",
        cream: "#FBF7F0",
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "paw-walk": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "paw-walk": "paw-walk 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
