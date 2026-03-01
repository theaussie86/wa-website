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
        "forest": {
          DEFAULT: "#1B4332",
          50: "#E8F0EC",
          100: "#D1E1D9",
          200: "#A3C3B3",
          300: "#75A58D",
          400: "#478767",
          500: "#1B4332",
          600: "#163628",
          700: "#11291E",
          800: "#0B1B14",
          900: "#060E0A",
        },
        "copper": {
          DEFAULT: "#B87333",
          50: "#F7F0E8",
          100: "#EFE1D1",
          200: "#DFC3A3",
          300: "#CFA575",
          400: "#BF8747",
          500: "#B87333",
          600: "#935C29",
          700: "#6E451F",
          800: "#4A2E15",
          900: "#25170A",
        },
        "charcoal": "#2D3436",
        "warm-white": "#FAF9F7",
        "gold": "#D4A574",
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
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
