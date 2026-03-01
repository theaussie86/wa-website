/**
 * Centralized Cookie & Third-Party Service Configuration
 *
 * This file is the single source of truth for all cookies and third-party services.
 * Update this config when adding/removing services, and both the cookie banner
 * and privacy policy will reflect the changes.
 */

export type ConsentCategory = "essential" | "analytics" | "marketing";

export interface CookieInfo {
  name: string;
  purpose: string;
  duration: string;
}

export interface ServiceConfig {
  id: string;
  name: string;
  provider: string;
  providerUrl?: string;
  purpose: string;
  category: ConsentCategory;
  isActive: boolean; // Set to true when actually implemented
  cookies?: CookieInfo[];
  privacyPolicyUrl?: string;
  dataTransferToUSA?: boolean;
}

export interface CategoryConfig {
  id: ConsentCategory;
  name: string;
  description: string;
  required: boolean;
}

// Category definitions
export const CONSENT_CATEGORIES: CategoryConfig[] = [
  {
    id: "essential",
    name: "Essenziell",
    description: "Notwendig für die Grundfunktion der Website. Kann nicht deaktiviert werden.",
    required: true,
  },
  {
    id: "analytics",
    name: "Analyse",
    description: "Hilft uns zu verstehen, wie Besucher die Website nutzen.",
    required: false,
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Ermöglicht personalisierte Werbung und Remarketing.",
    required: false,
  },
];

// All services configuration
export const SERVICES: ServiceConfig[] = [
  // ============ ESSENTIAL ============
  {
    id: "consent-storage",
    name: "Cookie-Einwilligung",
    provider: "Weissteiner Automation",
    purpose: "Speichert Ihre Cookie-Präferenzen für 365 Tage.",
    category: "essential",
    isActive: true,
    cookies: [
      {
        name: "wa_cookie_consent",
        purpose: "Speichert Ihre Cookie-Einstellungen",
        duration: "365 Tage",
      },
    ],
  },
  {
    id: "theme-preference",
    name: "Theme-Einstellung",
    provider: "Weissteiner Automation",
    purpose: "Speichert Ihre Präferenz für helles oder dunkles Design.",
    category: "essential",
    isActive: true,
    cookies: [
      {
        name: "theme (localStorage)",
        purpose: "Speichert die gewählte Farbeinstellung",
        duration: "Unbegrenzt",
      },
    ],
  },
  {
    id: "vercel-hosting",
    name: "Vercel Hosting",
    provider: "Vercel Inc.",
    providerUrl: "https://vercel.com",
    purpose: "Hosting der Website. Erfasst technische Daten wie IP-Adresse für den Betrieb.",
    category: "essential",
    isActive: true,
    privacyPolicyUrl: "https://vercel.com/legal/privacy-policy",
    dataTransferToUSA: true,
  },

  // ============ ANALYTICS ============
  {
    id: "google-analytics",
    name: "Google Analytics 4",
    provider: "Google Ireland Limited",
    providerUrl: "https://analytics.google.com",
    purpose: "Erfasst anonymisierte Statistiken über die Websitenutzung.",
    category: "analytics",
    isActive: false, // Set to true when GTM/GA4 is configured
    cookies: [
      {
        name: "_ga",
        purpose: "Unterscheidet Besucher",
        duration: "2 Jahre",
      },
      {
        name: "_ga_*",
        purpose: "Speichert den Sitzungsstatus",
        duration: "2 Jahre",
      },
    ],
    privacyPolicyUrl: "https://policies.google.com/privacy",
    dataTransferToUSA: true,
  },
  {
    id: "google-tag-manager",
    name: "Google Tag Manager",
    provider: "Google Ireland Limited",
    providerUrl: "https://tagmanager.google.com",
    purpose: "Verwaltet Website-Tags und Tracking-Codes zentral. Setzt selbst keine Cookies.",
    category: "analytics",
    isActive: false, // Set to true when GTM is configured
    privacyPolicyUrl: "https://policies.google.com/privacy",
    dataTransferToUSA: true,
  },

  // ============ MARKETING ============
  {
    id: "linkedin-insight",
    name: "LinkedIn Insight Tag",
    provider: "LinkedIn Ireland Unlimited Company",
    providerUrl: "https://www.linkedin.com",
    purpose: "Ermöglicht Conversion-Tracking und Retargeting über LinkedIn.",
    category: "marketing",
    isActive: false, // Set to true when LinkedIn pixel is added
    cookies: [
      {
        name: "li_sugr",
        purpose: "Browser-Identifikation",
        duration: "3 Monate",
      },
      {
        name: "bcookie",
        purpose: "Browser-ID-Cookie",
        duration: "1 Jahr",
      },
    ],
    privacyPolicyUrl: "https://www.linkedin.com/legal/privacy-policy",
    dataTransferToUSA: true,
  },
  {
    id: "google-ads",
    name: "Google Ads Conversion Tracking",
    provider: "Google Ireland Limited",
    providerUrl: "https://ads.google.com",
    purpose: "Misst Conversions aus Google Ads Kampagnen.",
    category: "marketing",
    isActive: false, // Set to true when Google Ads is used
    cookies: [
      {
        name: "_gcl_au",
        purpose: "Conversion-Linker",
        duration: "90 Tage",
      },
    ],
    privacyPolicyUrl: "https://policies.google.com/privacy",
    dataTransferToUSA: true,
  },
];

// Helper functions
export function getActiveServices(): ServiceConfig[] {
  return SERVICES.filter((s) => s.isActive);
}

export function getServicesByCategory(category: ConsentCategory): ServiceConfig[] {
  return SERVICES.filter((s) => s.category === category);
}

export function getActiveServicesByCategory(category: ConsentCategory): ServiceConfig[] {
  return SERVICES.filter((s) => s.category === category && s.isActive);
}

export function getCategoryConfig(category: ConsentCategory): CategoryConfig | undefined {
  return CONSENT_CATEGORIES.find((c) => c.id === category);
}
