"use server";

import { cookies } from "next/headers";
import { isValidEmail } from "@/lib/validation";
import { signGuideToken, GUIDE_COOKIE_CONFIG } from "@/lib/guide-auth";

const BREVO_LIST_ID = 5;
const BREVO_DOI_TEMPLATE_ID = 6;
const BREVO_DOI_REDIRECT_URL =
  "https://weissteiner-automation.com/api/auth/confirm";

export async function handleEmailSubmit(
  _prevState: { success: boolean; message: string; redirect?: string } | null,
  formData: FormData
): Promise<{ success: boolean; message: string; redirect?: string }> {
  const email = formData.get("email");

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return { success: false, message: "Bitte gib eine gültige E-Mail-Adresse ein." };
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY not configured");
    return { success: false, message: "Ein Fehler ist aufgetreten. Bitte versuche es später." };
  }

  const normalized = email.trim().toLowerCase();

  // Check if already a confirmed subscriber → issue JWT + redirect to guide
  const checkRes = await fetch(
    `https://api.brevo.com/v3/contacts/${encodeURIComponent(normalized)}`,
    { headers: { "api-key": apiKey, Accept: "application/json" } }
  );

  if (checkRes.ok) {
    const contact = await checkRes.json();
    if (contact.emailBlacklisted === false) {
      const token = await signGuideToken(normalized);
      const cookieStore = await cookies();
      cookieStore.set(GUIDE_COOKIE_CONFIG.name, token, GUIDE_COOKIE_CONFIG.options);
      return {
        success: true,
        message: "Willkommen zurück! Du wirst weitergeleitet...",
        redirect: "/second-brain-anleitung/guide/",
      };
    }
  }

  // Not confirmed yet → send DOI email
  const doiRes = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: normalized,
      includeListIds: [BREVO_LIST_ID],
      templateId: BREVO_DOI_TEMPLATE_ID,
      redirectionUrl: BREVO_DOI_REDIRECT_URL,
    }),
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
