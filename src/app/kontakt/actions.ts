"use server";

import { sendEmail } from "@/lib/gmail";
import { isValidEmail, sanitize } from "@/lib/validation";

export type ContactFormState = { success: boolean; message: string } | null;

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (
    !name || typeof name !== "string" ||
    !email || typeof email !== "string" ||
    !message || typeof message !== "string"
  ) {
    return { success: false, message: "Alle Felder sind erforderlich." };
  }

  if (!isValidEmail(email)) {
    return { success: false, message: "Ungültige E-Mail-Adresse." };
  }

  if (name.length > 100 || message.length > 5000) {
    return { success: false, message: "Eingabe zu lang." };
  }

  const fromEmail = process.env.GMAIL_FROM_ALIAS || process.env.GMAIL_USER_EMAIL;
  const toEmail = process.env.CONTACT_RECIPIENT_EMAIL || process.env.GMAIL_USER_EMAIL;

  if (!fromEmail || !toEmail) {
    console.error("Missing email configuration");
    return { success: false, message: "Server-Konfigurationsfehler." };
  }

  try {
    await sendEmail({
      to: toEmail,
      from: fromEmail,
      replyTo: sanitize(email),
      subject: `Neue Kontaktanfrage von ${sanitize(name)}`,
      body: `Name: ${sanitize(name)}\nE-Mail: ${sanitize(email)}\n\nNachricht:\n${sanitize(message)}`,
    });
    return { success: true, message: "" };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, message: "E-Mail konnte nicht gesendet werden." };
  }
}
