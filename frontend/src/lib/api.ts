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
  kategori: "Ekstrakurikuler" | "Galeri Umum" | "Perayaan" | "Penghargaan";
  thumbnail: string;
  thumbnail_url: string | null;
  foto_tambahan: string[] | null;       // path relatif
  foto_tambahan_urls: string[];         // URL publik (dari accessor)
  deskripsi: string | null;
  tanggal_kegiatan: string;
  created_at: string;
  updated_at: string;
}

export interface Ppdb {
  id: number;
  judul: string;
  tahun_ajaran: number;
  deskripsi: string | null;
  persyaratan: string | null;
  alur_langkah: { judul: string; deskripsi: string }[] | null;
  jadwal_kegiatan: { no: number; kegiatan: string; tanggal: string; jam: string; tempat: string }[] | null;
  tanggal_buka: string;
  tanggal_tutup: string;
  kuota: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PendaftarPpdb {
  id: number;
  ppdb_id: number;
  ppdb?: Ppdb;
  nomor_pendaftaran: string;
  status: "menunggu" | "diterima" | "ditolak";
  nama_lengkap: string;
  jenis_kelamin: "L" | "P";
  tempat_lahir: string;
  tanggal_lahir: string;
  nik: string | null;
  agama: string | null;
  alamat: string;
  rt: string | null;
  rw: string | null;
  kelurahan: string | null;
  kecamatan: string | null;
  kabupaten: string | null;
  provinsi: string | null;
  kode_pos: string | null;
  nama_ayah: string | null;
  nama_ibu: string | null;
  nama_wali: string | null;
  no_hp: string;
  email: string | null;
  asal_tk: string | null;
  catatan_admin: string | null;
  submitted_at: string | null;
  // Berkas — path relatif
  foto: string | null;
  file_kk: string | null;
  file_akta: string | null;
  file_surat_pernyataan: string | null;
  // URL publik — dari accessor Laravel
  foto_url: string | null;
  file_kk_url: string | null;
  file_akta_url: string | null;
  file_surat_pernyataan_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfilSekolah {
  id: number;
  nama_sekolah: string;
  npsn: string | null;
  alamat: string;
  kelurahan: string | null;
  kecamatan: string | null;
  kabupaten: string | null;
  provinsi: string | null;
  kode_pos: string | null;
  no_telepon: string | null;
  email: string | null;
  sejarah: string | null;
  visi: string | null;
  misi: string | null;
  pengantar: string | null;
  visi_misi_pengantar: string | null;
  penghargaan: unknown[] | null;
  timeline: unknown[] | null;
  kepala_sekolah: string | null;
  logo: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
  };
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
}

export async function getGalleries(params?: {
  page?: number;
  per_page?: number;
  kategori?: string;
}): Promise<PaginatedResponse<Gallery>> {
  const url = new URL(`${API_URL}/galleries`);
  if (params?.page)      url.searchParams.set("page",      String(params.page));
  if (params?.per_page)  url.searchParams.set("per_page",  String(params.per_page));
  if (params?.kategori)  url.searchParams.set("kategori",  params.kategori);

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Gagal mengambil galeri: ${res.status}`);
  return res.json();
}

export async function getTeachersPaginated(params?: {
  page?: number;
  per_page?: number;
  is_active?: boolean;
  tampil_di_profil?: boolean;
}): Promise<PaginatedResponse<Teacher>> {
  const url = new URL(`${API_URL}/teachers`);
  if (params?.page)             url.searchParams.set("page",             String(params.page));
  if (params?.per_page)         url.searchParams.set("per_page",         String(params.per_page));
  if (params?.is_active !== undefined)
    url.searchParams.set("is_active",         String(params.is_active));
  if (params?.tampil_di_profil !== undefined)
    url.searchParams.set("tampil_di_profil",  String(params.tampil_di_profil));

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Gagal mengambil data guru: ${res.status}`);
  return res.json();
}

export interface Statistics {
  siswa_aktif: number;
  guru_ahli: number;
  tahun_mengabdi: number;
  tingkat_kelulusan: number;
  prestasi: {
    internasional: number;
    nasional: number;
    provinsi: number;
  };
  galeri: {
    ekstrakurikuler: number;
    galeri_umum: number;
    perayaan: number;
    penghargaan: number;
  };
}

export async function getStatistics(): Promise<Statistics | null> {
  try {
    const res = await fetch(`${API_URL}/statistics`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return null;
  }
}

export async function getProfilSekolah(): Promise<ProfilSekolah | null> {
  try {
    const res = await fetch(`${API_URL}/profil-sekolah`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    // ProfilSekolahResource wraps in { data: ... }
    const json = await res.json();
    return json.data ? json.data : json;
  } catch (error) {
    console.error("Error fetching profil sekolah:", error);
    return null;
  }
}
