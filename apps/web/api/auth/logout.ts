export const config = { runtime: "edge" };

const JSON_HDR = { "Content-Type": "application/json; charset=utf-8" };
const COOKIE = "a1_session";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: JSON_HDR });
  }

  const url = new URL(req.url);
  const secure = url.protocol === "https:";
  const clear = [
    `${COOKIE}=`,
    "Path=/",
    "Max-Age=0",
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (secure) clear.push("Secure");

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      ...JSON_HDR,
      "Set-Cookie": clear.join("; "),
    },
  });
}
