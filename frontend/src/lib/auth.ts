/**
 * Helper untuk baca/tulis auth token dari cookie.
 * Dipakai di client components dan middleware.
 * Cookie name: "admin_token"
 */

export const TOKEN_KEY = "admin_token";

/** Simpan token ke cookie (client-side) */
export function setToken(token: string): void {
  if (typeof document === "undefined") return;
  // httpOnly tidak bisa di-set dari JS — kita pakai SameSite=Strict sebagai gantinya
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
}

/** Hapus token dari cookie (client-side) */
export function removeToken(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Strict`;
}

/** Baca token dari cookie string (bisa dipakai di server/middleware) */
export function getTokenFromCookieString(cookieStr: string): string | null {
  const match = cookieStr.match(new RegExp(`(?:^|;\\s*)${TOKEN_KEY}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/** Baca token dari browser document.cookie */
export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  return getTokenFromCookieString(document.cookie);
}
