import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookieString, TOKEN_KEY } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Halaman login tidak perlu dicek
  if (pathname === "/admin/login") return NextResponse.next();

  const cookieStr = request.headers.get("cookie") ?? "";
  const token = getTokenFromCookieString(cookieStr)
    ?? request.cookies.get(TOKEN_KEY)?.value
    ?? null;

  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Jalankan middleware hanya untuk route /admin/*
  matcher: ["/admin/:path*"],
};
