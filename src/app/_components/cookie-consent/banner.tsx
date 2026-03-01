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
        relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${checked ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}
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
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-500 italic">
        Keine Dienste aktiv
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      {services.map((service) => (
        <div
          key={service.id}
          className="rounded-md bg-gray-50 p-3 text-xs dark:bg-gray-800/50"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="font-medium text-charcoal dark:text-white">
                {service.name}
              </span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">
                ({service.provider})
              </span>
            </div>
            {service.privacyPolicyUrl && (
              <a
                href={service.privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-primary hover:text-primary-600 dark:text-primary-400"
                aria-label={`Datenschutz von ${service.name}`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {service.purpose}
          </p>
          {service.cookies && service.cookies.length > 0 && (
            <div className="mt-2 text-gray-500 dark:text-gray-500">
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
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <label
              htmlFor={`${category}-toggle`}
              className="block font-medium text-charcoal dark:text-white"
            >
              {categoryConfig.name}
            </label>
            {disabled && (
              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                Immer aktiv
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {categoryConfig.description}
          </p>
          {services.length > 0 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 flex items-center gap-1 text-xs text-primary hover:text-primary-600 dark:text-primary-400"
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSettings();
      }}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-charcoal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
      >
        <button
          onClick={closeSettings}
          className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Einstellungen schließen"
        >
          <X className="h-5 w-5" />
        </button>

        <h2
          id="cookie-settings-title"
          className="mb-2 font-serif text-xl text-charcoal dark:text-white"
        >
          Cookie-Einstellungen
        </h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Wählen Sie aus, welche Cookies Sie zulassen möchten.{" "}
          <Link
            href="/datenschutz"
            className="text-primary underline hover:text-primary-600 dark:text-primary-400"
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
            className="rounded-lg border border-primary px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary-50 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-900/20"
          >
            Auswahl speichern
          </button>
          <button
            onClick={acceptAll}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieConsentBanner() {
  const { hasConsented, isSettingsOpen, acceptAll, rejectAll, openSettings } =
    useConsent();

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
      className="fixed inset-x-0 bottom-0 z-[9998] border-t border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-charcoal sm:p-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h2
              id="cookie-banner-title"
              className="font-serif text-lg text-charcoal dark:text-white"
            >
              Wir nutzen Cookies
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Diese Website verwendet Cookies für Analyse und Marketing.{" "}
              <Link
                href="/datenschutz"
                className="text-primary underline hover:text-primary-600 dark:text-primary-400"
              >
                Mehr erfahren
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              onClick={openSettings}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-charcoal dark:text-gray-400 dark:hover:text-white"
            >
              Anpassen
            </button>
            <button
              onClick={rejectAll}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
            >
              Nur Essenzielle
            </button>
            <button
              onClick={acceptAll}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
