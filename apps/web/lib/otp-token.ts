/** Token monouso URL-safe (~43 caratteri). */
export function generateOtpToken(): string {
  const a = new Uint8Array(32);
  crypto.getRandomValues(a);
  let s = "";
  for (const b of a) {
    s += b.toString(16).padStart(2, "0");
  }
  return s;
}
