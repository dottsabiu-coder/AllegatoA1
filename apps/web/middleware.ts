import { verifySessionToken } from "./lib/auth-jwt.js";

/**
 * Solo ingresso SPA: / e index.html. Non tocca /assets/*, /api/*, /gate.html, favicon, ecc.
 */
export const config = {
  matcher: ["/", "/index.html"],
};

const COOKIE = "a1_session";

function getSessionCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((p) => p.trim());
  for (const p of parts) {
    if (p.startsWith(`${COOKIE}=`)) return p.slice(COOKIE.length + 1);
  }
  return null;
}

export default async function middleware(request: Request): Promise<Response | undefined> {
  if (process.env.ACCESS_GATE_ENABLED !== "true") {
    return undefined;
  }

  const authSecret = process.env.AUTH_SECRET?.trim();
  if (!authSecret) {
    return undefined;
  }

  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/gate.html") return undefined;
  if (path.startsWith("/api/auth/")) return undefined;
  if (path.startsWith("/assets/")) return undefined;
  if (/\.(ico|png|svg|webp|css|js|map|woff2?|txt|html)$/i.test(path)) return undefined;

  const raw = getSessionCookie(request.headers.get("cookie"));
  if (!raw) {
    return Response.redirect(new URL("/gate.html", url.origin));
  }

  const ok = await verifySessionToken(raw, authSecret);
  if (!ok) {
    return Response.redirect(new URL("/gate.html", url.origin));
  }

  return undefined;
}
