# Website Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete "Modern Handwerk" website with Homepage, About, Services, Contact, and Blog pages.

**Architecture:** Next.js App Router with shared layout, Tailwind CSS for styling, reusable components in `src/app/_components/`, page routes in `src/app/`. Existing blog infrastructure (markdown posts) will be preserved and styled.

**Tech Stack:** Next.js 14+, React 19, TypeScript, Tailwind CSS, Google Fonts (DM Serif Display, Inter)

---

## Phase 1: Foundation

### Task 1: Update Tailwind Config with Design Tokens

**Files:**
- Modify: `tailwind.config.ts`

**Step 1: Update the Tailwind config with new colors and fonts**

```typescript
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
```

**Step 2: Run build to verify config is valid**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds without errors

**Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: add Modern Handwerk design tokens to Tailwind"
```

---

### Task 2: Update Global CSS and Fonts

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Update globals.css with base styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-warm-white text-charcoal antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif text-forest;
  }

  a {
    @apply transition-colors duration-200;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center px-6 py-3 bg-copper text-white font-medium rounded-sm hover:bg-copper-600 transition-colors duration-200;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center px-6 py-3 border-2 border-forest text-forest font-medium rounded-sm hover:bg-forest hover:text-white transition-colors duration-200;
  }

  .btn-whatsapp {
    @apply inline-flex items-center justify-center px-6 py-3 bg-[#25D366] text-white font-medium rounded-sm hover:bg-[#20BD5A] transition-colors duration-200;
  }

  .section {
    @apply py-16 md:py-24;
  }

  .container-narrow {
    @apply max-w-4xl mx-auto px-5;
  }
}
```

**Step 2: Update layout.tsx with new fonts**

```tsx
import Footer from "@/app/_components/footer";
import { SITE_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import cn from "classnames";

import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} | Prozessautomatisierung & KI`,
  description: "Langfristige Partnerschaft für Prozessautomatisierung und KI im Mittelstand. Aus dem Allgäu, für den DACH-Raum.",
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${dmSerif.variable} ${inter.variable}`}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#1B4332"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#1B4332" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#1B4332" />
      </head>
      <body className={cn("font-sans min-h-screen flex flex-col")}>
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 3: Update constants**

Modify `src/lib/constants.ts`:

```typescript
export const SITE_NAME = "Weissteiner Automation";
export const SITE_DESCRIPTION = "Langfristige Partnerschaft für Prozessautomatisierung und KI im Mittelstand.";
export const HOME_OG_IMAGE_URL = "/og-image.png";
export const CONTACT_EMAIL = "christoph@weissteiner-automation.com";
export const CONTACT_PHONE = "+4917630487024";
export const WHATSAPP_LINK = "https://wa.me/4917630487024";
export const CAL_LINK = "https://cal.com/weissteiner-automation/kurzes-kennenlernen";
export const LOCATION = "Memmingen, Allgäu";
```

**Step 4: Run dev server to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run dev`
Expected: Server starts, page loads with new fonts

**Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/lib/constants.ts
git commit -m "feat: add global styles, fonts, and site constants"
```

---

### Task 3: Create Navigation Component

**Files:**
- Create: `src/app/_components/navigation.tsx`

**Step 1: Create the navigation component**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_NAME, CAL_LINK } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-forest/10">
      <nav className="container mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl text-forest font-medium">
            {SITE_NAME}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal hover:text-forest transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Kennenlernen
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-forest"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-charcoal hover:text-forest transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center mt-2"
              >
                Kennenlernen
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/_components/navigation.tsx
git commit -m "feat: add responsive navigation component"
```

---

### Task 4: Update Footer Component

**Files:**
- Modify: `src/app/_components/footer.tsx`

**Step 1: Replace footer with new design**

