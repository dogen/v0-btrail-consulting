import { NextResponse, type NextRequest } from "next/server"
import { SESSION_COOKIE, verifySessionValue } from "@/lib/auth"

const PUBLIC_PATHS = ["/portal/login", "/api/auth/login"]

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next()
  }

  const secret = process.env.AUTH_SECRET
  const session = request.cookies.get(SESSION_COOKIE)?.value
  const authenticated = secret ? await verifySessionValue(secret, session) : false

  if (authenticated) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 })
  }

  const loginUrl = new URL("/portal/login", request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/portal/:path*", "/api/:path*"],
}
