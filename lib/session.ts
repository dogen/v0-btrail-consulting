import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

// proxy.ts only checks that the session cookie exists (it runs on the edge,
// no DB access) — these guards do the real, DB-backed validation.

/** Server-page guard: redirects to the login page when unauthenticated. */
export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/portal/login")
  return session
}

/** API-route guard: returns a 401 response to send back, or null when authenticated. */
export async function requireApiSession(request: Request): Promise<NextResponse | null> {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 })
  }
  return null
}
