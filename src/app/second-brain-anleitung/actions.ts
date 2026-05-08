"use server";

import { isValidEmail } from "@/lib/validation";

const BREVO_LIST_ID = 5;
const BREVO_DOI_TEMPLATE_ID = 6;
const BREVO_DOI_REDIRECT_URL =
  "https://weissteiner-automation.com/second-brain-anleitung/bestaetigt";

export async function subscribeToWaitlist(
  _prevState: { success: boolean; message: string } | null,
  formData: FormData
) {
  const email = formData.get("email");

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return { success: false, message: "Bitte gib eine gültige E-Mail-Adresse ein." };
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY not configured");
    return { success: false, message: "Ein Fehler ist aufgetreten. Bitte versuche es später." };
  }

  const res = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      includeListIds: [BREVO_LIST_ID],
      templateId: BREVO_DOI_TEMPLATE_ID,
      redirectionUrl: BREVO_DOI_REDIRECT_URL,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);

    if (error?.code === "duplicate_parameter") {
      return { success: true, message: "Du bist bereits auf der Warteliste!" };
    }

    console.error("Brevo API error:", res.status, error);
    return { success: false, message: "Ein Fehler ist aufgetreten. Bitte versuche es später." };
  }

  return { success: true, message: "Check dein Postfach und bestätige deine E-Mail-Adresse." };
}
