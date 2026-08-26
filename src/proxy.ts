import { NextRequest, NextResponse } from "next/server";
import { verifyGuideToken, verifyFreebieToken } from "@/lib/guide-auth";
import { FREEBIES } from "@/lib/freebies";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const freebie of Object.values(FREEBIES)) {
    const isContent =
      pathname === freebie.contentPath ||
      pathname.startsWith(`${freebie.contentPath}/`);

    if (!isContent) continue;

    const access = await verifyFreebieToken(request.cookies, freebie.cookieName);
    return access
      ? NextResponse.next()
      : NextResponse.redirect(new URL(freebie.landingPath, request.url));
  }

  const result = await verifyGuideToken(request.cookies);

  if (!result) {
    return NextResponse.redirect(
      new URL("/second-brain-anleitung", request.url)
    );
  }

  return NextResponse.next();
}

// Der Matcher muss literal dastehen - Next liest ihn beim Build statisch aus
// und kann die Pfade nicht aus FREEBIES ableiten.
export const config = {
  matcher: [
    "/second-brain-anleitung/guide/:path*",
    "/betriebs-interview/prompt",
    "/betriebs-interview/prompt/:path*",
  ],
};