```tsx
import Link from "next/link";
import {
  SITE_NAME,
  CONTACT_EMAIL,
  WHATSAPP_LINK,
  LOCATION,
  CAL_LINK,
} from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="container mx-auto px-5 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-white mb-4">{SITE_NAME}</h3>
            <p className="text-forest-200 mb-4">
              Langfristige Partnerschaft für Prozessautomatisierung und KI im Mittelstand.
            </p>
            <p className="text-forest-300 text-sm">{LOCATION}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-forest-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest-200 hover:text-white transition-colors"
                >
                  Gespräch buchen
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest-200 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-forest-200 hover:text-white transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-forest-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-forest-300 text-sm">
              © {new Date().getFullYear()} {SITE_NAME}. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              <Link
                href="/impressum"
                className="text-forest-300 hover:text-white text-sm transition-colors"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="text-forest-300 hover:text-white text-sm transition-colors"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/_components/footer.tsx
git commit -m "feat: update footer with Modern Handwerk design"
```

---

### Task 5: Add Navigation to Layout

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Import and add Navigation to layout**

Add import at top:
```tsx
import { Navigation } from "@/app/_components/navigation";
```

Update body content:
```tsx
<body className={cn("font-sans min-h-screen flex flex-col")}>
  <Navigation />
  <div className="flex-1">{children}</div>
  <Footer />
</body>
```

**Step 2: Run dev to verify navigation appears**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run dev`
Expected: Navigation visible on page

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add navigation to global layout"
```

---

## Phase 2: Homepage

### Task 6: Create Hero Section Component

**Files:**
- Create: `src/app/_components/hero.tsx`

**Step 1: Create the hero component**

```tsx
import { CAL_LINK, WHATSAPP_LINK } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#1B4332_25%,transparent_25%,transparent_75%,#1B4332_75%)] bg-[length:60px_60px]" />
      </div>

      <div className="container mx-auto px-5 relative">
        <div className="max-w-3xl">
          {/* Trust bar */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full">
              Memmingen/Allgäu
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full">
              Langfristige Partnerschaft
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full">
              Keine Agentur
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest leading-tight mb-6">
            Systeme, die mit Ihrem Unternehmen wachsen
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-charcoal/80 mb-8 leading-relaxed">
            Als Ihr langfristiger Partner baue ich Automatisierungssysteme direkt in Ihre Infrastruktur —
            und bleibe, um sie zu pflegen und weiterzuentwickeln.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              Kennenlernen vereinbaren
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-lg px-8 py-4"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/_components/hero.tsx
git commit -m "feat: add hero section component"
```

---

### Task 7: Create Problem Section Component

**Files:**
- Create: `src/app/_components/problem-section.tsx`

**Step 1: Create the problem/agitation section**

```tsx
export function ProblemSection() {
  const problems = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Excel-Chaos",
      description: "Daten werden manuell zwischen Systemen kopiert. Fehler passieren, Zeit geht verloren.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      title: "Build and Leave",
      description: "Agenturen bauen ein System und verschwinden. Ändern sich Anforderungen, passt nichts mehr.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Agentur-Overhead",
      description: "Projektmanager, große Büros, hohe Stundensätze — Sie zahlen für Strukturen, die Sie nicht brauchen.",
    },
  ];

  return (
    <section className="section bg-forest/5">
      <div className="container mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
            Kommt Ihnen das bekannt vor?
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Viele Unternehmen kämpfen mit denselben Herausforderungen bei der Digitalisierung.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-sm shadow-sm border border-forest/10"
            >
              <div className="text-copper mb-4">{problem.icon}</div>
              <h3 className="font-serif text-xl text-forest mb-3">{problem.title}</h3>
              <p className="text-charcoal/70">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/_components/problem-section.tsx
git commit -m "feat: add problem/agitation section component"
```

---

### Task 8: Create Solution Section Component

**Files:**
- Create: `src/app/_components/solution-section.tsx`

**Step 1: Create the solution section with System Stacking visual**

