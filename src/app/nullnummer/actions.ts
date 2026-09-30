"use server";

import { checkSubmission, spamRejectionMessage } from "@/lib/spam-check";
import { isValidEmail } from "@/lib/validation";
import { requestDoubleOptin } from "@/lib/brevo";
import { OPTIN_LISTS } from "@/lib/optin-lists";
import type { OptinFormState } from "@/app/_components/optin-form";

const LISTE = OPTIN_LISTS.nullnummer;

// Absolut, weil Brevo die Weiterleitung von außen aufruft. Keine Adresse in
// der Query: die Bestätigungsseite ist statisch und muss niemanden zuordnen.
const REDIRECT_URL = `https://weissteiner-automation.com${LISTE.confirmedPath}`;

const MAX_VORNAME = 80;
const MAX_AUFGABE = 1000;

const FEHLER = "Ein Fehler ist aufgetreten. Bitte versuche es später.";

function textField(formData: FormData, name: string, max: number): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function joinNullnummer(
  _prevState: OptinFormState,
  formData: FormData
): Promise<OptinFormState> {
  const spamCheck = await checkSubmission(formData, "waitlist").catch(
    (error: unknown) => {
      console.error("Spam-Prüfung nicht möglich:", error);
      return null;
    }
  );

  if (!spamCheck) {
    return { success: false, message: FEHLER };
  }

  if (!spamCheck.ok) {
    console.warn(`Warteliste Nullnummer abgewiesen: ${spamCheck.reason}`);
    return { success: false, message: spamRejectionMessage(spamCheck.reason, "du") };
  }

  const email = formData.get("email");
  if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
    return { success: false, message: "Bitte gib eine gültige E-Mail-Adresse ein." };
  }

  const vorname = textField(formData, "vorname", MAX_VORNAME);
  if (!vorname) {
    return { success: false, message: "Bitte gib deinen Vornamen ein." };
  }

  // Leer bleibt leer: eine zweite Anmeldung ohne Text soll die Antwort aus
  // der ersten nicht überschreiben.
  const aufgabe = textField(formData, "freitext", MAX_AUFGABE);

  const result = await requestDoubleOptin({
    email: email.trim().toLowerCase(),
    listId: LISTE.listId,
    templateId: LISTE.doiTemplateId,
    redirectionUrl: REDIRECT_URL,
    attributes: {
      VORNAME: vorname,
      ...(aufgabe ? { NULLNUMMER_AUFGABE: aufgabe } : {}),
    },
  });

  switch (result) {
    case "already-on-list":
      return {
        success: true,
        message: "Du stehst schon drauf. Ich melde mich persönlich, bevor die nächste Runde startet.",
      };
    case "doi-sent":
      return {
        success: true,
        message: "Fast geschafft. Check dein Postfach und bestätige deine E-Mail-Adresse.",
      };
    case "error":
      return { success: false, message: FEHLER };
  }
}
