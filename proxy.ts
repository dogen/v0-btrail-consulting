import { NextResponse, type NextRequest } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

const PUBLIC_PATHS = ["/portal/login", "/api/auth"]

// Fast redirect gate only: checks that the better-auth session cookie exists.
// Real DB-backed validation happens in the lib/session.ts guards on every
// portal page and API route — a forged cookie gets past this redirect but
// nothing else.
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next()
  }

  if (getSessionCookie(request)) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 })
  }

  return NextResponse.redirect(new URL("/portal/login", request.url))
}

export const config = {
  matcher: ["/portal/:path*", "/api/:path*"],
}
