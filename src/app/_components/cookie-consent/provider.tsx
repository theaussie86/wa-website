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

function pushConsentToDataLayer(consent: ConsentState) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "consent_updated",
      consent_analytics: consent.analytics,
      consent_marketing: consent.marketing,
    });
  }
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

  // Don't render children until we've checked localStorage
  // This prevents flash of banner for users who have already consented
  if (!isInitialized) {
    return null;
  }

  return (
    <ConsentContext.Provider
      value={{
        consent,
        hasConsented: consent !== null,
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

// Add dataLayer type to window
declare global {
  interface Window {
    dataLayer: (Record<string, unknown> | unknown[])[];
  }
}
