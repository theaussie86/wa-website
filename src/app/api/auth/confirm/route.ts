import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/lib/validation";
import { signGuideToken, GUIDE_COOKIE_CONFIG } from "@/lib/guide-auth";

const LANDING_PAGE = "/second-brain-anleitung";
const GUIDE_PATH = "/second-brain-anleitung/guide/";

async function isBrevoContactConfirmed(email: string): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY not configured");
    return false;
  }

  const res = await fetch(
    `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
    {
      headers: {
        "api-key": apiKey,
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) return false;

  const contact = await res.json();
  return contact.emailBlacklisted === false;
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email")?.trim().toLowerCase();

  if (!email || !isValidEmail(email)) {
    return NextResponse.redirect(
      new URL(`${LANDING_PAGE}?error=not-confirmed`, request.url)
    );
  }

  const confirmed = await isBrevoContactConfirmed(email);
  if (!confirmed) {
    return NextResponse.redirect(
      new URL(`${LANDING_PAGE}?error=not-confirmed`, request.url)
    );
  }

  const token = await signGuideToken(email);
  const response = NextResponse.redirect(new URL(GUIDE_PATH, request.url));
  response.cookies.set(GUIDE_COOKIE_CONFIG.name, token, GUIDE_COOKIE_CONFIG.options);

  return response;
}