```tsx
export function SolutionSection() {
  const steps = [
    {
      number: "01",
      title: "Bauen",
      description: "Ich analysiere Ihre Prozesse und baue maßgeschneiderte Automatisierungen direkt in Ihrer Infrastruktur.",
    },
    {
      number: "02",
      title: "Warten",
      description: "Systeme brauchen Pflege. Ich überwache, optimiere und passe an — kontinuierlich, nicht einmalig.",
    },
    {
      number: "03",
      title: "Stacken",
      description: "Mit der Zeit bauen wir System auf System. Jede neue Automatisierung baut auf dem Bestehenden auf.",
    },
  ];

  return (
    <section className="section">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
            System Stacking statt Einmalprojekt
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Statt eines großen IT-Projekts bauen wir schrittweise — System für System,
            abgestimmt auf Ihr Tempo und Ihre Prioritäten.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-copper/30" />
              )}

              <div className="relative bg-warm-white p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-copper text-white font-serif text-2xl rounded-sm mb-6">
                  {step.number}
                </div>
                <h3 className="font-serif text-2xl text-forest mb-3">{step.title}</h3>
                <p className="text-charcoal/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/_components/solution-section.tsx
git commit -m "feat: add solution section with System Stacking"
```

---

### Task 9: Create Trust Section Component

**Files:**
- Create: `src/app/_components/trust-section.tsx`

**Step 1: Create trust section (ownership, documentation, contracts)**

```tsx
export function TrustSection() {
  const trustPoints = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Ihre Systeme. Ihre Kontrolle.",
      description: "Alles wird in Ihrer Infrastruktur gebaut und vollständig dokumentiert. Sie sind nie abhängig von mir.",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Planbare Zusammenarbeit",
      description: "Verträge über 3, 6 oder 12 Monate. Kein Onboarding-Overhead, keine HR-Komplexität. Einfacher als eine Festanstellung.",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      title: "Flexibel & fair",
      description: "Wenn die Zusammenarbeit funktioniert, verlängern wir. Wenn nicht — keine harten Gefühle. Sie haben die volle Kontrolle.",
    },
  ];

  return (
    <section className="section bg-forest text-white">
      <div className="container mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Partnerschaft ohne Risiko
          </h2>
          <p className="text-lg text-forest-200 max-w-2xl mx-auto">
            Ich verdiene Ihr Vertrauen durch Ergebnisse — nicht durch Abhängigkeit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="p-8 border border-forest-400 rounded-sm"
            >
              <div className="text-copper mb-4">{point.icon}</div>
              <h3 className="font-serif text-xl text-white mb-3">{point.title}</h3>
              <p className="text-forest-200">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/_components/trust-section.tsx
git commit -m "feat: add trust section component"
```

---

### Task 10: Create Services Preview Component

**Files:**
- Create: `src/app/_components/services-preview.tsx`

**Step 1: Create services preview cards**

```tsx
import Link from "next/link";

export function ServicesPreview() {
  const services = [
    {
      title: "Prozessautomatisierung",
      description: "Rechnungsverarbeitung, CRM-Updates, Datenübertragungen — automatisiert und fehlerfrei.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "KI-Integration",
      description: "Intelligente Dokumentenverarbeitung, Analyse und Entscheidungsunterstützung.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Wartung & Support",
      description: "Kontinuierliche Betreuung, Updates und schnelle Hilfe bei Problemen.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section">
      <div className="container mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
            Was ich für Sie tue
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Technologie, die arbeitet. Menschen, die gestalten.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-white border border-forest/10 rounded-sm hover:border-copper/50 hover:shadow-md transition-all"
            >
              <div className="text-forest group-hover:text-copper transition-colors mb-6">
                {service.icon}
              </div>
              <h3 className="font-serif text-xl text-forest mb-3">{service.title}</h3>
              <p className="text-charcoal/70">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/leistungen" className="btn-secondary">
            Alle Leistungen ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/_components/services-preview.tsx
git commit -m "feat: add services preview component"
```

---

### Task 11: Create CTA Section Component

**Files:**
- Create: `src/app/_components/cta-section.tsx`

**Step 1: Create final CTA section**

```tsx
import { CAL_LINK, WHATSAPP_LINK } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="section bg-copper/10">
      <div className="container mx-auto px-5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
            Bereit für den ersten Schritt?
          </h2>
          <p className="text-lg text-charcoal/70 mb-8">
            Lassen Sie uns in einem kurzen Gespräch herausfinden, ob wir zusammenpassen.
            Unverbindlich und ohne Verkaufsdruck.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              Kennenlernen vereinbaren
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-lg px-8 py-4"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Kurze Frage? WhatsApp
            </a>
          </div>

          <p className="mt-8 text-sm text-charcoal/50">
            Aus dem Allgäu, für den Mittelstand
          </p>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/_components/cta-section.tsx
git commit -m "feat: add CTA section component"
```

