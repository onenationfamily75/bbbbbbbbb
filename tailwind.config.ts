import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          DEFAULT: "#c9556b",
          dark: "#a8405a",
          light: "#f5d0da",
          pale: "#fdf0f3",
        },
        gold: "#c9a84c",
        charcoal: "#1a1118",
        plum: "#4a2d45",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Jost", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
