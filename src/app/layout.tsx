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
        <Navigation />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
