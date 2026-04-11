import { SignJWT, jwtVerify } from "jose";

const ISS = "allegato-a1-access";

export function sessionTtlSeconds(): number {
  const n = Number(process.env.SESSION_MAX_AGE_SEC);
  return Number.isFinite(n) && n > 60 ? n : 60 * 60 * 24 * 7;
}

export async function signSessionToken(authSecret: string): Promise<string> {
  const key = new TextEncoder().encode(authSecret);
  const sec = sessionTtlSeconds();
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("a1-user")
    .setIssuedAt()
    .setIssuer(ISS)
    .setExpirationTime(`${sec}s`)
    .sign(key);
}

export async function verifySessionToken(token: string, authSecret: string): Promise<boolean> {
  try {
    const key = new TextEncoder().encode(authSecret);
    await jwtVerify(token, key, { issuer: ISS });
    return true;
  } catch {
    return false;
  }
}
