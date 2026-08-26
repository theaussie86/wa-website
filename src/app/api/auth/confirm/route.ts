import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/lib/validation";
import { signGuideToken, GUIDE_COOKIE_CONFIG } from "@/lib/guide-auth";
import { isBrevoContactConfirmed } from "@/lib/brevo";

const LANDING_PAGE = "/second-brain-anleitung";
const GUIDE_PATH = "/second-brain-anleitung/guide/";

// NextResponse.redirect verlangt eine absolute Adresse und leitet sie aus
// request.url ab. In einem Route Handler (Node-Runtime) hängt request.url an der
// Adresse, auf die der Server hört - im Container HOSTNAME=0.0.0.0 und PORT=3000
// aus dem Dockerfile. Der Host-Header des Requests geht nicht ein, jede
// Weiterleitung zeigte deshalb auf https://0.0.0.0:3000/ (#44).
//
// src/proxy.ts benutzt dasselbe Muster und liefert die richtige Adresse - der
// Proxy läuft vor dem Node-Server und bildet request.url aus dem Host-Header.
// Der Unterschied ist die Ausführungsumgebung, nicht der Code.
//
// Eine relative Location ist nach RFC 7231 zulässig; der Browser löst sie gegen
// die tatsächlich angefragte Adresse auf. Das kommt ohne fest verdrahtete Domain
// aus und ohne Vertrauen in einen Proxy-Header.
function redirectTo(path: string): NextResponse {
  return new NextResponse(null, { status: 307, headers: { Location: path } });
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email")?.trim().toLowerCase();

  if (!email || !isValidEmail(email)) {
    return redirectTo(`${LANDING_PAGE}?error=not-confirmed`);
  }

  const confirmed = await isBrevoContactConfirmed(email);
  if (!confirmed) {
    return redirectTo(`${LANDING_PAGE}?error=not-confirmed`);
  }

  const token = await signGuideToken(email);
  const response = redirectTo(GUIDE_PATH);
  response.cookies.set(GUIDE_COOKIE_CONFIG.name, token, GUIDE_COOKIE_CONFIG.options);

  return response;
}
