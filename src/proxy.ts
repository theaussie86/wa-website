import { NextRequest, NextResponse } from "next/server";
import { verifyGuideToken } from "@/lib/guide-auth";

export async function proxy(request: NextRequest) {
  const result = await verifyGuideToken(request.cookies);

  if (!result) {
    return NextResponse.redirect(
      new URL("/second-brain-anleitung", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/second-brain-anleitung/guide/:path*",
};
