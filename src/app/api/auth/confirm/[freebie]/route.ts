import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/lib/validation";
import { signGuideToken, freebieCookieConfig } from "@/lib/guide-auth";
import { getFreebie } from "@/lib/freebies";

// Relative Location statt NextResponse.redirect - siehe die ausführliche
// Begründung in ../route.ts (#44): im Container leitet request.url jede
// absolute Weiterleitung auf https://0.0.0.0:3000/.
function redirectTo(path: string): NextResponse {
  return new NextResponse(null, { status: 307, headers: { Location: path } });
}

async function isBrevoContactConfirmed(email: string): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY not configured");
    return false;
  }

  const res = await fetch(
    `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
    { headers: { "api-key": apiKey, Accept: "application/json" } }
  );

  if (!res.ok) return false;

  const contact = await res.json();
  return contact.emailBlacklisted === false;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ freebie: string }> }
) {
  const { freebie: slug } = await params;
  const freebie = getFreebie(slug);

  if (!freebie) {
    return redirectTo("/");
  }

  const email = request.nextUrl.searchParams.get("email")?.trim().toLowerCase();

  if (!email || !isValidEmail(email)) {
    return redirectTo(`${freebie.landingPath}?error=not-confirmed`);
  }

  const confirmed = await isBrevoContactConfirmed(email);
  if (!confirmed) {
    return redirectTo(`${freebie.landingPath}?error=not-confirmed`);
  }

  const cookie = freebieCookieConfig(freebie.cookieName);
  const token = await signGuideToken(email);
  const response = redirectTo(freebie.contentPath);
  response.cookies.set(cookie.name, token, cookie.options);

  return response;
}
