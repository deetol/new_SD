/**
 * Auth helpers.
 *
 * Token sekarang disimpan sebagai httpOnly cookie yang di-set oleh
 * Next.js API route (/api/auth/login). Cookie tidak bisa dibaca oleh
 * JavaScript di browser, sehingga aman dari serangan XSS.
 *
 * TOKEN_KEY dipakai oleh middleware (server-side) untuk membaca cookie.
 */

export const TOKEN_KEY = "admin_token";

/**
 * Baca token dari cookie string — hanya untuk dipakai di server/middleware
 * (Next.js middleware berjalan di edge, bisa baca cookie header).
 * Di browser, cookie ini tidak bisa dibaca karena httpOnly.
 */
export function getTokenFromCookieString(cookieStr: string): string | null {
  const match = cookieStr.match(new RegExp(`(?:^|;\\s*)${TOKEN_KEY}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}
