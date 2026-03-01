import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

interface EmailOptions {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  body: string;
}

function createRawEmail(options: EmailOptions): string {
  const messageParts = [
    `From: ${options.from}`,
    `To: ${options.to}`,
    `Reply-To: ${options.replyTo}`,
    `Subject: =?UTF-8?B?${Buffer.from(options.subject).toString("base64")}?=`,
    `Content-Type: text/plain; charset=UTF-8`,
    ``,
    options.body,
  ];

  const message = messageParts.join("\n");
  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const userEmail = process.env.GMAIL_USER_EMAIL;

  if (!serviceAccountEmail || !privateKey || !userEmail) {
    throw new Error("Missing Gmail API configuration");
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: SCOPES,
    subject: userEmail,
  });

  const gmail = google.gmail({ version: "v1", auth });

  const raw = createRawEmail(options);

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
    },
  });
}
