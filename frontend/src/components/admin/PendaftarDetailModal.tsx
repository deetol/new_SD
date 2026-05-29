"use client";

import { useState } from "react";
import { adminFetch } from "@/lib/fetchAdmin";
import type { PendaftarPpdb } from "@/lib/api";

interface Props {
  pendaftar: PendaftarPpdb;
  onClose: () => void;
  onStatusChanged: () => void;
}

const STATUS_OPTIONS = [
  { value: "menunggu", label: "Menunggu", color: "text-amber-600" },
  { value: "diterima", label: "Diterima", color: "text-green-600" },
  { value: "ditolak",  label: "Ditolak",  color: "text-red-600"  },
] as const;

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col sm:flex-row py-2 sm:py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <span className="w-full sm:w-36 shrink-0 text-xs text-slate-400 dark:text-slate-500 mb-0.5 sm:mb-0">{label}</span>
      <span className="text-sm text-slate-800 dark:text-slate-200 break-words">{value || "-"}</span>
    </div>
  );
}

function BerkasItem({
  label, url, icon,
}: {
  label: string; url: string | null; icon: string;
}) {
  const isPdf = url?.toLowerCase().endsWith(".pdf");

  if (!url) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700">
        <div className="size-9 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-slate-400 text-[18px]">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Tidak diupload</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      {/* Preview thumbnail untuk gambar */}
      {!isPdf ? (
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="shrink-0 size-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:opacity-80 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={label} className="w-full h-full object-cover" />
        </a>
      ) : (
        <div className="shrink-0 size-14 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center justify-center">
          <span className="material-symbols-outlined text-red-500 text-2xl">picture_as_pdf</span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</p>
        <p className="text-[11px] text-slate-400 truncate">{isPdf ? "Dokumen PDF" : "Gambar"}</p>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors"
        title="Buka / Unduh"
      >
        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        Buka
      </a>
    </div>
  );
}

export default function PendaftarDetailModal({ pendaftar: p, onClose, onStatusChanged }: Props) {
  const [status, setStatus]   = useState(p.status);
  const [catatan, setCatatan] = useState(p.catatan_admin ?? "");
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  async function handleSaveStatus() {
    setSaving(true);
    setError(null);
    try {
      await adminFetch(`/pendaftar-ppdb/${p.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status, catatan_admin: catatan || null }),
      });
      onStatusChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">{p.nama_lengkap}</h2>
            <p className="text-xs font-mono text-slate-400 mt-0.5">{p.nomor_pendaftaran}</p>
          </div>
          <button onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Data Diri */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Data Diri</h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-2">
              <Row label="Nama Lengkap"  value={p.nama_lengkap} />
              <Row label="Jenis Kelamin" value={p.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"} />
              <Row label="Tempat Lahir"  value={p.tempat_lahir} />
              <Row label="Tanggal Lahir" value={fmt(p.tanggal_lahir)} />
              <Row label="NIK"           value={p.nik} />
              <Row label="Agama"         value={p.agama} />
              <Row label="Asal TK/PAUD"  value={p.asal_tk} />
            </div>
          </section>

          {/* Alamat */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Alamat</h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-2">
              <Row label="Alamat"    value={p.alamat} />
              <Row label="RT / RW"   value={p.rt && p.rw ? `${p.rt} / ${p.rw}` : null} />
              <Row label="Kelurahan" value={p.kelurahan} />
              <Row label="Kecamatan" value={p.kecamatan} />
              <Row label="Kabupaten" value={p.kabupaten} />
              <Row label="Provinsi"  value={p.provinsi} />
              <Row label="Kode Pos"  value={p.kode_pos} />
            </div>
          </section>

          {/* Orang Tua */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Orang Tua / Wali</h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-2">
              <Row label="Nama Ayah" value={p.nama_ayah} />
              <Row label="Nama Ibu"  value={p.nama_ibu} />
              <Row label="Nama Wali" value={p.nama_wali} />
              <Row label="No. HP"    value={p.no_hp} />
              <Row label="Email"     value={p.email} />
            </div>
          </section>

          {/* ── Berkas ── */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Berkas yang Diupload
            </h3>
            <div className="space-y-2">
              <BerkasItem label="Foto Calon Siswa"   url={p.foto_url}                    icon="photo_camera" />
              <BerkasItem label="Kartu Keluarga (KK)" url={p.file_kk_url}               icon="badge" />
              <BerkasItem label="Akta Kelahiran"      url={p.file_akta_url}             icon="description" />
              <BerkasItem label="Surat Pernyataan"    url={p.file_surat_pernyataan_url} icon="edit_document" />
            </div>
          </section>

          {/* Update Status */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Status Pendaftaran</h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                {STATUS_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value={opt.value}
                      checked={status === opt.value}
                      onChange={() => setStatus(opt.value)}
                      className="accent-primary" />
                    <span className={`text-sm font-medium ${opt.color}`}>{opt.label}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Catatan Admin
                </label>
                <textarea rows={3} value={catatan} onChange={(e) => setCatatan(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Catatan untuk pendaftar (opsional)..." />
              </div>

              <button onClick={handleSaveStatus} disabled={saving}
                className="w-full py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                {saving ? (
                  <><span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>Menyimpan...</>
                ) : (
                  <><span className="material-symbols-outlined text-[16px]">save</span>Simpan Status</>
                )}
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
