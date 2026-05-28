"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { adminFetch } from "@/lib/fetchAdmin";
import type { Teacher } from "@/lib/api";
import Image from "next/image";

interface Props {
  teacher: Teacher | null; // null = tambah baru
  onClose: () => void;
  onSaved: () => void;
}

export default function TeacherFormModal({ teacher, onClose, onSaved }: Props) {
  const isEdit = !!teacher;

  const [nama, setNama]                   = useState(teacher?.nama ?? "");
  const [nip, setNip]                     = useState(teacher?.nip ?? "");
  const [jabatan, setJabatan]             = useState(teacher?.jabatan ?? "");
  const [status, setStatus]               = useState(teacher?.status ?? "PNS");
  const [mataPelajaran, setMataPelajaran] = useState(teacher?.mata_pelajaran ?? "");
  const [pendidikan, setPendidikan]       = useState(teacher?.pendidikan ?? "");
  const [isActive, setIsActive]           = useState(teacher?.is_active ?? true);
  const [urutan, setUrutan]               = useState(teacher?.urutan ?? 0);
  const [tampilDiProfil, setTampilDiProfil] = useState(teacher?.tampil_di_profil ?? false);

  const [fotoFile, setFotoFile]   = useState<File | null>(null);
  const [preview, setPreview]     = useState<string | null>(teacher?.foto_url ?? null);
  const fileRef                   = useRef<HTMLInputElement>(null);

  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState<string | null>(null);

  // Preview foto baru
  useEffect(() => {
    if (!fotoFile) return;
    const url = URL.createObjectURL(fotoFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [fotoFile]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const form = new FormData();
      form.append("nama", nama);
      form.append("jabatan", jabatan);
      form.append("status", status);
      form.append("is_active", isActive ? "1" : "0");
      form.append("urutan", String(urutan));
      form.append("tampil_di_profil", tampilDiProfil ? "1" : "0");
      if (nip) form.append("nip", nip);
      if (mataPelajaran) form.append("mata_pelajaran", mataPelajaran);
      if (pendidikan) form.append("pendidikan", pendidikan);
      if (fotoFile) form.append("foto", fotoFile);

      if (isEdit) {
        // Laravel tidak support PUT multipart — pakai POST + _method
        form.append("_method", "PUT");
        await adminFetch(`/teachers/${teacher.id}`, { method: "POST", body: form });
      } else {
        await adminFetch("/teachers", { method: "POST", body: form });
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
            {isEdit ? "Edit Guru" : "Tambah Guru"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <form
          id="teacher-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-4"
        >
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Foto upload */}
          <div className="flex items-center gap-4">
            <div
              className="relative size-20 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <Image src={preview} alt="preview" fill sizes="80px" className="object-cover" unoptimized />
              ) : (
                <span className="material-symbols-outlined text-slate-400 absolute inset-0 flex items-center justify-center text-3xl">
                  add_photo_alternate
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Foto Guru</p>
              <p className="text-xs text-slate-400 mt-0.5">JPG, PNG, WebP · maks 2 MB</p>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="mt-1.5 text-xs text-primary hover:underline"
              >
                {preview ? "Ganti foto" : "Pilih foto"}
              </button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => setFotoFile(e.target.files?.[0] ?? null)}
            />
          </div>

          {/* Fields */}
          <Field label="Nama Lengkap *">
            <input required value={nama} onChange={(e) => setNama(e.target.value)}
              className={inputCls} placeholder="Budi Santoso, S.Pd." />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="NIP">
              <input value={nip} onChange={(e) => setNip(e.target.value)}
                className={inputCls} placeholder="197508122005011002" />
            </Field>
            <Field label="Pendidikan">
              <input value={pendidikan} onChange={(e) => setPendidikan(e.target.value)}
                className={inputCls} placeholder="S1 Pendidikan" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Jabatan *">
              <input required value={jabatan} onChange={(e) => setJabatan(e.target.value)}
                className={inputCls} placeholder="Guru Kelas I" />
            </Field>
            <Field label="Status *">
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
                <option value="PNS">PNS</option>
                <option value="PPPK">PPPK</option>
                <option value="Honorer">Honorer</option>
                <option value="GTT">GTT</option>
              </select>
            </Field>
          </div>

          <Field label="Mata Pelajaran">
            <input value={mataPelajaran} onChange={(e) => setMataPelajaran(e.target.value)}
              className={inputCls} placeholder="Matematika, IPA" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Urutan Tampil">
              <input type="number" min={0} value={urutan}
                onChange={(e) => setUrutan(Number(e.target.value))} className={inputCls} />
            </Field>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6 pt-1">
            <Toggle label="Aktif" checked={isActive} onChange={setIsActive} />
            <Toggle label="Tampil di Profil" checked={tampilDiProfil} onChange={setTampilDiProfil} />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            form="teacher-form"
            disabled={saving}
            className="px-5 py-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Guru"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
    </label>
  );
}
