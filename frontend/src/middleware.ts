import { NextRequest, NextResponse } from "next/server";
import { TOKEN_KEY } from "@/lib/auth";

// Gunakan LARAVEL_API_URL (server-only) atau fallback ke NEXT_PUBLIC_API_URL
// NEXT_PUBLIC_API_URL tersedia di Edge Runtime karena di-inline saat build
const LARAVEL_API =
  process.env.LARAVEL_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000/api";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Halaman login dan API routes tidak perlu dicek
  if (pathname === "/admin/login" || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(TOKEN_KEY)?.value ?? null;

  // Tidak ada token → redirect ke login
  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Validasi token ke backend — cegah akses dengan token expired/revoked
  try {
    const res = await fetch(`${LARAVEL_API}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      // Token tidak valid → hapus cookie dan redirect ke login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.set(TOKEN_KEY, "", { maxAge: 0, path: "/" });
      return response;
    }
  } catch {
    // Jika backend tidak bisa dihubungi, izinkan lewat (jangan blokir karena network error)
    // Ini mencegah admin terkunci keluar saat backend sedang restart
  }

  return NextResponse.next();
}

export const config = {
  // Jalankan middleware hanya untuk route /admin/*
  matcher: ["/admin/:path*"],
};
