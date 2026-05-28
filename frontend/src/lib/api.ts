const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: number;
  nama: string;
  nip: string | null;
  jabatan: string;
  status: string;
  mata_pelajaran: string | null;
  pendidikan: string | null;
  foto: string | null;
  foto_url: string | null;
  is_active: boolean;
  urutan: number;
  tampil_di_profil: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export async function loginApi(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    // Laravel ValidationException returns errors.email[0]
    const msg =
      data?.errors?.email?.[0] ??
      data?.message ??
      "Login gagal.";
    throw new Error(msg);
  }

  return { user: data.user, token: data.token };
}

export async function logoutApi(token: string): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
}

export async function getMeApi(token: string): Promise<User> {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export interface Gallery {
  id: number;
  judul: string;
  slug: string;
  thumbnail: string;
  thumbnail_url: string | null;
  deskripsi: string | null;
  tanggal_kegiatan: string;
  created_at: string;
  updated_at: string;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getTeachers(params?: {
  is_active?: boolean;
  tampil_di_profil?: boolean;
}): Promise<Teacher[]> {
  const url = new URL(`${API_URL}/teachers`);

  if (params?.is_active !== undefined)
    url.searchParams.set("is_active", String(params.is_active));
  if (params?.tampil_di_profil !== undefined)
    url.searchParams.set("tampil_di_profil", String(params.tampil_di_profil));

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });

  if (!res.ok)
    throw new Error(`Gagal mengambil data guru: ${res.status}`);

  return res.json();
}
