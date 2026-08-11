import {
  HONEYPOT_FIELD,
  RECAPTCHA_TOKEN_FIELD,
  type RecaptchaAction,
} from "@/lib/spam-protection";

const SITEVERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

/**
 * Ab diesem Score gilt eine Einsendung als menschlich. 0.5 ist Googles
 * Referenzschwelle; darunter meldet reCAPTCHA v3 überwiegend Automaten.
 */
const MIN_SCORE = 0.5;

/**
 * Ohne Timeout hängt eine Server Action so lange, wie Google braucht - der
 * Nutzer sieht in der Zeit nur den Ladezustand des Buttons.
 */
const VERIFY_TIMEOUT_MS = 5000;

export type SpamCheckReason = "honeypot" | "missing-token" | "low-score" | "verify-failed";

export type SpamCheckResult = { ok: true } | { ok: false; reason: SpamCheckReason };

/**
 * Meldung für ein abgewiesenes Formular.
 *
 * `missing-token` bekommt einen eigenen Text, weil es der einzige Grund ist,
 * der regelmäßig echte Menschen trifft: Werbeblocker, strenge Browser-Modi und
 * Firmen-DNS blockieren `google.com`, dann entsteht im Browser gar kein Token.
 * Diesen Leuten "Sie sind ein Bot" vorzuhalten schickt sie weg - ohne dass
 * jemand die Anfrage je zu sehen bekommt.
 */
export function spamRejectionMessage(reason: SpamCheckReason, anrede: "sie" | "du"): string {
  if (reason === "missing-token") {
    return anrede === "sie"
      ? "Der Spamschutz konnte nicht geladen werden. Meist blockiert eine Browser-Erweiterung Google reCAPTCHA - bitte für diese Seite deaktivieren und erneut senden."
      : "Der Spamschutz konnte nicht geladen werden. Meist blockiert eine Browser-Erweiterung Google reCAPTCHA - bitte für diese Seite deaktivieren und noch einmal senden.";
  }

  return anrede === "sie"
    ? "Ihre Nachricht wurde als automatisiert eingestuft. Bitte laden Sie die Seite neu und versuchen Sie es erneut."
    : "Deine Eingabe wurde als automatisiert eingestuft. Bitte lade die Seite neu und versuche es erneut.";
}

interface SiteverifyResult {
  success: boolean;
  score: number | null;
  action: string | null;
  errorCodes: string[];
}

/**
 * Liest die Antwort der Siteverify-API ohne Cast: Die Gegenstelle ist fremd,
 * ihre Form deshalb nicht zugesichert. Fehlende Felder werden zu `null` und
 * fallen in der Auswertung durch, statt einen falschen Typ vorzutäuschen.
 */
function readSiteverifyResult(data: unknown): SiteverifyResult {
  if (typeof data !== "object" || data === null) {
    return { success: false, score: null, action: null, errorCodes: [] };
  }

  const success = "success" in data && data.success === true;
  const score = "score" in data && typeof data.score === "number" ? data.score : null;
  const action = "action" in data && typeof data.action === "string" ? data.action : null;
  const errorCodes =
    "error-codes" in data && Array.isArray(data["error-codes"])
      ? data["error-codes"].filter((code): code is string => typeof code === "string")
      : [];

  return { success, score, action, errorCodes };
}

/**
 * Prüft eine Formulareinsendung auf Automatisierung: erst der Honeypot, dann
 * reCAPTCHA v3.
 *
 * Die Prüfung schlägt bewusst nach *unten* fehl - kein Token, keine Antwort
 * von Google, fehlende Konfiguration: alles gilt als Spam. Ein Formular, das
 * bei gestörter Prüfung durchlässt, ist genau der Zustand, den ein Bot
 * herbeiführen würde.
 */
export function checkSubmission(
  formData: FormData,
  action: RecaptchaAction
): Promise<SpamCheckResult> {
  return checkFields(
    {
      honeypot: formData.get(HONEYPOT_FIELD),
      token: formData.get(RECAPTCHA_TOKEN_FIELD),
    },
    action
  );
}

/**
 * Dieselbe Prüfung für Aufrufer ohne `FormData` - der Route Handler unter
 * `/api/contact` nimmt JSON entgegen.
 */
export async function checkFields(
  fields: { honeypot: unknown; token: unknown },
  action: RecaptchaAction
): Promise<SpamCheckResult> {
  const { honeypot, token } = fields;

  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return { ok: false, reason: "honeypot" };
  }

  if (!token || typeof token !== "string") {
    return { ok: false, reason: "missing-token" };
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    throw new Error("RECAPTCHA_SECRET_KEY is not configured");
  }

  let payload: unknown;
  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`reCAPTCHA siteverify antwortete mit ${response.status}`);
      return { ok: false, reason: "verify-failed" };
    }

    payload = await response.json();
  } catch (error) {
    console.error("reCAPTCHA siteverify nicht erreichbar:", error);
    return { ok: false, reason: "verify-failed" };
  }

  const result = readSiteverifyResult(payload);

  if (!result.success) {
    console.warn(`reCAPTCHA lehnte Token ab: ${result.errorCodes.join(", ") || "ohne Fehlercode"}`);
    return { ok: false, reason: "verify-failed" };
  }

  // Ohne Abgleich der Aktion ließe sich ein Token von einer beliebigen anderen
  // Stelle der Website hier wiederverwenden.
  if (result.action !== action) {
    console.warn(`reCAPTCHA-Aktion "${result.action}" passt nicht zu "${action}"`);
    return { ok: false, reason: "verify-failed" };
  }

  if (result.score === null || result.score < MIN_SCORE) {
    console.warn(`reCAPTCHA-Score ${result.score} unter Schwelle ${MIN_SCORE} (${action})`);
    return { ok: false, reason: "low-score" };
  }

  return { ok: true };
}