---

### Task 12: Build Homepage

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Replace homepage with new sections**

```tsx
import { Hero } from "@/app/_components/hero";
import { ProblemSection } from "@/app/_components/problem-section";
import { SolutionSection } from "@/app/_components/solution-section";
import { TrustSection } from "@/app/_components/trust-section";
import { ServicesPreview } from "@/app/_components/services-preview";
import { CTASection } from "@/app/_components/cta-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ServicesPreview />
      <TrustSection />
      <CTASection />
    </main>
  );
}
```

**Step 2: Run dev server to verify homepage**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run dev`
Expected: Homepage displays all sections correctly

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: build homepage with all sections"
```

---

## Phase 3: Additional Pages

### Task 13: Create About Page

**Files:**
- Create: `src/app/ueber-mich/page.tsx`

**Step 1: Create the About page**

```tsx
import { Metadata } from "next";
import { CAL_LINK, WHATSAPP_LINK, SITE_NAME } from "@/lib/constants";
import { CTASection } from "@/app/_components/cta-section";

export const metadata: Metadata = {
  title: `Über mich | ${SITE_NAME}`,
  description: "Christoph Weissteiner — Ihr Partner für Prozessautomatisierung und KI aus dem Allgäu.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Systeme gehören in Ihre Infrastruktur",
      description: "Ich baue nichts, das nur ich verstehe. Alles wird dokumentiert und kann übernommen werden.",
    },
    {
      title: "Langfristig denken, schrittweise bauen",
      description: "Große IT-Projekte scheitern oft. Besser: System für System, mit Zeit zum Lernen und Anpassen.",
    },
    {
      title: "Partnerschaft statt Dienstleistung",
      description: "Ich will Ihre Prozesse verstehen, nicht nur Aufträge abarbeiten.",
    },
    {
      title: "Ehrlichkeit spart Zeit",
      description: "Wenn etwas nicht funktioniert oder keinen Sinn macht, sage ich es Ihnen. Lieber früh als zu spät.",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Kennenlernen",
      description: "In einem kurzen Gespräch finden wir heraus, ob wir zusammenpassen und was Sie brauchen.",
    },
    {
      step: "2",
      title: "Analyse",
      description: "Ich schaue mir Ihre Prozesse an und identifiziere die größten Hebel für Automatisierung.",
    },
    {
      step: "3",
      title: "Roadmap",
      description: "Gemeinsam priorisieren wir, was wir zuerst angehen. Schnelle Erfolge oder Grundlagen — Sie entscheiden.",
    },
    {
      step: "4",
      title: "Umsetzung & Betreuung",
      description: "Ich baue die Systeme, dokumentiere alles und bleibe als Partner an Ihrer Seite.",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Über mich
            </h1>
            <p className="text-xl text-charcoal/80 leading-relaxed">
              Ich bin Christoph Weissteiner, Automatisierungs-Spezialist aus Memmingen im Allgäu.
              Ich helfe mittelständischen Unternehmen, ihre Prozesse zu digitalisieren —
              als langfristiger Partner, nicht als Agentur.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-forest/5">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl text-forest mb-6">
              Warum Partnerschaft statt Projekt?
            </h2>
            <div className="prose prose-lg text-charcoal/80 space-y-4">
              <p>
                Ich habe gesehen, wie Agenturen arbeiten: großes Projekt, viele Meetings,
                eine Übergabe — und dann sind sie weg. Das System funktioniert vielleicht
                am Anfang. Aber Anforderungen ändern sich. Mitarbeiter wechseln.
                Und plötzlich passt nichts mehr.
              </p>
              <p>
                Deshalb arbeite ich anders. Statt eines großen Projekts baue ich
                System für System, direkt in Ihrer Infrastruktur. Ich dokumentiere alles,
                sodass Sie nie von mir abhängig sind. Und ich bleibe als Partner,
                um zu warten, anzupassen und weiterzuentwickeln.
              </p>
              <p>
                Das Ergebnis: Systeme, die mit Ihrem Unternehmen wachsen.
                Keine veralteten Lösungen. Kein Vendor Lock-in. Nur kontinuierliche
                Verbesserung Ihrer Prozesse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container mx-auto px-5">
          <h2 className="font-serif text-3xl text-forest mb-12 text-center">
            So arbeite ich
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-copper text-white font-serif text-xl rounded-sm mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl text-forest mb-2">{item.title}</h3>
                <p className="text-charcoal/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-forest text-white">
        <div className="container mx-auto px-5">
          <h2 className="font-serif text-3xl text-white mb-12 text-center">
            Woran ich glaube
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="p-6 border border-forest-400 rounded-sm">
                <h3 className="font-serif text-xl text-white mb-2">{value.title}</h3>
                <p className="text-forest-200">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/ueber-mich/page.tsx
git commit -m "feat: add About page"
```

