import Footer from "@/app/_components/footer";
import { Navigation } from "@/app/_components/navigation";
import { SITE_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
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
    <html lang="de" className={`${breeSerif.variable} ${raleway.variable}`}>
      <head>
        <meta name="theme-color" content="#1B4332" />
      </head>
      <body className={cn("font-sans min-h-screen flex flex-col")}>
        <Navigation />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
