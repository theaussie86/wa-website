const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function sanitize(str: string): string {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}

/**
 * Holt eine E-Mail-Adresse aus einem Query-Parameter zurueck.
 *
 * In einer Query steht "+" fuer ein Leerzeichen - so schreibt es
 * application/x-www-form-urlencoded vor, und genau so dekodiert
 * `URLSearchParams`. Brevo haengt die Adresse an die Weiterleitung des
 * Double-Opt-in aber unkodiert an: aus "christoph+test@example.com" wird
 * beim Auslesen "christoph test@example.com", und die Pruefung weist die
 * Adresse ab.
 *
 * Ein Leerzeichen ist in einer Adresse ohne Anfuehrungszeichen nicht
 * erlaubt. An dieser Stelle war es deshalb immer ein "+", und genau das
 * wird hier wiederhergestellt.
 *
 * Getroffen hat das jeden mit Plus-Adresse - bei Gmail und Google Workspace
 * eine verbreitete Art, Anmeldungen auseinanderzuhalten.
 */
export function emailFromQueryParam(value: string | null): string | null {
  if (!value) return null;

  const restored = value.trim().replace(/ /g, "+").toLowerCase();

  return isValidEmail(restored) ? restored : null;
}
