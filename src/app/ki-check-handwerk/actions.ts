"use server";

import { isValidEmail, sanitize } from "@/lib/validation";

const BREVO_LIST_ID = 7; // "Handwerk KI-Check Waitlist" in Brevo
const BREVO_DOI_TEMPLATE_ID = 8;
const BREVO_DOI_REDIRECT_URL =
  "https://weissteiner-automation.com/ki-check-handwerk/bestaetigt";

export type WaitlistState = {
  success: boolean;
  message: string;
} | null;

export async function joinWaitlist(
  _prevState: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = formData.get("email");
  const name = formData.get("name");

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return { success: false, message: "Bitte gib eine gültige E-Mail-Adresse ein." };
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY not configured");
    return { success: false, message: "Ein Fehler ist aufgetreten. Bitte versuche es später." };
  }

  const normalized = email.trim().toLowerCase();
  const cleanName = name && typeof name === "string" ? sanitize(name) : null;

  // Check if already a confirmed subscriber
  const checkRes = await fetch(
    `https://api.brevo.com/v3/contacts/${encodeURIComponent(normalized)}`,
    { headers: { "api-key": apiKey, Accept: "application/json" } }
  );

  if (checkRes.ok) {
    const contact = await checkRes.json();
    // Only show "already on list" if on this specific waitlist
    const isOnList = contact.listIds?.includes(BREVO_LIST_ID);
    if (isOnList && contact.emailBlacklisted === false) {
      return { success: true, message: "Du bist bereits auf der Warteliste. Wir melden uns sobald der Check startet!" };
    }
  }

  // Send DOI email
  const body: Record<string, unknown> = {
    email: normalized,
    includeListIds: [BREVO_LIST_ID],
    templateId: BREVO_DOI_TEMPLATE_ID,
    redirectionUrl: BREVO_DOI_REDIRECT_URL,
  };

  if (cleanName) {
    body.attributes = { FIRSTNAME: cleanName };
  }

  const doiRes = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!doiRes.ok) {
    const error = await doiRes.json().catch(() => null);
    if (error?.code === "duplicate_parameter") {
      return { success: true, message: "Check dein Postfach und bestätige deine E-Mail-Adresse." };
    }
    console.error("Brevo DOI error:", doiRes.status, error);
    return { success: false, message: "Ein Fehler ist aufgetreten. Bitte versuche es später." };
  }

  return { success: true, message: "Check dein Postfach und bestätige deine E-Mail-Adresse." };
}
