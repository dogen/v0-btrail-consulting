// Signed session cookie, shared by the login route (Node runtime) and
// middleware (Edge runtime) — Web Crypto only, no node:crypto.

export const SESSION_COOKIE = "btrail_session"
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30 // 30 days

const encoder = new TextEncoder()

async function hmacHex(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data))
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("")
}

/** Cookie value: `<expiresAtEpochSeconds>.<hmac(secret, expiresAt)>` */
export async function createSessionValue(secret: string): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS
  return `${expiresAt}.${await hmacHex(secret, String(expiresAt))}`
}

export async function verifySessionValue(secret: string, value: string | undefined): Promise<boolean> {
  if (!value) return false
  const [expiresAt, signature] = value.split(".")
  if (!expiresAt || !signature) return false
  if (!/^\d+$/.test(expiresAt) || Number(expiresAt) < Date.now() / 1000) return false
  const expected = await hmacHex(secret, expiresAt)
  // Constant-time comparison: compare HMACs of both strings instead of the
  // strings themselves so length/content differences don't leak timing.
  const [a, b] = await Promise.all([hmacHex(secret, signature), hmacHex(secret, expected)])
  return a === b
}
