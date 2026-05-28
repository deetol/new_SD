"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { adminFetch } from "@/lib/fetchAdmin";
import type { ProfilSekolah } from "@/lib/api";

const inputCls = "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary";
const textareaCls = `${inputCls} resize-none`;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</label>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 pt-2 pb-1 border-b border-slate-200 dark:border-slate-800">
      {children}
    </h3>
  );
}

export default function AdminProfilPage() {
  const [profil, setProfil]   = useState<ProfilSekolah | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form fields
  const [namaSekolah, setNamaSekolah]     = useState("");
  const [npsn, setNpsn]                   = useState("");
  const [alamat, setAlamat]               = useState("");
  const [kelurahan, setKelurahan]         = useState("");
  const [kecamatan, setKecamatan]         = useState("");
  const [kabupaten, setKabupaten]         = useState("");
  const [provinsi, setProvinsi]           = useState("");
  const [kodePos, setKodePos]             = useState("");
  const [noTelepon, setNoTelepon]         = useState("");
  const [email, setEmail]                 = useState("");
  const [kepalaSekolah, setKepalaSekolah] = useState("");
  const [sejarah, setSejarah]             = useState("");
  const [visi, setVisi]                   = useState("");
  const [misi, setMisi]                   = useState("");
  const [pengantar, setPengantar]         = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminFetch<ProfilSekolah>("/profil-sekolah");
      setProfil(data);
      setNamaSekolah(data.nama_sekolah ?? "");
      setNpsn(data.npsn ?? "");
      setAlamat(data.alamat ?? "");
      setKelurahan(data.kelurahan ?? "");
      setKecamatan(data.kecamatan ?? "");
      setKabupaten(data.kabupaten ?? "");
      setProvinsi(data.provinsi ?? "");
      setKodePos(data.kode_pos ?? "");
      setNoTelepon(data.no_telepon ?? "");
      setEmail(data.email ?? "");
      setKepalaSekolah(data.kepala_sekolah ?? "");
      setSejarah(data.sejarah ?? "");
      setVisi(data.visi ?? "");
      setMisi(data.misi ?? "");
      setPengantar(data.pengantar ?? "");
    } catch {
      // Profil belum ada — form kosong untuk create
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const body = {
      nama_sekolah:  namaSekolah,
      npsn:          npsn || null,
      alamat,
      kelurahan:     kelurahan || null,
      kecamatan:     kecamatan || null,
      kabupaten:     kabupaten || null,
      provinsi:      provinsi || null,
      kode_pos:      kodePos || null,
      no_telepon:    noTelepon || null,
      email:         email || null,
      kepala_sekolah: kepalaSekolah || null,
      sejarah:       sejarah || null,
      visi:          visi || null,
      misi:          misi || null,
      pengantar:     pengantar || null,
    };

    try {
      if (profil) {
        await adminFetch(`/profil-sekolah/${profil.id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        const created = await adminFetch<ProfilSekolah>("/profil-sekolah", {
          method: "POST",
          body: JSON.stringify(body),
        });
        setProfil(created);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AdminShell title="Profil Sekolah">
        <div className="flex items-center justify-center py-24 text-slate-400">
          <span className="material-symbols-outlined animate-spin text-2xl mr-2">progress_activity</span>
          Memuat...
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Profil Sekolah">
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Feedback */}
        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Profil sekolah berhasil disimpan.
          </div>
        )}

        {/* Identitas */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <SectionTitle>Identitas Sekolah</SectionTitle>
          <Field label="Nama Sekolah *">
            <input required value={namaSekolah} onChange={(e) => setNamaSekolah(e.target.value)}
              className={inputCls} placeholder="SD Negeri 5 Selok Awar-Awar" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="NPSN">
              <input value={npsn} onChange={(e) => setNpsn(e.target.value)}
                className={inputCls} placeholder="12345678" />
            </Field>
            <Field label="Kepala Sekolah">
              <input value={kepalaSekolah} onChange={(e) => setKepalaSekolah(e.target.value)}
                className={inputCls} placeholder="Nama kepala sekolah" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="No. Telepon">
              <input value={noTelepon} onChange={(e) => setNoTelepon(e.target.value)}
                className={inputCls} placeholder="0341-xxxxxx" />
            </Field>
            <Field label="Email">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className={inputCls} placeholder="sekolah@example.com" />
            </Field>
          </div>
        </div>

        {/* Alamat */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <SectionTitle>Alamat</SectionTitle>
          <Field label="Alamat Lengkap *">
            <input required value={alamat} onChange={(e) => setAlamat(e.target.value)}
              className={inputCls} placeholder="Jl. Raya No. 1" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Kelurahan / Desa">
              <input value={kelurahan} onChange={(e) => setKelurahan(e.target.value)}
                className={inputCls} placeholder="Selok Awar-Awar" />
            </Field>
            <Field label="Kecamatan">
              <input value={kecamatan} onChange={(e) => setKecamatan(e.target.value)}
                className={inputCls} placeholder="Pasirian" />
            </Field>
            <Field label="Kabupaten / Kota">
              <input value={kabupaten} onChange={(e) => setKabupaten(e.target.value)}
                className={inputCls} placeholder="Lumajang" />
            </Field>
            <Field label="Provinsi">
              <input value={provinsi} onChange={(e) => setProvinsi(e.target.value)}
                className={inputCls} placeholder="Jawa Timur" />
            </Field>
            <Field label="Kode Pos">
              <input value={kodePos} onChange={(e) => setKodePos(e.target.value)}
                className={inputCls} placeholder="67371" />
            </Field>
          </div>
        </div>

        {/* Konten */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <SectionTitle>Konten Profil</SectionTitle>
          <Field label="Sejarah Sekolah">
            <textarea rows={5} value={sejarah} onChange={(e) => setSejarah(e.target.value)}
              className={textareaCls} placeholder="Ceritakan sejarah berdirinya sekolah..." />
          </Field>
          <Field label="Visi">
            <textarea rows={3} value={visi} onChange={(e) => setVisi(e.target.value)}
              className={textareaCls} placeholder="Visi sekolah..." />
          </Field>
          <Field label="Misi">
            <textarea rows={5} value={misi} onChange={(e) => setMisi(e.target.value)}
              className={textareaCls} placeholder="Misi sekolah (pisahkan tiap poin dengan baris baru)..." />
          </Field>
          <Field label="Sambutan Kepala Sekolah">
            <textarea rows={6} value={pengantar} onChange={(e) => setPengantar(e.target.value)}
              className={textareaCls} placeholder="Kata sambutan dari kepala sekolah..." />
          </Field>
        </div>

        {/* Submit */}
        <div className="flex justify-end pb-6">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            {saving ? "Menyimpan..." : profil ? "Simpan Perubahan" : "Simpan Profil"}
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
