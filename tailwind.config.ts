import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#2D3436",
            "--tw-prose-headings": "#003970",
            "--tw-prose-lead": "#2D3436",
            "--tw-prose-links": "#D86B00",
            "--tw-prose-bold": "#003970",
            "--tw-prose-counters": "#003970",
            "--tw-prose-bullets": "#D86B00",
            "--tw-prose-hr": "#E6EEF5",
            "--tw-prose-quotes": "#003970",
            "--tw-prose-quote-borders": "#D86B00",
            "--tw-prose-captions": "#2D3436",
            "--tw-prose-code": "#003970",
            "--tw-prose-pre-code": "#FAF9F7",
            "--tw-prose-pre-bg": "#002244",
            "--tw-prose-th-borders": "#CCE0F0",
            "--tw-prose-td-borders": "#E6EEF5",
            color: "var(--tw-prose-body)",
            maxWidth: "none",
            lineHeight: "1.8",
            // Headings
            h2: {
              fontFamily: "var(--font-bree-serif), Georgia, serif",
              color: "var(--tw-prose-headings)",
              fontWeight: "400",
              marginTop: "2.5em",
              marginBottom: "0.75em",
              lineHeight: "1.3",
            },
            h3: {
              fontFamily: "var(--font-bree-serif), Georgia, serif",
              color: "var(--tw-prose-headings)",
              fontWeight: "400",
              marginTop: "2em",
              marginBottom: "0.5em",
              lineHeight: "1.4",
            },
            h4: {
              fontFamily: "var(--font-bree-serif), Georgia, serif",
              color: "var(--tw-prose-headings)",
              fontWeight: "400",
              marginTop: "1.5em",
              marginBottom: "0.5em",
            },
            // Paragraphs
            p: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
            // Links
            a: {
              color: "var(--tw-prose-links)",
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            // Lists - this is the key fix
            ul: {
              listStyleType: "disc",
              paddingLeft: "1.5em",
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
            ol: {
              listStyleType: "decimal",
              paddingLeft: "1.5em",
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
            li: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
              paddingLeft: "0.375em",
            },
            "ul > li::marker": {
              color: "var(--tw-prose-bullets)",
            },
            "ol > li::marker": {
              color: "var(--tw-prose-counters)",
              fontWeight: "500",
            },
            // Nested lists
            "ul ul, ul ol, ol ul, ol ol": {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },
            // Strong text
            strong: {
              color: "var(--tw-prose-bold)",
              fontWeight: "600",
            },
            // Blockquotes
            blockquote: {
              fontStyle: "italic",
              color: "var(--tw-prose-quotes)",
              borderLeftWidth: "4px",
              borderLeftColor: "var(--tw-prose-quote-borders)",
              paddingLeft: "1.5em",
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
            // Code
            code: {
              color: "var(--tw-prose-code)",
              backgroundColor: "#E6EEF5",
              padding: "0.25em 0.4em",
              borderRadius: "0.25em",
              fontWeight: "500",
              fontSize: "0.875em",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            // Pre blocks
            pre: {
              backgroundColor: "var(--tw-prose-pre-bg)",
              color: "var(--tw-prose-pre-code)",
              borderRadius: "0.375em",
              padding: "1em 1.5em",
              overflowX: "auto",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              color: "inherit",
              fontSize: "inherit",
            },
            // Horizontal rules
            hr: {
              borderColor: "var(--tw-prose-hr)",
              marginTop: "3em",
              marginBottom: "3em",
            },
          },
        },
        lg: {
          css: {
            fontSize: "1.125rem",
            lineHeight: "1.8",
            h2: {
              fontSize: "1.75rem",
              marginTop: "2.5em",
              marginBottom: "0.75em",
            },
            h3: {
              fontSize: "1.375rem",
              marginTop: "2em",
              marginBottom: "0.5em",
            },
            p: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
            ul: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
            ol: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
            li: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },
          },
        },
      },
    },
  },
  plugins: [
    typography({
      className: "prose",
    }),
  ],
};
export default config;
