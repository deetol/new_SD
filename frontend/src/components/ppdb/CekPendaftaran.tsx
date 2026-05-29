"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

interface HasilCek {
  nomor_pendaftaran: string;
  nama_lengkap: string;
  jenis_kelamin: "L" | "P";
  status: "menunggu" | "diterima" | "ditolak";
  catatan_admin: string | null;
  submitted_at: string | null;
  ppdb: { judul: string; tahun_ajaran: number } | null;
}

const STATUS_CONFIG = {
  menunggu: {
    icon:    "hourglass_top",
    label:   "Sedang Diproses",
    color:   "text-amber-600 dark:text-amber-400",
    bg:      "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
    iconBg:  "bg-amber-100 dark:bg-amber-900/30",
    desc:    "Berkas Anda sedang dalam proses verifikasi oleh panitia PPDB. Harap bersabar.",
  },
  diterima: {
    icon:    "check_circle",
    label:   "Diterima",
    color:   "text-green-600 dark:text-green-400",
    bg:      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    iconBg:  "bg-green-100 dark:bg-green-900/30",
    desc:    "Selamat! Anda diterima sebagai peserta didik baru. Segera lakukan daftar ulang sesuai jadwal.",
  },
  ditolak: {
    icon:    "cancel",
    label:   "Tidak Diterima",
    color:   "text-red-600 dark:text-red-400",
    bg:      "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    iconBg:  "bg-red-100 dark:bg-red-900/30",
    desc:    "Mohon maaf, pendaftaran Anda tidak dapat kami terima pada periode ini.",
  },
};

export default function CekPendaftaran() {
  const [nomor, setNomor]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [hasil, setHasil]       = useState<HasilCek | null>(null);

  async function handleCek(e: FormEvent) {
    e.preventDefault();
    if (!nomor.trim()) return;

    setLoading(true);
    setError(null);
    setHasil(null);

    try {
      const res = await fetch(
        `${API_URL}/pendaftar-ppdb/cek?nomor=${encodeURIComponent(nomor.trim().toUpperCase())}`,
        { headers: { Accept: "application/json" }, cache: "no-store" }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message ?? "Nomor pendaftaran tidak ditemukan.");
      }

      setHasil(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setHasil(null);
    setError(null);
    setNomor("");
  }

  const cfg = hasil ? STATUS_CONFIG[hasil.status] : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <span className="material-symbols-outlined text-primary text-3xl">manage_search</span>
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
          PPDB Online
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
          Cek Status Pendaftaran
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Masukkan nomor pendaftaran yang Anda terima setelah mengisi formulir PPDB.
        </p>
      </div>

      {/* Form input nomor */}
      {!hasil && (
        <form onSubmit={handleCek} className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={nomor}
              onChange={(e) => setNomor(e.target.value.toUpperCase())}
              placeholder="Contoh: PPDB-2026-ABCDE"
              className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary tracking-wider"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="submit"
              disabled={loading || !nomor.trim()}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              {loading ? (
                <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined text-[20px]">search</span>
              )}
              <span className="hidden sm:inline">Cek</span>
            </button>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
              {error}
            </div>
          )}
        </form>
      )}

      {/* Hasil */}
      {hasil && cfg && (
        <div className="space-y-4">
          {/* Status card */}
          <div className={`rounded-2xl border p-6 ${cfg.bg}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`size-14 rounded-2xl ${cfg.iconBg} flex items-center justify-center shrink-0`}>
                <span className={`material-symbols-outlined text-3xl ${cfg.color}`}>
                  {cfg.icon}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Status Pendaftaran
                </p>
                <p className={`text-2xl font-black ${cfg.color}`}>{cfg.label}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {cfg.desc}
            </p>
          </div>

          {/* Detail pendaftar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Detail Pendaftaran
            </h3>

            {[
              { label: "Nomor Pendaftaran", value: hasil.nomor_pendaftaran, mono: true },
              { label: "Nama Lengkap",      value: hasil.nama_lengkap },
              { label: "Jenis Kelamin",     value: hasil.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan" },
              { label: "Program PPDB",      value: hasil.ppdb ? `${hasil.ppdb.judul} (${hasil.ppdb.tahun_ajaran})` : "-" },
              {
                label: "Tanggal Daftar",
                value: hasil.submitted_at
                  ? new Date(hasil.submitted_at).toLocaleDateString("id-ID", {
                      day: "numeric", month: "long", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })
                  : "-",
              },
            ].map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0 w-36">{row.label}</span>
                <span className={`text-sm text-slate-800 dark:text-slate-200 text-right ${row.mono ? "font-mono font-bold tracking-wider text-primary" : "font-medium"}`}>
                  {row.value}
                </span>
              </div>
            ))}

            {/* Catatan admin */}
            {hasil.catatan_admin && (
              <div className="mt-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 mb-1.5">Catatan dari Panitia</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-lg px-4 py-3 leading-relaxed">
                  {hasil.catatan_admin}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 hover:border-primary hover:text-primary text-slate-600 dark:text-slate-400 font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              Cek Nomor Lain
            </button>
            <Link
              href="/ppdb"
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Kembali ke PPDB
            </Link>
          </div>
        </div>
      )}

      {/* Info cara cek */}
      {!hasil && !error && (
        <div className="mt-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Cara Cek Status</p>
          <ol className="space-y-2">
            {[
              "Masukkan nomor pendaftaran yang diterima setelah mengisi formulir PPDB.",
              "Nomor pendaftaran berformat: PPDB-TAHUN-KODE (contoh: PPDB-2026-ABCDE).",
              "Klik tombol \"Cek\" untuk melihat status pendaftaran Anda.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="shrink-0 size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

    </div>
  );
}
