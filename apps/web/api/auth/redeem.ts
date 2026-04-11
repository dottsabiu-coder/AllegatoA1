import { getKv } from "../../lib/kv-client.js";
import { signSessionToken } from "../../lib/auth-jwt.js";

export const config = { runtime: "edge" };

const JSON_HDR = { "Content-Type": "application/json; charset=utf-8" };

const COOKIE = "a1_session";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: JSON_HDR });
  }

  if (process.env.ACCESS_GATE_ENABLED !== "true") {
    return new Response(JSON.stringify({ error: "Gate disattivato" }), { status: 503, headers: JSON_HDR });
  }

  const authSecret = process.env.AUTH_SECRET?.trim();
  if (!authSecret || authSecret.length < 16) {
    return new Response(JSON.stringify({ error: "AUTH_SECRET mancante o troppo corto (min 16 caratteri)" }), {
      status: 500,
      headers: JSON_HDR,
    });
  }

  let token = "";
  try {
    const body = await req.json();
    token = typeof body?.token === "string" ? body.token.trim() : "";
  } catch {
    return new Response(JSON.stringify({ error: "Body JSON non valido" }), { status: 400, headers: JSON_HDR });
  }

  if (!/^[a-f0-9]{64}$/i.test(token)) {
    return new Response(JSON.stringify({ error: "Codice non valido" }), { status: 400, headers: JSON_HDR });
  }

  const key = `otp:${token}`;
  let exists = false;
  try {
    exists = (await getKv().get(key)) != null;
  } catch (e) {
    console.error("KV redeem get", e);
    return new Response(JSON.stringify({ error: "Servizio temporaneamente non disponibile" }), {
      status: 503,
      headers: JSON_HDR,
    });
  }

  if (!exists) {
    return new Response(JSON.stringify({ error: "Codice scaduto, già usato o errato" }), {
      status: 401,
      headers: JSON_HDR,
    });
  }

  try {
    await getKv().del(key);
  } catch (e) {
    console.error("KV redeem del", e);
    return new Response(JSON.stringify({ error: "Errore interno" }), { status: 500, headers: JSON_HDR });
  }

  const jwt = await signSessionToken(authSecret);
  const maxAge = Number(process.env.SESSION_MAX_AGE_SEC) || 60 * 60 * 24 * 7;
  const url = new URL(req.url);
  const secure = url.protocol === "https:";
  const cookieParts = [
    `${COOKIE}=${jwt}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (secure) cookieParts.push("Secure");

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      ...JSON_HDR,
      "Set-Cookie": cookieParts.join("; "),
    },
  });
}
