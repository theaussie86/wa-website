import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Handwerk palette
        "primary": {
          DEFAULT: "#003970",
          50: "#E6EEF5",
          100: "#CCE0F0",
          200: "#99C0E0",
          300: "#66A0D0",
          400: "#3380C0",
          500: "#003970",
          600: "#002D5A",
          700: "#002244",
          800: "#00172E",
          900: "#000B17",
        },
        "accent": {
          DEFAULT: "#D86B00",
          50: "#FEF3E8",
          100: "#FDE7D1",
          200: "#FBCFA3",
          300: "#F9B775",
          400: "#F79F47",
          500: "#D86B00",
          600: "#AD5600",
          700: "#824000",
          800: "#572B00",
          900: "#2B1500",
        },
        "charcoal": "#2D3436",
        "warm-white": "#FAF9F7",
        "amber": "#F5A14D",
      },
      fontFamily: {
        serif: ["var(--font-bree-serif)", "Georgia", "serif"],
        sans: ["var(--font-raleway)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "geometric-pattern": "url('/patterns/geometric.svg')",
      },
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.08)",
        md: "0 8px 30px rgba(0, 0, 0, 0.10)",
        lg: "0 12px 40px rgba(0, 0, 0, 0.12)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
