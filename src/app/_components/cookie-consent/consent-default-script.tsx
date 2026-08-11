import Script from "next/script";
import { CONSENT_STORAGE_KEY } from "./types";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Der Default-Zustand muss vor dem Container stehen, sonst hat
// wait_for_update nichts, worauf es wartet, und Tags feuern bereits vor dem
// ersten Consent-Signal. Ein React-Effekt kann das nicht leisten: Er läuft
// erst nach der Hydration und damit hinter gtm.js. Deshalb ein Inline-Skript
// mit strategy="beforeInteractive", das die Next-Runtime vor der Hydration
// ausführt.
//
// Die bereits gespeicherte Einwilligung wird hier direkt aus dem localStorage
// gelesen statt über den Provider. Über den Provider käme sie erst nach der
// Hydration an, und der Default würde Tags 500 ms lang blockieren, die längst
// erlaubt sind (Issue #38).
const CONSENT_DEFAULT_SNIPPET = `
(function () {
  window.dataLayer = window.dataLayer || [];

  // GTM wertet nur das arguments-Objekt als Befehl aus. Ein Array mit
  // demselben Inhalt sieht gleich aus, wird aber still verworfen.
  function gtag() { window.dataLayer.push(arguments); }

  var stored = null;
  try {
    stored = JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}'));
  } catch (error) {
    // Kein lesbarer Eintrag - es bleibt beim abgelehnten Default.
  }

  // Nur ein Objekt zählt als gespeicherte Einwilligung. Ein parsbarer, aber
  // unpassender Wert (Zahl, String, altes Format) darf nicht dazu führen,
  // dass wait_for_update entfällt - sonst feuern Tags, bevor der Nutzer
  // überhaupt geklickt hat.
  var hasStored = stored !== null && typeof stored === 'object';
  var analytics = hasStored && stored.analytics === true;
  var marketing = hasStored && stored.marketing === true;

  if (hasStored) {
    gtag('consent', 'default', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      ad_user_data: marketing ? 'granted' : 'denied',
      ad_personalization: marketing ? 'granted' : 'denied'
    });
  } else {
    // Ohne gespeicherte Einwilligung alles abgelehnt. wait_for_update gibt
    // dem Banner ein Zeitfenster, bevor Tags mit dem Default feuern; bei
    // gespeicherter Einwilligung steht der Zustand sofort und das Fenster
    // wäre nur Verzögerung.
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
  }

  // Eigenes dataLayer-Event, kein gtag-Befehl - bleibt deshalb ein
  // Objekt-Push und wird nicht über gtag geschickt.
  window.dataLayer.push({
    event: 'consent_initialized',
    consent_analytics: analytics,
    consent_marketing: marketing
  });
})();
`;

/**
 * Setzt Consent Mode auf den Default-Zustand, bevor der GTM-Container lädt.
 *
 * Gehört in das Root-Layout: `beforeInteractive` wirkt nur, wenn das Skript
 * serverseitig ins erste HTML gelangt. Der Container selbst wird weiterhin
 * von `GTMScript` geladen.
 */
export function ConsentDefaultScript() {
  if (!GTM_ID) {
    return null;
  }

  return (
    <Script
      id="gtm-consent-default"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SNIPPET }}
    />
  );
}
