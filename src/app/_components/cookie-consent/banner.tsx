"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useConsent } from "./provider";
import {
  CONSENT_CATEGORIES,
  getActiveServicesByCategory,
  type ConsentCategory,
  type ServiceConfig,
} from "@/lib/cookie-config";

function Toggle({
  checked,
  onChange,
  disabled = false,
  id,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={id}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${checked ? "bg-primary" : "bg-charcoal/25"}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}

function ServiceDetails({ services }: { services: ServiceConfig[] }) {
  if (services.length === 0) {
    return (
      <p className="mt-2 text-[14px] text-charcoal/75">
        Keine Dienste aktiv
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      {services.map((service) => (
        <div
          key={service.id}
          className="rounded-[2px] bg-pappe p-3 text-[14px] leading-[1.5]"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="font-semibold text-charcoal">
                {service.name}
              </span>
              <span className="ml-2 text-charcoal/75">
                ({service.provider})
              </span>
            </div>
            {service.privacyPolicyUrl && (
              <a
                href={service.privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-primary hover:text-primary-600"
                aria-label={`Datenschutz von ${service.name}`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
          <p className="mt-1 text-charcoal/85">
            {service.purpose}
          </p>
          {service.cookies && service.cookies.length > 0 && (
            <div className="mt-2 text-charcoal/75">
              <span className="font-medium">Cookies: </span>
              {service.cookies.map((c) => c.name).join(", ")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CategorySection({
  category,
  checked,
  onChange,
  disabled,
}: {
  category: ConsentCategory;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const categoryConfig = CONSENT_CATEGORIES.find((c) => c.id === category);
  const services = getActiveServicesByCategory(category);

  if (!categoryConfig) return null;

  return (
    <div className="border-b border-primary/15 pb-5 last:border-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <label
              htmlFor={`${category}-toggle`}
              className="block font-semibold text-charcoal"
            >
              {categoryConfig.name}
            </label>
            {disabled && (
              <span className="type-label rounded-[2px] border border-primary/30 px-1.5 py-0.5 text-[11.5px] text-primary">
                Immer aktiv
              </span>
            )}
          </div>
          <p className="mt-1 text-[15px] leading-[1.55] text-charcoal/85">
            {categoryConfig.description}
          </p>
          {services.length > 0 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 flex items-center gap-1 text-[14px] font-medium text-primary hover:text-primary-600"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3" />
                  Details ausblenden
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" />
                  {services.length} {services.length === 1 ? "Dienst" : "Dienste"} anzeigen
                </>
              )}
            </button>
          )}
        </div>
        <Toggle
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          id={`${category}-toggle`}
        />
      </div>
      {isExpanded && <ServiceDetails services={services} />}
    </div>
  );
}

function SettingsModal() {
  const { consent, updateConsent, acceptAll, closeSettings } = useConsent();
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);

  useEffect(() => {
    if (consent) {
      setAnalytics(consent.analytics);
      setMarketing(consent.marketing);
    }
  }, [consent]);

  const handleSave = () => {
    updateConsent(analytics, marketing);
  };

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-ink/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSettings();
      }}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2px] bg-white p-6 text-charcoal shadow-[0_22px_44px_-26px_rgba(0,23,46,0.45)] sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
      >
        <button
          onClick={closeSettings}
          className="absolute right-4 top-4 p-1 text-charcoal/60 hover:text-charcoal"
          aria-label="Einstellungen schließen"
        >
          <X className="h-5 w-5" />
        </button>

        <h2
          id="cookie-settings-title"
          className="type-display mb-3 text-[2rem] leading-[1.05] text-primary"
        >
          Cookie-Einstellungen
        </h2>
        <p className="mb-6 text-[15px] leading-[1.55] text-charcoal/85">
          Wählen Sie aus, welche Cookies Sie zulassen möchten.{" "}
          <Link
            href="/datenschutz"
            className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
          >
            Mehr erfahren
          </Link>
        </p>

        <div className="space-y-4">
          <CategorySection
            category="essential"
            checked={true}
            onChange={() => {}}
            disabled
          />
          <CategorySection
            category="analytics"
            checked={analytics}
            onChange={setAnalytics}
          />
          <CategorySection
            category="marketing"
            checked={marketing}
            onChange={setMarketing}
          />
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={handleSave}
            className="rounded-[4px] px-5 py-3 text-[15px] font-semibold transition-colors border border-primary/35 text-primary hover:border-primary hover:bg-primary-50"
          >
            Auswahl speichern
          </button>
          <button
            onClick={acceptAll}
            className="rounded-[4px] px-5 py-3 text-[15px] font-semibold transition-colors bg-primary text-white hover:bg-primary-600"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieConsentBanner() {
  const {
    hasConsented,
    isInitialized,
    isSettingsOpen,
    acceptAll,
    rejectAll,
    openSettings,
  } = useConsent();

  // Nichts rendern, bevor localStorage gelesen wurde. Das verhindert das
  // Aufblitzen des Banners bei bereits erteilter Einwilligung und hält
  // Server- und ersten Client-Render identisch.
  if (!isInitialized) {
    return null;
  }

  // Show settings modal if open
  if (isSettingsOpen) {
    return <SettingsModal />;
  }

  // Don't show banner if user has already consented
  if (hasConsented) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-9998 border-t border-white/15 bg-primary p-5 text-white shadow-[0_-12px_32px_-18px_rgba(0,23,46,0.6)] sm:p-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
    >
      <div className="mx-auto max-w-[1320px] lg:px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h2
              id="cookie-banner-title"
              className="type-display text-[1.5rem] leading-[1.1] text-white"
            >
              Wir nutzen Cookies
            </h2>
            <p className="mt-1 text-[15px] leading-[1.55] text-white/85">
              Diese Website verwendet Cookies für Analyse und Marketing.{" "}
              <Link
                href="/datenschutz"
                className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                Mehr erfahren
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              onClick={openSettings}
              className="px-2 py-3 text-[15px] font-medium text-white underline decoration-white/40 underline-offset-[6px] transition-colors hover:decoration-white"
            >
              Anpassen
            </button>
            <button
              onClick={rejectAll}
              className="rounded-[4px] px-5 py-3 text-[15px] font-semibold transition-colors border border-white/50 text-white hover:border-white hover:bg-white/10"
            >
              Nur Essenzielle
            </button>
            <button
              onClick={acceptAll}
              className="rounded-[4px] px-5 py-3 text-[15px] font-semibold transition-colors bg-white text-primary hover:bg-primary-50"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
