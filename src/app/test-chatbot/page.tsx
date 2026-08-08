import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_NAME } from "@/lib/constants";
import { ChatbotWidget } from "./chatbot-widget";

// Diese Testseite gehört nicht in den produktiven Betrieb. In `next dev` ist
// NODE_ENV "development", im Produktionsbuild und damit im Laufzeit-Image
// "production" - dort liefert die Seite den Not-Found-Inhalt statt des Widgets.
const isProduction = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  title: `Test Chatbot | ${SITE_NAME}`,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function TestChatbotPage() {
  if (isProduction) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-warm-white py-16 md:py-24">
      <div className="container mx-auto px-5">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">
              Test Chatbot
            </h1>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Diese Seite dient ausschließlich zu Testzwecken.
            </p>
          </div>

          <ChatbotWidget />
        </div>
      </div>
    </main>
  );
}
