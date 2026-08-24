import Footer from "@/app/_components/footer";
import { Navigation } from "@/app/_components/navigation";
import {
  ConsentDefaultScript,
  CookieConsentWrapper,
} from "@/app/_components/cookie-consent";
import { JsonLd } from "@/app/_components/json-ld";
import { SITE_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Bree_Serif, Raleway } from "next/font/google";
import cn from "classnames";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const breeSerif = Bree_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bree-serif",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: `Dein erster KI-Mitarbeiter in 6 Wochen | ${SITE_NAME}`,
  description:
    "In 6 Wochen läuft eine echte Aufgabe ohne dich, in deiner Qualität, samt Anleitung. Für Inhaber, die Arbeit abgeben wollen, ohne dass sie schlechter wird.",
  metadataBase: new URL("https://weissteiner-automation.com"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE_NAME,
    title: `Dein erster KI-Mitarbeiter in 6 Wochen | ${SITE_NAME}`,
    description:
      "In 6 Wochen läuft eine echte Aufgabe ohne dich, in deiner Qualität, samt Anleitung. Für Inhaber, die Arbeit abgeben wollen, ohne dass sie schlechter wird.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Dein erster KI-Mitarbeiter in 6 Wochen | ${SITE_NAME}`,
    description:
      "Eine echte, wiederkehrende Aufgabe läuft nach 6 Wochen ohne dich - in deiner Qualität.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${playfairDisplay.variable} ${breeSerif.variable} ${raleway.variable}`}>
      <head>
        <meta name="theme-color" content="#1B4332" />
        <JsonLd />
      </head>
      <body className={cn("font-sans min-h-screen flex flex-col")}>
        {/* Steht hier und nicht im CookieConsentWrapper: beforeInteractive
            wirkt nur aus dem Root-Layout heraus. */}
        <ConsentDefaultScript />
        <CookieConsentWrapper>
          <div id="site-header"><Navigation /></div>
          <div className="flex-1">{children}</div>
          <div id="site-footer"><Footer /></div>
        </CookieConsentWrapper>
      </body>
    </html>
  );
}
