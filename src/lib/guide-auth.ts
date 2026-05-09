import { SignJWT, jwtVerify } from "jose";

export const GUIDE_COOKIE_CONFIG = {
  name: "guide_token",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    maxAge: 90 * 24 * 60 * 60,
    path: "/",
  },
};

function getSecret() {
  const secret = process.env.GUIDE_JWT_SECRET;
  if (!secret) throw new Error("GUIDE_JWT_SECRET is not configured");
  return new TextEncoder().encode(secret);
}

export async function signGuideToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(getSecret());
}

interface CookieReader {
  get(name: string): { value: string } | undefined;
}

export async function verifyGuideToken(
  cookieStore: CookieReader
): Promise<{ email: string } | null> {
  const token = cookieStore.get(GUIDE_COOKIE_CONFIG.name)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.email !== "string") return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}
