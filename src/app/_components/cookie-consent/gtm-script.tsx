"use client";

import Script from "next/script";
import { useConsent } from "./provider";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Lädt den GTM-Container.
 *
 * Der Consent-Zustand läuft nicht über diese Komponente: Den Default setzt
 * `consent-default-script.tsx` vor dem Container, spätere Änderungen schiebt
 * `pushConsentToDataLayer` in `provider.tsx` im selben Schritt nach, in dem
 * die Einwilligung gespeichert wird.
 */
export function GTMScript() {
  const { isInitialized } = useConsent();

  // Nichts rendern ohne konfigurierte ID - und nichts, bevor localStorage
  // gelesen wurde. Der zweite Teil hält den Ladezeitpunkt des Containers
  // genau dort, wo er vor der Korrektur aus #34 lag, und hält Server- und
  // ersten Client-Render identisch.
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
