import { NextResponse } from "next/server";

export function middleware(request) {

  const userId = request.cookies.get("userId")?.value;
  const role = request.cookies.get("role")?.value;

  const url = request.nextUrl.pathname;

  // Not logged in
  if (!userId && url.startsWith("/school")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // FEES → only ADMIN + ACCOUNTANT
  if (url.startsWith("/school/fees")) {
    if (role !== "ADMIN" && role !== "ACCOUNTANT") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // ATTENDANCE → only ADMIN + TEACHER
  if (url.startsWith("/school/attendance")) {
    if (role !== "ADMIN" && role !== "TEACHER") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (url.startsWith("/parent")) {
  if (role !== "PARENT") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
}

  return NextResponse.next();
}

export const config = {
  matcher: ["/school/:path*"],
};