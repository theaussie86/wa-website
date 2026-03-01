"use client";

import type { ReactNode } from "react";
import { CookieConsentProvider } from "./provider";
import { CookieConsentBanner } from "./banner";
import { GTMScript } from "./gtm-script";

export function CookieConsentWrapper({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider>
      {children}
      <CookieConsentBanner />
      <GTMScript />
    </CookieConsentProvider>
  );
}
