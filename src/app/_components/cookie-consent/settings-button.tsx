"use client";

import { useConsent } from "./provider";

export function CookieSettingsButton({ className }: { className?: string }) {
  const { openSettings } = useConsent();

  return (
    <button
      onClick={openSettings}
      className={className}
      type="button"
    >
      Cookie-Einstellungen
    </button>
  );
}
