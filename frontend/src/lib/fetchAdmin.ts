/**
 * Fetch helper untuk admin — otomatis inject Bearer token dari cookie.
 * Dipakai di client components (bukan server components).
 */

import { getToken, removeToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

interface FetchOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
}

export async function adminFetch<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...options.headers,
  };

  // Jangan set Content-Type untuk FormData — biarkan browser set boundary
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  // Token expired / invalid → paksa logout
  if (res.status === 401) {
    removeToken();
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

  // Unwrap Laravel API Resource wrapper or Pagination wrapper
  let unwrappedData = data;
  if (data && typeof data === "object" && !Array.isArray(data) && "data" in data) {
    unwrappedData = data.data;
  }

  return unwrappedData as T;
}
