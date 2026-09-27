import Footer from "@/app/_components/footer";
import { Navigation } from "@/app/_components/navigation";
import {
  ConsentDefaultScript,
  CookieConsentWrapper,
} from "@/app/_components/cookie-consent";
import { JsonLd } from "@/app/_components/json-ld";
import { SITE_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import cn from "classnames";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Variable Schrift mit optischer Größe: große Headlines bekommen automatisch
// den feineren Display-Schnitt, Fließtext den robusteren Text-Schnitt.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `Dein KI-Arbeitsplatz: deine Arbeit, so gut wie sie gehört | ${SITE_NAME}`,
  description:
    "Ich richte dir einen KI-Arbeitsplatz ein, der weiß, wie du arbeitest. Du sprichst rein, KI bereitet vor, du entscheidest. Für Inhaber, die ihre Arbeit so machen wollen, wie sie gehört.",
  metadataBase: new URL("https://weissteiner-automation.com"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE_NAME,
    title: `Dein KI-Arbeitsplatz: deine Arbeit, so gut wie sie gehört | ${SITE_NAME}`,
    description:
      "Ich richte dir einen KI-Arbeitsplatz ein, der weiß, wie du arbeitest. Du sprichst rein, KI bereitet vor, du entscheidest. Für Inhaber, die ihre Arbeit so machen wollen, wie sie gehört.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Dein KI-Arbeitsplatz: deine Arbeit, so gut wie sie gehört | ${SITE_NAME}`,
    description:
      "Du sprichst rein, KI bereitet vor, du entscheidest. Ein KI-Arbeitsplatz, der weiß, wie du arbeitest.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${newsreader.variable}`}>
      <head>
        <meta name="theme-color" content="#FAF9F7" />
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
