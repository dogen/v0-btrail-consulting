import { NextResponse } from "next/server"
import { timingSafeEqual, createHash } from "node:crypto"
import { z } from "zod"
import { createSessionValue, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/auth"

const bodySchema = z.object({ password: z.string().min(1).max(200) })

function safeEqual(a: string, b: string): boolean {
  // Hash both sides to fixed length so timingSafeEqual never throws on length mismatch
  const ha = createHash("sha256").update(a).digest()
  const hb = createHash("sha256").update(b).digest()
  return timingSafeEqual(ha, hb)
}

export async function POST(request: Request) {
  const expected = process.env.PORTAL_PASSWORD
  const secret = process.env.AUTH_SECRET
  if (!expected || !secret) {
    return NextResponse.json({ detail: "Portal login is not configured" }, { status: 503 })
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ detail: "Password is required" }, { status: 400 })
  }

  if (!safeEqual(parsed.data.password, expected)) {
    return NextResponse.json({ detail: "Incorrect password" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(SESSION_COOKIE, await createSessionValue(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
  return response
}
