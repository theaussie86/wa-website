import { NextResponse } from "next/server";

// Liveness-Check der Container-Plattform: Antwortet die Anwendung überhaupt
// auf Requests? Bewusst ohne Prüfung von PocketBase, Brevo oder Gmail - ein
// Ausfall eines Fremdsystems darf keinen Restart-Loop einer ansonsten
// funktionierenden Webseite auslösen.
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ status: "ok" });
}
