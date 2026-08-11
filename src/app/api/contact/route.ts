import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/gmail";
import { checkFields } from "@/lib/spam-check";
import { HONEYPOT_FIELD, RECAPTCHA_TOKEN_FIELD } from "@/lib/spam-protection";
import { isValidEmail, sanitize } from "@/lib/validation";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  [HONEYPOT_FIELD]?: string;
  [RECAPTCHA_TOKEN_FIELD]?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Vor allem anderen: Diese Route verschickt Mail ohne Anmeldung und ist
    // damit das lohnendste Ziel auf der Website. Sie prüft dieselben beiden
    // Merkmale wie die Server Action, nur aus dem JSON-Rumpf statt aus
    // FormData.
    const spamCheck = await checkFields(
      { honeypot: data[HONEYPOT_FIELD], token: data[RECAPTCHA_TOKEN_FIELD] },
      "contact"
    );

    if (!spamCheck.ok) {
      console.warn(`POST /api/contact abgewiesen: ${spamCheck.reason}`);
      return NextResponse.json(
        { error: "Anfrage wurde als automatisiert eingestuft" },
        { status: 400 }
      );
    }

    // Validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich" },
        { status: 400 }
      );
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      );
    }

    if (data.name.length > 100 || data.message.length > 5000) {
      return NextResponse.json(
        { error: "Eingabe zu lang" },
        { status: 400 }
      );
    }

    const name = sanitize(data.name);
    const email = sanitize(data.email);
    const message = sanitize(data.message);

    const fromEmail = process.env.GMAIL_FROM_ALIAS || process.env.GMAIL_USER_EMAIL;
    const toEmail = process.env.CONTACT_RECIPIENT_EMAIL || process.env.GMAIL_USER_EMAIL;

    if (!fromEmail || !toEmail) {
      console.error("Missing email configuration");
      return NextResponse.json(
        { error: "Server-Konfigurationsfehler" },
        { status: 500 }
      );
    }

    await sendEmail({
      to: toEmail,
      from: fromEmail,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      body: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden" },
      { status: 500 }
    );
  }
}
