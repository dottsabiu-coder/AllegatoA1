import { getKv } from "../../lib/kv-client.js";
import { generateOtpToken } from "../../lib/otp-token.js";

export const config = { runtime: "edge" };

const JSON_HDR = { "Content-Type": "application/json; charset=utf-8" };

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let x = 0;
  for (let i = 0; i < a.length; i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return x === 0;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: JSON_HDR });
  }

  if (process.env.ACCESS_GATE_ENABLED !== "true") {
    return new Response(JSON.stringify({ error: "Gate disattivato (ACCESS_GATE_ENABLED)" }), {
      status: 503,
      headers: JSON_HDR,
    });
  }

  if (process.env.ACCESS_MINT_ENABLED === "false") {
    return new Response(JSON.stringify({ error: "Creazione codici sospesa (ACCESS_MINT_ENABLED=false)" }), {
      status: 403,
      headers: JSON_HDR,
    });
  }

  const admin = process.env.ACCESS_ADMIN_SECRET?.trim();
  if (!admin) {
    return new Response(JSON.stringify({ error: "ACCESS_ADMIN_SECRET non configurato" }), {
      status: 500,
      headers: JSON_HDR,
    });
  }

  const auth = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${admin}`;
  if (!timingSafeEqual(auth, expected)) {
    return new Response(JSON.stringify({ error: "Non autorizzato" }), { status: 401, headers: JSON_HDR });
  }

  let ttlHours = 168;
  try {
    const body = await req.json().catch(() => ({}));
    if (typeof body?.ttlHours === "number" && body.ttlHours > 0 && body.ttlHours <= 24 * 30) {
      ttlHours = Math.floor(body.ttlHours);
    }
  } catch {
    /* default */
  }

  const ttlSec = ttlHours * 3600;
  const token = generateOtpToken();
  const key = `otp:${token}`;

  try {
    await getKv().set(key, "1", { ex: ttlSec });
  } catch (e) {
    console.error("KV mint error", e);
    return new Response(
      JSON.stringify({
        error:
          "Redis non disponibile. Collega Upstash Redis al progetto (le variabili UPSTASH_REDIS_* o KV_* devono essere presenti).",
      }),
      { status: 503, headers: JSON_HDR }
    );
  }

  const expiresAt = new Date(Date.now() + ttlSec * 1000).toISOString();
  return new Response(JSON.stringify({ token, ttlHours, expiresAt }), { status: 201, headers: JSON_HDR });
}
