/**
 * Registry der E-Mail-gesicherten Freebies.
 *
 * Jedes Freebie hängt an einer eigenen Brevo-Liste und einer eigenen
 * Double-Opt-in-Vorlage. Die Werte stehen hier statt verstreut in den Server
 * Actions, weil der Bestätigungs-Handler unter `/api/auth/confirm/[freebie]`
 * dieselben Angaben braucht - nur von der anderen Seite des Ablaufs.
 */
export interface Freebie {
  /** Wert des Pfadsegments in `/api/auth/confirm/[freebie]`. */
  slug: string;
  /** Brevo-Liste, in die der bestätigte Kontakt wandert. */
  listId: number;
  /** Brevo-Vorlage der Double-Opt-in-Mail. */
  doiTemplateId: number;
  /** Seite mit dem Anmeldeformular. */
  landingPath: string;
  /** Geschützte Seite mit dem eigentlichen Inhalt. */
  contentPath: string;
  /** Name des Cookies, das den Zugang zu `contentPath` trägt. */
  cookieName: string;
}

export const FREEBIES = {
  "betriebs-interview": {
    slug: "betriebs-interview",
    listId: 9,
    doiTemplateId: 9,
    landingPath: "/betriebs-interview",
    contentPath: "/betriebs-interview/prompt",
    cookieName: "freebie_betriebs_interview",
  },
} as const satisfies Record<string, Freebie>;

export type FreebieSlug = keyof typeof FREEBIES;

export function getFreebie(slug: string): Freebie | null {
  return Object.hasOwn(FREEBIES, slug)
    ? FREEBIES[slug as FreebieSlug]
    : null;
}
