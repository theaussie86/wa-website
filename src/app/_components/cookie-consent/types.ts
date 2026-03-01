export interface ConsentState {
  essential: true; // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export interface ConsentContextType {
  consent: ConsentState | null;
  hasConsented: boolean;
  isSettingsOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updateConsent: (analytics: boolean, marketing: boolean) => void;
  openSettings: () => void;
  closeSettings: () => void;
}

export const CONSENT_STORAGE_KEY = "wa_cookie_consent";
export const CONSENT_COOKIE_NAME = "wa_cookie_consent";
export const CONSENT_EXPIRY_DAYS = 365;
