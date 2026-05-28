"use client";

import { useState, type FormEvent } from "react";
import { adminFetch } from "@/lib/fetchAdmin";
import type { Ppdb } from "@/lib/api";

interface Props {
  ppdb: Ppdb | null;
  onClose: () => void;
  onSaved: () => void;
}

const inputCls = "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function PpdbFormModal({ ppdb, onClose, onSaved }: Props) {
  const isEdit = !!ppdb;

  const [judul, setJudul]           = useState(ppdb?.judul ?? "");
  const [tahunAjaran, setTahunAjaran] = useState(ppdb?.tahun_ajaran ?? new Date().getFullYear());
  const [deskripsi, setDeskripsi]   = useState(ppdb?.deskripsi ?? "");
  const [persyaratan, setPersyaratan] = useState(ppdb?.persyaratan ?? "");
  const [tanggalBuka, setTanggalBuka] = useState(ppdb?.tanggal_buka?.slice(0, 10) ?? "");
  const [tanggalTutup, setTanggalTutup] = useState(ppdb?.tanggal_tutup?.slice(0, 10) ?? "");
  const [kuota, setKuota]           = useState<number | "">(ppdb?.kuota ?? "");
  const [isActive, setIsActive]     = useState(ppdb?.is_active ?? true);

  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const body = {
      judul,
      tahun_ajaran: tahunAjaran,
      deskripsi:    deskripsi || null,
      persyaratan:  persyaratan || null,
      tanggal_buka: tanggalBuka,
      tanggal_tutup: tanggalTutup,
      kuota:        kuota === "" ? null : kuota,
      is_active:    isActive,
    };

    try {
      if (isEdit) {
        await adminFetch(`/ppdb/${ppdb.id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        await adminFetch("/ppdb", {
          method: "POST",
          body: JSON.stringify(body),
        });
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-slate-900 dark:text-white">
            {isEdit ? "Edit PPDB" : "Tambah PPDB"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <form id="ppdb-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <Field label="Judul PPDB" required>
            <input required value={judul} onChange={(e) => setJudul(e.target.value)}
              className={inputCls} placeholder="PPDB Tahun Ajaran 2025/2026" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Tahun Ajaran" required>
              <input required type="number" min={2000} max={2100}
                value={tahunAjaran} onChange={(e) => setTahunAjaran(Number(e.target.value))}
                className={inputCls} />
            </Field>
            <Field label="Kuota Siswa">
              <input type="number" min={1} value={kuota}
                onChange={(e) => setKuota(e.target.value === "" ? "" : Number(e.target.value))}
                className={inputCls} placeholder="Kosongkan = tidak terbatas" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Tanggal Buka" required>
              <input required type="date" value={tanggalBuka}
                onChange={(e) => setTanggalBuka(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Tanggal Tutup" required>
              <input required type="date" value={tanggalTutup}
                onChange={(e) => setTanggalTutup(e.target.value)} className={inputCls} />
            </Field>
          </div>

          <Field label="Deskripsi">
            <textarea rows={3} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}
              className={`${inputCls} resize-none`} placeholder="Informasi umum tentang PPDB..." />
          </Field>

          <Field label="Persyaratan">
            <textarea rows={4} value={persyaratan} onChange={(e) => setPersyaratan(e.target.value)}
              className={`${inputCls} resize-none`} placeholder="Daftar persyaratan pendaftaran..." />
          </Field>

          {/* Toggle aktif */}
          <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
            <div
              onClick={() => setIsActive(!isActive)}
              className={`relative w-10 h-5 rounded-full transition-colors ${isActive ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"}`}
            >
              <span className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow transition-transform ${isActive ? "translate-x-5" : "translate-x-0"}`} />
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300">PPDB Aktif</span>
          </label>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            Batal
          </button>
          <button type="submit" form="ppdb-form" disabled={saving}
            className="px-5 py-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors">
            {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah PPDB"}
          </button>
        </div>
      </div>
    </div>
  );
}
