/**
 * Brevo-Listen mit Double-Opt-in, die kein Freebie freischalten.
 *
 * Anders als bei `freebies.ts` gibt es hinter der Bestätigung nichts zu
 * schützen: kein Cookie, kein Gate. Brevo leitet nach dem Klick direkt auf
 * `confirmedPath`, eine statische Seite.
 */
export interface OptinList {
  /** Brevo-Liste, in die der bestätigte Kontakt wandert. */
  listId: number;
  /** Brevo-Vorlage der Double-Opt-in-Mail, Quelle unter `emails/`. */
  doiTemplateId: number;
  /** Ziel der Weiterleitung nach dem Klick in der Bestätigungsmail. */
  confirmedPath: string;
}

export const OPTIN_LISTS = {
  nullnummer: {
    listId: 14,
    doiTemplateId: 12,
    confirmedPath: "/nullnummer/bestaetigt",
  },
} as const satisfies Record<string, OptinList>;
