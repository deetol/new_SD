/**
 * Fetch helper untuk admin — mengirim request ke Next.js proxy route
 * (/api/admin/...) yang berjalan di server dan meneruskan httpOnly
 * cookie token ke Laravel sebagai Bearer header.
 *
 * Dengan cara ini, token tidak pernah terekspos ke JavaScript di browser.
 */

// Proxy route — selalu relative agar bekerja di semua environment
const PROXY_BASE = "/api/admin";

interface FetchOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
  /**
   * Jika true, kembalikan response JSON mentah tanpa unwrap `data` wrapper.
   * Berguna untuk membaca pagination meta (total, per_page, dll.).
   */
  _raw?: boolean;
}

export async function adminFetch<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { _raw, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...fetchOptions.headers,
  };

  // Jangan set Content-Type untuk FormData — biarkan browser set boundary
  if (!(fetchOptions.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${PROXY_BASE}${path}`, {
    ...fetchOptions,
    headers,
    cache: "no-store",
  });

  // Token expired / invalid → paksa logout
  if (res.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("Sesi habis. Silakan login kembali.");
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      data?.message ??
      Object.values(data?.errors ?? {}).flat().join(", ") ??
      `Error ${res.status}`;
    throw new Error(String(msg));
  }

  // Kembalikan response mentah jika diminta (untuk baca pagination meta)
  if (_raw) return data as T;

  // Unwrap Laravel API Resource wrapper or Pagination wrapper
  let unwrappedData = data;
  if (data && typeof data === "object" && !Array.isArray(data) && "data" in data) {
    unwrappedData = data.data;
  }

  return unwrappedData as T;
}
