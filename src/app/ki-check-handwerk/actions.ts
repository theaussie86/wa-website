"use server";

import { isValidEmail, sanitize } from "@/lib/validation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BrevoClient } from "@getbrevo/brevo";

const BREVO_LIST_ID = 7; // "Handwerk KI-Check Waitlist" in Brevo
const BREVO_DOI_TEMPLATE_ID = 8;
const BREVO_DOI_REDIRECT_URL =
  "https://weissteiner-automation.com/ki-check-handwerk/bestaetigt";
const WAITLIST_COOKIE = "ki-check-waitlist";

export type WaitlistState = {
  success: boolean;
  message: string;
} | null;

function getBrevoClient() {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY not configured");
  return new BrevoClient({ apiKey });
}

export async function joinWaitlist(
  _prevState: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = formData.get("email");
  const name = formData.get("name");

  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return { success: false, message: "Bitte gib eine gültige E-Mail-Adresse ein." };
  }

  let brevo: BrevoClient;
  try {
    brevo = getBrevoClient();
  } catch {
    return { success: false, message: "Ein Fehler ist aufgetreten. Bitte versuche es später." };
  }

  const normalized = email.trim().toLowerCase();
  const cleanName = name && typeof name === "string" ? sanitize(name) : null;

  // Check if contact already exists in Brevo
  let contactExists = false;
  let isOnList = false;
  try {
    const contact = await brevo.contacts.getContactInfo({ identifier: normalized });
    contactExists = true;
    isOnList = contact.listIds?.includes(BREVO_LIST_ID) ?? false;
  } catch {
    // 404 → contact does not exist yet
  }

  if (contactExists) {
    // Contact exists - update list + attributes, skip DOI
    await brevo.contacts.updateContact({
      identifier: normalized,
      ...(cleanName ? { attributes: { VORNAME: cleanName } } : {}),
      ...(!isOnList ? { listIds: [BREVO_LIST_ID] } : {}),
    });

    const cookieStore = await cookies();
    cookieStore.set(WAITLIST_COOKIE, "1", {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });

    redirect("/ki-check-handwerk/bestaetigt");
  }

  // New contact - send DOI email
  try {
    await brevo.contacts.createDoiContact({
      email: normalized,
      includeListIds: [BREVO_LIST_ID],
      templateId: BREVO_DOI_TEMPLATE_ID,
      redirectionUrl: BREVO_DOI_REDIRECT_URL,
      ...(cleanName ? { attributes: { VORNAME: cleanName } } : {}),
    });
  } catch (err: unknown) {
    const status = (err as { statusCode?: number })?.statusCode;
    if (status === 400) {
      // duplicate_parameter = DOI already pending
      return { success: true, message: "Check dein Postfach und bestätige deine E-Mail-Adresse." };
    }
    console.error("Brevo DOI error:", err);
    return { success: false, message: "Ein Fehler ist aufgetreten. Bitte versuche es später." };
  }

  return { success: true, message: "Check dein Postfach und bestätige deine E-Mail-Adresse." };
}
