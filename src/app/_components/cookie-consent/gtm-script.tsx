"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent } from "./provider";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GTMScript() {
  const { consent, hasConsented, isInitialized } = useConsent();

  // dataLayer anlegen und den Default-Zustand (alles abgelehnt) setzen.
  // Läuft erst, wenn localStorage gelesen wurde - sonst würde
  // consent_initialized eine bereits erteilte Einwilligung als false melden.
  useEffect(() => {
    if (!GTM_ID || !isInitialized) return;

    // Initialize dataLayer if not exists
    window.dataLayer = window.dataLayer || [];

    // Set default consent state (all denied)
    window.dataLayer.push([
      "consent",
      "default",
      {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        wait_for_update: 500,
      },
    ]);

    // Push consent_initialized event
    window.dataLayer.push({
      event: "consent_initialized",
      consent_analytics: consent?.analytics ?? false,
      consent_marketing: consent?.marketing ?? false,
    });
    // Absichtlich nur an isInitialized gebunden: Der Default-Zustand wird
    // genau einmal gesetzt, spätere Änderungen übernimmt der Effekt darunter.
  }, [isInitialized]);

  // Einwilligung nachreichen, sobald sie sich ändert
  useEffect(() => {
    if (!GTM_ID || !hasConsented || !consent) return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push([
      "consent",
      "update",
      {
        analytics_storage: consent.analytics ? "granted" : "denied",
        ad_storage: consent.marketing ? "granted" : "denied",
        ad_user_data: consent.marketing ? "granted" : "denied",
        ad_personalization: consent.marketing ? "granted" : "denied",
      },
    ]);
  }, [consent, hasConsented]);

  // Nichts rendern ohne konfigurierte ID - und nichts, bevor localStorage
  // gelesen wurde. Der zweite Teil hält den Ladezeitpunkt des Containers
  // genau dort, wo er vor dieser Korrektur lag, und hält Server- und ersten
  // Client-Render identisch.
  //
  // Der Container lädt danach auch ohne erteilte Einwilligung, mit Consent
  // Mode auf "denied". Das ist unverändertes Altverhalten und hier bewusst
  // nicht angefasst.
  if (!GTM_ID || !isInitialized) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
