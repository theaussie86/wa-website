"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type ConsentState,
  type ConsentContextType,
  CONSENT_STORAGE_KEY,
  CONSENT_COOKIE_NAME,
  CONSENT_EXPIRY_DAYS,
} from "./types";

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

type ConsentSignal = "granted" | "denied";

/**
 * Schickt einen gtag-Befehl in den dataLayer.
 *
 * Entscheidend ist, dass das `arguments`-Objekt gepusht wird und keine Kopie
 * davon: Genau daran erkennt GTM einen Befehl. Ein Array mit demselben Inhalt
 * landet zwar im dataLayer, wird aber nie ausgewertet - daran ist die
 * Consent-Steuerung bis Issue #38 unbemerkt gescheitert. Die Parameter sind
 * nur für den Typcheck der Aufrufstelle da; gelesen wird `arguments`.
 */
function gtag(
  _command: "consent",
  _action: "update",
  _params: Record<string, ConsentSignal>
) {
  window.dataLayer.push(arguments);
}

function pushConsentToDataLayer(consent: ConsentState) {
  if (typeof window === "undefined" || !window.dataLayer) return;

  // Reihenfolge: erst der gtag-Befehl, dann das Event. Ein React-Effekt
  // käme erst nach dem nächsten Render und damit hinter consent_updated -
  // Tags, die auf dieses Event triggern, würden noch den alten Zustand
  // sehen.
  gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });

  // Eigenes Event, kein gtag-Befehl - bleibt deshalb ein Objekt-Push.
  window.dataLayer.push({
    event: "consent_updated",
    consent_analytics: consent.analytics,
    consent_marketing: consent.marketing,
  });
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ConsentState;
        setConsent(parsed);
      }
    } catch {
      // Invalid stored value, ignore
    }
    setIsInitialized(true);
  }, []);

  const saveConsent = useCallback((newConsent: ConsentState) => {
    const consentString = JSON.stringify(newConsent);
    localStorage.setItem(CONSENT_STORAGE_KEY, consentString);
    setCookie(CONSENT_COOKIE_NAME, consentString, CONSENT_EXPIRY_DAYS);
    setConsent(newConsent);
    pushConsentToDataLayer(newConsent);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    });
    setIsSettingsOpen(false);
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    });
    setIsSettingsOpen(false);
  }, [saveConsent]);

  const updateConsent = useCallback(
    (analytics: boolean, marketing: boolean) => {
      saveConsent({
        essential: true,
        analytics,
        marketing,
        timestamp: Date.now(),
      });
      setIsSettingsOpen(false);
    },
    [saveConsent]
  );

  const openSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  // children werden immer gerendert - auch serverseitig, bevor localStorage
  // gelesen werden konnte. Consent-abhängige Ausgaben warten stattdessen
  // selbst auf isInitialized (siehe banner.tsx, gtm-script.tsx).
  return (
    <ConsentContext.Provider
      value={{
        consent,
        hasConsented: consent !== null,
        isInitialized,
        isSettingsOpen,
        acceptAll,
        rejectAll,
        updateConsent,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error("useConsent must be used within a CookieConsentProvider");
  }
  return context;
}

declare global {
  interface Window {
    // Der dataLayer nimmt zweierlei auf: Event-Objekte und die
    // arguments-Objekte der gtag-Befehle. Beides steht hier, damit ein
    // versehentlicher Array-Push als Consent-Befehl nicht durchrutscht -
    // genau der Fehler aus Issue #38.
    dataLayer: (Record<string, unknown> | IArguments)[];
  }
}