---

### Task 14: Create Services Page

**Files:**
- Create: `src/app/leistungen/page.tsx`

**Step 1: Create the Services page**

```tsx
import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { CTASection } from "@/app/_components/cta-section";

export const metadata: Metadata = {
  title: `Leistungen | ${SITE_NAME}`,
  description: "Prozessautomatisierung, KI-Integration und langfristige Wartung für den Mittelstand.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Prozessautomatisierung",
      description: "Wiederkehrende Aufgaben automatisieren, damit Ihr Team Zeit für Wichtiges hat.",
      features: [
        "Rechnungsverarbeitung und Buchhaltung",
        "CRM-Updates und Kundendatenmanagement",
        "E-Mail-Marketing und Follow-ups",
        "Datenübertragung zwischen Systemen",
        "Berichterstellung und Datenanalyse",
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "KI-Integration",
      description: "Intelligente Systeme, die Entscheidungen unterstützen und Routineaufgaben übernehmen.",
      features: [
        "Dokumentenverarbeitung und -analyse",
        "Intelligente Datenextraktion",
        "Automatisierte Kategorisierung",
        "Entscheidungsunterstützung",
        "Chatbots und Kundenservice",
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Wartung & Support",
      description: "Systeme brauchen Pflege. Ich bleibe als Partner an Ihrer Seite.",
      features: [
        "Kontinuierliche Überwachung",
        "Proaktive Optimierung",
        "Schnelle Hilfe bei Problemen",
        "Anpassungen an neue Anforderungen",
        "Regelmäßige Updates und Verbesserungen",
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  const useCases = [
    "Rechnungen automatisch verarbeiten und buchen",
    "Kundendaten zwischen CRM und anderen Systemen synchronisieren",
    "Angebote automatisch erstellen und versenden",
    "Mitarbeiter-Onboarding digitalisieren",
    "Lagerbestände automatisch überwachen und nachbestellen",
    "Berichte automatisch generieren und verteilen",
  ];

  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Leistungen
            </h1>
            <p className="text-xl text-charcoal/80 leading-relaxed">
              Ich baue Automatisierungssysteme, die mit Ihrem Unternehmen wachsen.
              Direkt in Ihrer Infrastruktur, vollständig dokumentiert, langfristig betreut.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-forest/5">
        <div className="container mx-auto px-5">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="text-copper mb-6">{service.icon}</div>
                  <h2 className="font-serif text-3xl text-forest mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-charcoal/70 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-copper mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-charcoal/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`bg-forest/10 rounded-sm aspect-square flex items-center justify-center ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <div className="text-forest/30 scale-[3]">{service.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section">
        <div className="container mx-auto px-5">
          <h2 className="font-serif text-3xl text-forest mb-8 text-center">
            Konkrete Anwendungsfälle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-forest/10 rounded-sm"
              >
                <p className="text-charcoal/80">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ownership */}
      <section className="section bg-forest text-white">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-white mb-6">
              Ihre Systeme. Ihre Kontrolle.
            </h2>
            <p className="text-lg text-forest-200 mb-8">
              Alles, was ich baue, gehört Ihnen. Vollständig dokumentiert, in Ihrer
              Infrastruktur, jederzeit übertragbar. Sie sind nie von mir abhängig —
              ich muss mir Ihr Vertrauen jeden Monat neu verdienen.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-4 border border-forest-400 rounded-sm">
                <h3 className="font-medium text-white mb-2">Vollständige Dokumentation</h3>
                <p className="text-forest-200 text-sm">
                  Jedes System wird so dokumentiert, dass es übernommen werden kann.
                </p>
              </div>
              <div className="p-4 border border-forest-400 rounded-sm">
                <h3 className="font-medium text-white mb-2">Ihre Infrastruktur</h3>
                <p className="text-forest-200 text-sm">
                  Systeme laufen bei Ihnen, nicht in meiner Cloud.
                </p>
              </div>
              <div className="p-4 border border-forest-400 rounded-sm">
                <h3 className="font-medium text-white mb-2">Keine Abhängigkeit</h3>
                <p className="text-forest-200 text-sm">
                  Ein anderer Entwickler kann jederzeit übernehmen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contract Model */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-forest mb-4">
              Einfacher als eine Festanstellung. Flexibler als eine Agentur.
            </h2>
            <p className="text-lg text-charcoal/70 mb-8">
              Planbare Zusammenarbeit ohne versteckte Kosten und ohne Risiko.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-forest/5 rounded-sm">
                <div className="font-serif text-2xl text-forest mb-2">3 Monate</div>
                <p className="text-charcoal/70 text-sm">Kennenlernen und erste Ergebnisse</p>
              </div>
              <div className="p-6 bg-copper/10 rounded-sm border-2 border-copper">
                <div className="font-serif text-2xl text-forest mb-2">6 Monate</div>
                <p className="text-charcoal/70 text-sm">Empfohlen für nachhaltige Ergebnisse</p>
              </div>
              <div className="p-6 bg-forest/5 rounded-sm">
                <div className="font-serif text-2xl text-forest mb-2">12 Monate</div>
                <p className="text-charcoal/70 text-sm">Maximale Planungssicherheit</p>
              </div>
            </div>
            <p className="mt-8 text-charcoal/60">
              Verlängern wenn es funktioniert, beenden wenn nicht — ohne harte Gefühle.
            </p>
          </div>
        </div>
      </section>

      {/* Not For Everyone */}
      <section className="section bg-forest/5">
        <div className="container mx-auto px-5">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl text-forest mb-4">
              Nicht für jeden
            </h2>
            <p className="text-charcoal/70">
              Wenn Sie nur ein schnelles Einmalprojekt suchen und keine langfristige
              Zusammenarbeit anstreben, bin ich nicht der Richtige. Ich arbeite mit
              Unternehmen, die Automatisierung als kontinuierlichen Prozess verstehen —
              nicht als einmalige Lösung.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/leistungen/page.tsx
