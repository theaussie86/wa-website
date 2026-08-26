import { SignJWT, jwtVerify } from "jose";

/**
 * Optionen für alle Freebie-Cookies. Der Name unterscheidet sich je Freebie,
 * die Einstellungen nicht.
 */
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  maxAge: 90 * 24 * 60 * 60,
  path: "/",
};

export const GUIDE_COOKIE_CONFIG = {
  name: "guide_token",
  options: COOKIE_OPTIONS,
};

/**
 * Jedes Freebie bekommt ein eigenes Cookie statt eines gemeinsamen.
 *
 * Ein geteiltes Cookie würde bedeuten: wer sich für ein Freebie bestätigt hat,
 * kommt ohne weitere Anmeldung auch an alle anderen. Getrennte Namen halten
 * den Zugang bei dem Freebie, für das er erteilt wurde - und ältere Tokens
 * bleiben gültig, weil `guide_token` unverändert weiterläuft.
 */
export function freebieCookieConfig(name: string) {
  return { name, options: COOKIE_OPTIONS };
}

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

/** Prüft das Token aus einem beliebig benannten Freebie-Cookie. */
export async function verifyFreebieToken(
  cookieStore: CookieReader,
  cookieName: string
): Promise<{ email: string } | null> {
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.email !== "string") return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

export async function verifyGuideToken(
  cookieStore: CookieReader
): Promise<{ email: string } | null> {
  return verifyFreebieToken(cookieStore, GUIDE_COOKIE_CONFIG.name);
}
