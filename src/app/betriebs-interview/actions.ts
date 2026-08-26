"use server";

import { cookies } from "next/headers";
import { checkSubmission, spamRejectionMessage } from "@/lib/spam-check";
import { isValidEmail } from "@/lib/validation";
import { signGuideToken, freebieCookieConfig } from "@/lib/guide-auth";
import { FREEBIES } from "@/lib/freebies";

const FREEBIE = FREEBIES["betriebs-interview"];

const BREVO_DOI_REDIRECT_BASE = `https://weissteiner-automation.com/api/auth/confirm/${FREEBIE.slug}`;

/**
 * Die Adresse haengt an der Weiterleitung, weil Brevo sie nicht selbst
 * anhaengt.
 *
 * Gemessen am 26.08.2026: die Kette nach dem Klick endet auf
 * `.../api/auth/confirm/betriebs-interview` - ohne Query. Ohne die Adresse
 * kann die Bestaetigungsseite niemanden zuordnen und weist jeden ab, der
 * gerade erst zugestimmt hat.
 *
 * Die Adresse hier preiszugeben kostet nichts: sie steht ohnehin in der
 * Mail, die nur an genau diese Adresse ging. Den Zugang erteilt weiterhin
 * erst die Rueckfrage bei Brevo, ob der Kontakt bestaetigt ist.
 */
function doiRedirectUrl(email: string): string {
  return `${BREVO_DOI_REDIRECT_BASE}?email=${encodeURIComponent(email)}`;
}

export async function handleEmailSubmit(
  _prevState: { success: boolean; message: string; redirect?: string } | null,
  formData: FormData
): Promise<{ success: boolean; message: string; redirect?: string }> {
  const spamCheck = await checkSubmission(formData, "guide_signup").catch(
    (error: unknown) => {
      console.error("Spam-Prüfung nicht möglich:", error);
      return null;
    }
  );

  if (!spamCheck) {
    return {
      success: false,
      message: "Ein Fehler ist aufgetreten. Bitte versuche es später.",
    };
  }

  if (!spamCheck.ok) {
    console.warn(`Betriebs-Interview-Anmeldung abgewiesen: ${spamCheck.reason}`);
    return { success: false, message: spamRejectionMessage(spamCheck.reason, "du") };
  }

  const email = formData.get("email");

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return { success: false, message: "Bitte gib eine gültige E-Mail-Adresse ein." };
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY not configured");
    return {
      success: false,
      message: "Ein Fehler ist aufgetreten. Bitte versuche es später.",
    };
  }

  const normalized = email.trim().toLowerCase();

  // Wer schon bestätigt ist, soll nicht noch einmal durch die Mail laufen -
  // Cookie setzen und direkt auf den Prompt.
  const checkRes = await fetch(
    `https://api.brevo.com/v3/contacts/${encodeURIComponent(normalized)}`,
    { headers: { "api-key": apiKey, Accept: "application/json" } }
  );

  if (checkRes.ok) {
    const contact = await checkRes.json();
    if (contact.emailBlacklisted === false) {
      const cookie = freebieCookieConfig(FREEBIE.cookieName);
      const token = await signGuideToken(normalized);
      const cookieStore = await cookies();
      cookieStore.set(cookie.name, token, cookie.options);
      return {
        success: true,
        message: "Willkommen zurück! Du wirst weitergeleitet...",
        redirect: FREEBIE.contentPath,
      };
    }
  }

  const doiRes = await fetch(
    "https://api.brevo.com/v3/contacts/doubleOptinConfirmation",
    {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: normalized,
        includeListIds: [FREEBIE.listId],
        templateId: FREEBIE.doiTemplateId,
        redirectionUrl: doiRedirectUrl(normalized),
      }),
    }
  );

  if (!doiRes.ok) {
    const error = await doiRes.json().catch(() => null);
    if (error?.code === "duplicate_parameter") {
      return {
        success: true,
        message: "Check dein Postfach und bestätige deine E-Mail-Adresse.",
      };
    }
    console.error("Brevo DOI error:", doiRes.status, error);
    return {
      success: false,
      message: "Ein Fehler ist aufgetreten. Bitte versuche es später.",
    };
  }

  return {
    success: true,
    message: "Check dein Postfach und bestätige deine E-Mail-Adresse.",
  };
}
