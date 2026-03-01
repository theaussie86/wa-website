import Footer from "@/app/_components/footer";
import { Navigation } from "@/app/_components/navigation";
import { CookieConsentWrapper } from "@/app/_components/cookie-consent";
import { JsonLd } from "@/app/_components/json-ld";
import { SITE_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import { Bree_Serif, Raleway } from "next/font/google";
import cn from "classnames";

import "./globals.css";

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
  title: `${SITE_NAME} | Prozessautomatisierung & KI`,
  description: "Langfristige Partnerschaft für Prozessautomatisierung und KI im Mittelstand. Aus dem Allgäu, für den DACH-Raum.",
  metadataBase: new URL("https://weissteiner-automation.com"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Prozessautomatisierung & KI`,
    description: "Langfristige Partnerschaft für Prozessautomatisierung und KI im Mittelstand. Aus dem Allgäu, für den DACH-Raum.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Prozessautomatisierung & KI`,
    description: "Langfristige Partnerschaft für Prozessautomatisierung und KI im Mittelstand.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${breeSerif.variable} ${raleway.variable}`}>
      <head>
        <meta name="theme-color" content="#1B4332" />
        <JsonLd />
      </head>
      <body className={cn("font-sans min-h-screen flex flex-col")}>
        <CookieConsentWrapper>
          <Navigation />
          <div className="flex-1">{children}</div>
          <Footer />
        </CookieConsentWrapper>
      </body>
    </html>
  );
}
