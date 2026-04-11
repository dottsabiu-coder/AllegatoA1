import { createClient, type VercelKV } from "@vercel/kv";

let _kv: VercelKV | null = null;

/**
 * Usa le variabili che Vercel espone dopo il collegamento:
 * - vecchio nome: KV_REST_API_URL / KV_REST_API_TOKEN
 * - integrazione Upstash: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
 */
export function getKv(): VercelKV {
  if (_kv) return _kv;
  const url =
    process.env.KV_REST_API_URL?.trim() || process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token =
    process.env.KV_REST_API_TOKEN?.trim() || process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) {
    throw new Error(
      "Redis: imposta KV_REST_API_URL e KV_REST_API_TOKEN, oppure UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN"
    );
  }
  _kv = createClient({ url, token });
  return _kv;
}