git commit -m "feat: add Services page"
```

---

### Task 15: Create Contact Page

**Files:**
- Create: `src/app/kontakt/page.tsx`

**Step 1: Create the Contact page**

```tsx
import { Metadata } from "next";
import {
  SITE_NAME,
  CAL_LINK,
  WHATSAPP_LINK,
  CONTACT_EMAIL,
  LOCATION,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `Kontakt | ${SITE_NAME}`,
  description: "Lassen Sie uns sprechen — unverbindlich und ohne Verkaufsdruck.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Lassen Sie uns sprechen
            </h1>
            <p className="text-xl text-charcoal/80 leading-relaxed">
              Kein Verkaufsdruck, kein Pitch — nur ein Gespräch, um herauszufinden,
              ob wir zusammenpassen.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section bg-forest/5">
        <div className="container mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Cal.com */}
            <div className="bg-white p-8 rounded-sm shadow-sm border-2 border-copper text-center">
              <div className="text-copper mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-serif text-xl text-forest mb-2">Kennenlernen buchen</h2>
              <p className="text-charcoal/70 text-sm mb-6">
                15-30 Minuten, unverbindlich
              </p>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                Termin wählen
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-white p-8 rounded-sm shadow-sm text-center">
              <div className="text-[#25D366] mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h2 className="font-serif text-xl text-forest mb-2">WhatsApp</h2>
              <p className="text-charcoal/70 text-sm mb-6">
                Kurze Frage? Schreiben Sie direkt.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full"
              >
                Chat öffnen
              </a>
            </div>

            {/* Email */}
            <div className="bg-white p-8 rounded-sm shadow-sm text-center">
              <div className="text-forest mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-serif text-xl text-forest mb-2">E-Mail</h2>
              <p className="text-charcoal/70 text-sm mb-6">
                Ich antworte innerhalb von 24 Stunden.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="btn-secondary w-full"
              >
                E-Mail schreiben
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-xl mx-auto">
            <h2 className="font-serif text-2xl text-forest mb-6 text-center">
              Oder schreiben Sie mir hier
            </h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-forest/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-copper/50 focus:border-copper"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-forest/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-copper/50 focus:border-copper"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-forest/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-copper/50 focus:border-copper resize-none"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">
                Nachricht senden
              </button>
              <p className="text-center text-sm text-charcoal/60">
                Ich melde mich innerhalb von 24 Stunden.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section bg-forest/5">
        <div className="container mx-auto px-5">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-2xl text-forest mb-4">{LOCATION}</h2>
            <p className="text-charcoal/70">
              Im Herzen des Allgäus, aber für Unternehmen im gesamten DACH-Raum tätig.
              Die meiste Zusammenarbeit funktioniert remote — bei Bedarf bin ich aber
              auch persönlich vor Ort.
            </p>
          </div>
        </div>
      </section>

      {/* No Pressure */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-charcoal/60 italic">
              Nicht jede Anfrage führt zu einer Zusammenarbeit — und das ist völlig in Ordnung.
              Wichtig ist, dass es für beide Seiten passt.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/kontakt/page.tsx
git commit -m "feat: add Contact page"
```

---

## Phase 4: Blog

### Task 16: Create Blog Index Page

**Files:**
- Create: `src/app/blog/page.tsx`

**Step 1: Create blog index page**

```tsx
import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";
import { DateFormatter } from "@/app/_components/date-formatter";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: "Insights zu Prozessautomatisierung, KI und digitaler Transformation im Mittelstand.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      {/* Hero */}
      <section className="section">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Blog
            </h1>
            <p className="text-xl text-charcoal/80 leading-relaxed">
              Gedanken zu Automatisierung, KI und wie mittelständische Unternehmen
              Technologie sinnvoll einsetzen können.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="section bg-forest/5">
        <div className="container mx-auto px-5">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-sm shadow-sm border border-forest/10 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {post.coverImage && (
                    <Link href={`/blog/${post.slug}`}>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                  )}
                  <div className="p-6">
                    <div className="text-sm text-charcoal/50 mb-2">
                      <DateFormatter dateString={post.date} />
                    </div>
                    <h2 className="font-serif text-xl text-forest mb-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-copper transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-charcoal/70 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-block mt-4 text-copper hover:text-copper-600 font-medium text-sm"
                    >
                      Weiterlesen →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-charcoal/60">
                Noch keine Artikel vorhanden. Bald gibt es hier mehr zu lesen.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/blog/page.tsx
git commit -m "feat: add blog index page"
```

---

### Task 17: Update Blog Post Page

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`

**Step 1: Create new blog post page with updated styling**

```tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { SITE_NAME, CAL_LINK } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import { DateFormatter } from "@/app/_components/date-formatter";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <article>
        {/* Header */}
        <section className="section pb-8">
          <div className="container mx-auto px-5">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center text-copper hover:text-copper-600 mb-8"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Zurück zum Blog
              </Link>
              <div className="text-sm text-charcoal/50 mb-4">
                <DateFormatter dateString={post.date} />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest mb-6">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-charcoal/70">{post.excerpt}</p>
              )}
            </div>
          </div>
        </section>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="container mx-auto px-5 mb-12">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full rounded-sm"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <section className="pb-16">
          <div className="container mx-auto px-5">
            <div
              className="max-w-3xl mx-auto prose prose-lg prose-forest prose-headings:font-serif prose-headings:text-forest prose-a:text-copper prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-copper/10">
          <div className="container mx-auto px-5">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-2xl text-forest mb-4">
                Hat Ihnen dieser Artikel geholfen?
              </h2>
              <p className="text-charcoal/70 mb-6">
                Wenn Sie darüber nachdenken, wie Automatisierung Ihrem Unternehmen
                helfen könnte, lassen Sie uns sprechen.
              </p>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Kennenlernen vereinbaren
              </a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
```

**Step 2: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/blog/[slug]/page.tsx
git commit -m "feat: add styled blog post page"
```

---

## Phase 5: Legal & Final

### Task 18: Create Legal Pages (Placeholder)

**Files:**
- Create: `src/app/impressum/page.tsx`
- Create: `src/app/datenschutz/page.tsx`

**Step 1: Create Impressum placeholder**

```tsx
import { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL, LOCATION } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Impressum | ${SITE_NAME}`,
};

export default function ImpressumPage() {
  return (
    <main className="section">
      <div className="container mx-auto px-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl text-forest mb-8">Impressum</h1>

          <div className="prose prose-lg text-charcoal/80">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              Christoph Weissteiner<br />
              {LOCATION}<br />
              Deutschland
            </p>

            <h2>Kontakt</h2>
            <p>
              E-Mail: {CONTACT_EMAIL}
            </p>

            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Christoph Weissteiner<br />
              {LOCATION}
            </p>

            <p className="text-sm text-charcoal/50 mt-8">
              [Platzhalter — bitte mit vollständigen Angaben ersetzen]
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
```

**Step 2: Create Datenschutz placeholder**

```tsx
import { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Datenschutz | ${SITE_NAME}`,
};

export default function DatenschutzPage() {
  return (
    <main className="section">
      <div className="container mx-auto px-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl text-forest mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-lg text-charcoal/80">
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen.
            </p>

            <h2>2. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
              Christoph Weissteiner<br />
              E-Mail: {CONTACT_EMAIL}
            </p>

            <h2>3. Datenerfassung auf dieser Website</h2>
            <h3>Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
              Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
              den Fall von Anschlussfragen bei uns gespeichert.
            </p>

            <p className="text-sm text-charcoal/50 mt-8">
              [Platzhalter — bitte mit vollständiger Datenschutzerklärung ersetzen]
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
```

**Step 3: Run build to verify**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/impressum/page.tsx src/app/datenschutz/page.tsx
git commit -m "feat: add legal pages (placeholder)"
```

---

### Task 19: Remove Old Blog Pages and Clean Up

**Files:**
- Delete: `src/app/posts/[slug]/page.tsx`
- Delete old components no longer needed

**Step 1: Remove old post route**

```bash
rm -rf src/app/posts
```

**Step 2: Remove theme switcher from layout (if not needed)**

Update `src/app/layout.tsx` — remove ThemeSwitcher import and usage if dark mode isn't needed for MVP.

**Step 3: Run build to verify everything works**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove old blog route and clean up"
```

---

### Task 20: Final Build and Test

**Step 1: Run full build**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run build`
Expected: Build succeeds with no errors

**Step 2: Run dev server and manually test all pages**

Run: `cd "/Users/cweissteiner/WA Apps/wa-website" && npm run dev`

Test:
- Homepage: all sections render
- Navigation: all links work
- About page: renders correctly
- Services page: renders correctly
- Contact page: renders correctly
- Blog index: shows posts
- Blog post: individual posts render
- Footer: all links work
- Mobile: navigation hamburger works

**Step 3: Commit final state**

```bash
git add -A
git commit -m "feat: complete Modern Handwerk website MVP"
```

---

## Summary

**Total Tasks:** 20
**Estimated Time:** 3-4 hours

**Phase 1 (Foundation):** Tasks 1-5 — Design tokens, globals, navigation, footer, layout
**Phase 2 (Homepage):** Tasks 6-12 — Hero, problem, solution, trust, services preview, CTA, homepage assembly
**Phase 3 (Pages):** Tasks 13-15 — About, Services, Contact pages
**Phase 4 (Blog):** Tasks 16-17 — Blog index, blog post styling
**Phase 5 (Final):** Tasks 18-20 — Legal pages, cleanup, final testing

**After Implementation:**
- Replace placeholder legal text
- Add real testimonials when available
- Connect contact form to email service
- Add analytics tracking
- Deploy to Vercel
