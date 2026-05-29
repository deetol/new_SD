"use client";

import { useState, type FormEvent } from "react";
import { adminFetch } from "@/lib/fetchAdmin";
import type { Ppdb } from "@/lib/api";

interface Props {
  ppdb: Ppdb | null;
  onClose: () => void;
  onSaved: () => void;
}

type AlurItem    = { judul: string; deskripsi: string };
type JadwalItem  = { no: number; kegiatan: string; tanggal: string; jam: string; tempat: string };

const inputCls  = "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary";
const inputSmCls = "rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary";

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 pt-2 pb-1 border-b border-slate-200 dark:border-slate-800 mb-3">
      {children}
    </p>
  );
}

export default function PpdbFormModal({ ppdb, onClose, onSaved }: Props) {
  const isEdit = !!ppdb;

  // ── Basic fields ──────────────────────────────────────────────────────────
  const [judul, setJudul]               = useState(ppdb?.judul ?? "");
  const [tahunAjaran, setTahunAjaran]   = useState(ppdb?.tahun_ajaran ?? new Date().getFullYear());
  const [deskripsi, setDeskripsi]       = useState(ppdb?.deskripsi ?? "");
  const [persyaratan, setPersyaratan]   = useState(ppdb?.persyaratan ?? "");
  const [tanggalBuka, setTanggalBuka]   = useState(ppdb?.tanggal_buka?.slice(0, 10) ?? "");
  const [tanggalTutup, setTanggalTutup] = useState(ppdb?.tanggal_tutup?.slice(0, 10) ?? "");
  const [kuota, setKuota]               = useState<number | "">(ppdb?.kuota ?? "");
  const [isActive, setIsActive]         = useState(ppdb?.is_active ?? true);

  // ── Alur langkah ─────────────────────────────────────────────────────────
  const [alur, setAlur] = useState<AlurItem[]>(
    ppdb?.alur_langkah ?? []
  );

  function addAlur() {
    setAlur((prev) => [...prev, { judul: "", deskripsi: "" }]);
  }
  function removeAlur(i: number) {
    setAlur((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updateAlur(i: number, field: keyof AlurItem, val: string) {
    setAlur((prev) => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  }

  // ── Jadwal kegiatan ───────────────────────────────────────────────────────
  const [jadwal, setJadwal] = useState<JadwalItem[]>(
    ppdb?.jadwal_kegiatan ?? []
  );

  function addJadwal() {
    setJadwal((prev) => [...prev, { no: prev.length + 1, kegiatan: "", tanggal: "", jam: "", tempat: "" }]);
  }
  function removeJadwal(i: number) {
    setJadwal((prev) => prev.filter((_, idx) => idx !== i).map((item, idx) => ({ ...item, no: idx + 1 })));
  }
  function updateJadwal(i: number, field: keyof JadwalItem, val: string | number) {
    setJadwal((prev) => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const body = {
      judul,
      tahun_ajaran:   tahunAjaran,
      deskripsi:      deskripsi || null,
      persyaratan:    persyaratan || null,
      alur_langkah:   alur.filter((a) => a.judul.trim()),
      jadwal_kegiatan: jadwal.filter((j) => j.kegiatan.trim()),
      tanggal_buka:   tanggalBuka,
      tanggal_tutup:  tanggalTutup,
      kuota:          kuota === "" ? null : kuota,
      is_active:      isActive,
    };

    try {
      if (isEdit) {
        await adminFetch(`/ppdb/${ppdb.id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await adminFetch("/ppdb", { method: "POST", body: JSON.stringify(body) });
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
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <h2 className="font-bold text-slate-900 dark:text-white">
            {isEdit ? "Edit PPDB" : "Tambah PPDB"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <form id="ppdb-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          {/* ── Info Dasar ── */}
          <SectionLabel>Informasi Dasar</SectionLabel>

          <Field label="Judul PPDB" required>
            <input required value={judul} onChange={(e) => setJudul(e.target.value)}
              className={inputCls} placeholder="PPDB Tahun Ajaran 2026/2027" />
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
                className={inputCls} placeholder="Kosongkan = ∞" />
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
            <textarea rows={2} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}
              className={`${inputCls} resize-none`} placeholder="Informasi umum PPDB..." />
          </Field>

          <Field label="Persyaratan">
            <textarea rows={4} value={persyaratan} onChange={(e) => setPersyaratan(e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder={"1. Berusia minimal 6 tahun\n2. Membawa akta kelahiran\n3. ..."} />
            <p className="mt-1 text-[11px] text-slate-400">Pisahkan tiap syarat dengan baris baru, awali dengan nomor.</p>
          </Field>

          {/* Toggle aktif */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div onClick={() => setIsActive(!isActive)}
              className={`relative w-10 h-5 rounded-full transition-colors ${isActive ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"}`}>
              <span className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow transition-transform ${isActive ? "translate-x-5" : "translate-x-0"}`} />
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300">PPDB Aktif</span>
          </label>

          {/* ── Alur Pendaftaran ── */}
          <SectionLabel>Alur Pendaftaran</SectionLabel>

          <div className="space-y-3">
            {alur.map((item, i) => (
              <div key={i} className="flex gap-3 items-start bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                <div className="shrink-0 size-7 rounded-full bg-accent-gold text-white flex items-center justify-center text-xs font-bold mt-1">
                  {i + 1}
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    value={item.judul}
                    onChange={(e) => updateAlur(i, "judul", e.target.value)}
                    className={inputCls}
                    placeholder="Judul langkah"
                  />
                  <textarea
                    rows={2}
                    value={item.deskripsi}
                    onChange={(e) => updateAlur(i, "deskripsi", e.target.value)}
                    className={`${inputCls} resize-none`}
                    placeholder="Deskripsi langkah..."
                  />
                </div>
                <button type="button" onClick={() => removeAlur(i)}
                  className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-1">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}
            <button type="button" onClick={addAlur}
              className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary text-slate-400 hover:text-primary text-sm flex items-center justify-center gap-2 transition-colors">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tambah Langkah
            </button>
          </div>

          {/* ── Jadwal Kegiatan ── */}
          <SectionLabel>Jadwal Kegiatan</SectionLabel>

          <div className="space-y-3">
            {jadwal.map((item, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Kegiatan #{item.no}</span>
                  <button type="button" onClick={() => removeJadwal(i)}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
                <input
                  value={item.kegiatan}
                  onChange={(e) => updateJadwal(i, "kegiatan", e.target.value)}
                  className={inputCls}
                  placeholder="Nama kegiatan"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    value={item.tanggal}
                    onChange={(e) => updateJadwal(i, "tanggal", e.target.value)}
                    className={`${inputSmCls} w-full`}
                    placeholder="Tanggal"
                  />
                  <input
                    value={item.jam}
                    onChange={(e) => updateJadwal(i, "jam", e.target.value)}
                    className={`${inputSmCls} w-full`}
                    placeholder="Jam"
                  />
                  <input
                    value={item.tempat}
                    onChange={(e) => updateJadwal(i, "tempat", e.target.value)}
                    className={`${inputSmCls} w-full`}
                    placeholder="Tempat"
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addJadwal}
              className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary text-slate-400 hover:text-primary text-sm flex items-center justify-center gap-2 transition-colors">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tambah Jadwal
            </button>
          </div>

        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            Batal
          </button>
          <button type="submit" form="ppdb-form" disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors">
            {saving ? (
              <><span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>Menyimpan...</>
            ) : (
              <><span className="material-symbols-outlined text-[16px]">save</span>{isEdit ? "Simpan Perubahan" : "Tambah PPDB"}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
