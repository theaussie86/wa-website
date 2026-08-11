/**
 * Gemeinsame Konstanten für den Spamschutz der Formulare.
 *
 * Bewusst ohne Logik und ohne Zugriff auf `process.env`: Diese Datei wird
 * sowohl von den Server Actions als auch von der Client-Komponente
 * `spam-protection.tsx` importiert. Die serverseitige Prüfung liegt in
 * `spam-check.ts` und landet damit nie im Client-Bundle.
 */

/**
 * Name des Honeypot-Feldes. Es ist im Formular versteckt und für Menschen
 * nicht erreichbar - ein ausgefüllter Wert kommt von einem Bot, der stumpf
 * alle Felder befüllt.
 *
 * `website` statt eines sprechenden Namens wie `honeypot`: Bots werten
 * Feldnamen aus, und ein URL-Feld ist genau das, was ein Linkspam-Bot füllen
 * will.
 */
export const HONEYPOT_FIELD = "website";

/** Feld, in das die Client-Komponente das reCAPTCHA-v3-Token legt. */
export const RECAPTCHA_TOKEN_FIELD = "recaptcha-token";

/**
 * reCAPTCHA v3 bindet jedes Token an eine Aktion. Google prüft sie nicht -
 * das macht `spam-check.ts` - aber ohne feste Liste driften Client und Server
 * auseinander und die Prüfung schlägt still fehl.
 *
 * Nur Buchstaben, Ziffern, Unterstriche und Schrägstriche: Google entfernt
 * alle anderen Zeichen aus dem Namen, bevor `siteverify` ihn zurückgibt. Ein
 * Bindestrich wie in `guide-signup` käme als `guidesignup` zurück und liefe
 * beim Vergleich in `spam-check.ts` in einen Dauerfehler.
 */
export type RecaptchaAction = "contact" | "waitlist" | "guide_signup";
