import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request) {

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  const url = request.nextUrl.pathname

  // Not logged in
  if (!token && url.startsWith("/school")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If role exists in token
  const role = token?.role

  // FEES → only ADMIN + ACCOUNTANT
  if (url.startsWith("/school/fees")) {
    if (role !== "ADMIN" && role !== "ACCOUNTANT") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  // ATTENDANCE → ADMIN + TEACHER
  if (url.startsWith("/school/attendance")) {
    if (role !== "ADMIN" && role !== "TEACHER") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  // Parent portal
  if (url.startsWith("/parent")) {
    if (role !== "PARENT") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/school/:path*", "/parent/:path*"],
}