"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { adminFetch } from "@/lib/fetchAdmin";
import type { Gallery } from "@/lib/api";
import Image from "next/image";

interface Props {
  gallery: Gallery | null;
  onClose: () => void;
  onSaved: () => void;
}

type Kategori = Gallery["kategori"];

const KATEGORI_OPTIONS: { value: Kategori; label: string; icon: string; desc: string }[] = [
  { value: "Ekstrakurikuler", label: "Ekstrakurikuler", icon: "sports_soccer",  desc: "Seni, olahraga, klub siswa" },
  { value: "Galeri Umum",     label: "Galeri Umum",     icon: "photo_library",  desc: "Kegiatan harian & lingkungan" },
  { value: "Perayaan",        label: "Perayaan",         icon: "celebration",    desc: "Hari besar & acara khusus" },
  { value: "Penghargaan",     label: "Penghargaan",      icon: "emoji_events",   desc: "Prestasi & piagam" },
];

const inputCls =
  "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow";

export default function GalleryFormModal({ gallery, onClose, onSaved }: Props) {
  const isEdit = !!gallery;

  const [judul, setJudul]                     = useState(gallery?.judul ?? "");
  const [kategori, setKategori]               = useState<Kategori>(gallery?.kategori ?? "Galeri Umum");
  const [deskripsi, setDeskripsi]             = useState(gallery?.deskripsi ?? "");
  const [tanggalKegiatan, setTanggalKegiatan] = useState(
    gallery?.tanggal_kegiatan?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)
  );

  // Thumbnail utama
  const [thumbFile, setThumbFile]   = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(gallery?.thumbnail_url ?? null);
  const thumbRef = useRef<HTMLInputElement>(null);

  // Foto tambahan — existing (dari server) + file baru
  const [existingFotos, setExistingFotos]   = useState<string[]>(gallery?.foto_tambahan_urls ?? []);
  const [hapusFotoIdx, setHapusFotoIdx]     = useState<number[]>([]);   // index existing yang akan dihapus
  const [newFotoFiles, setNewFotoFiles]     = useState<File[]>([]);
  const [newFotoPreviews, setNewFotoPreviews] = useState<string[]>([]);
  const fotosRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  // Preview thumbnail baru
  useEffect(() => {
    if (!thumbFile) return;
    const url = URL.createObjectURL(thumbFile);
    setThumbPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [thumbFile]);

  // Preview foto tambahan baru
  useEffect(() => {
    const urls = newFotoFiles.map((f) => URL.createObjectURL(f));
    setNewFotoPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [newFotoFiles]);

  function handleAddFotos(files: FileList | null) {
    if (!files) return;
    const arr = Array.from(files);
    setNewFotoFiles((prev) => [...prev, ...arr]);
  }

  function removeNewFoto(idx: number) {
    setNewFotoFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  function toggleHapusExisting(idx: number) {
    setHapusFotoIdx((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isEdit && !thumbFile) {
      setError("Thumbnail utama wajib diupload.");
      return;
    }

    setSaving(true);
    try {
      const form = new FormData();
      form.append("judul", judul);
      form.append("kategori", kategori);
      form.append("tanggal_kegiatan", tanggalKegiatan);
      if (deskripsi.trim()) form.append("deskripsi", deskripsi.trim());
      if (thumbFile) form.append("thumbnail", thumbFile);

      // Foto tambahan baru
      newFotoFiles.forEach((f) => form.append("foto_tambahan[]", f));

      // Index foto existing yang dihapus (hanya saat edit)
      if (isEdit) {
        hapusFotoIdx.forEach((i) => form.append("foto_tambahan_hapus[]", String(i)));
        form.append("_method", "PUT");
        await adminFetch<Gallery>(`/galleries/${gallery.id}`, { method: "POST", body: form });
      } else {
        await adminFetch<Gallery>("/galleries", { method: "POST", body: form });
      }

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  const totalFotos = existingFotos.filter((_, i) => !hapusFotoIdx.includes(i)).length + newFotoFiles.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              {isEdit ? "Edit Foto Galeri" : "Upload Foto Galeri"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isEdit ? `Mengedit: ${gallery.judul}` : "Tambah foto kegiatan baru"}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <form id="gallery-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400 flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0">error</span>
              {error}
            </div>
          )}

          {/* Kategori */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {KATEGORI_OPTIONS.map((opt) => (
                <button key={opt.value} type="button" onClick={() => setKategori(opt.value)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-left transition-all ${
                    kategori === opt.value
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className={`material-symbols-outlined text-[22px] shrink-0 ${kategori === opt.value ? "text-primary" : "text-slate-400"}`}>
                    {opt.icon}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-semibold ${kategori === opt.value ? "text-primary" : "text-slate-700 dark:text-slate-300"}`}>
                      {opt.label}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Thumbnail utama */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
              Foto Utama (Thumbnail){" "}
              {!isEdit ? <span className="text-red-500">*</span>
                       : <span className="text-slate-400 font-normal">(kosongkan jika tidak diganti)</span>}
            </label>
            <div
              role="button" tabIndex={0}
              onClick={() => thumbRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && thumbRef.current?.click()}
              className={`relative w-full aspect-video rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                thumbPreview ? "border-transparent shadow-md"
                             : "border-dashed border-slate-300 dark:border-slate-600 hover:border-primary bg-slate-50 dark:bg-slate-800"
              }`}
            >
              {thumbPreview ? (
                <>
                  <Image src={thumbPreview} alt="preview" fill sizes="672px" className="object-cover" />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex flex-col items-center justify-center gap-2 opacity-0 hover:opacity-100">
                    <span className="material-symbols-outlined text-white text-3xl">add_photo_alternate</span>
                    <span className="text-white text-sm font-medium bg-black/50 px-3 py-1.5 rounded-lg">Ganti foto utama</span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
                  <span className="material-symbols-outlined text-5xl">add_photo_alternate</span>
                  <p className="text-sm font-medium">Klik untuk pilih foto utama</p>
                  <p className="text-xs">JPG, PNG, WebP · maks 5 MB</p>
                </div>
              )}
            </div>
            <input ref={thumbRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
              onChange={(e) => setThumbFile(e.target.files?.[0] ?? null)} />
            {thumbFile && (
              <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-green-500">check_circle</span>
                {thumbFile.name} ({(thumbFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          {/* Foto tambahan */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Foto Tambahan
                <span className="text-slate-400 font-normal ml-1">(opsional, maks 10 foto)</span>
              </label>
              <span className="text-xs text-slate-400">{totalFotos}/10</span>
            </div>

            {/* Grid foto existing (saat edit) */}
            {isEdit && existingFotos.length > 0 && (
              <div className="mb-3">
                <p className="text-[11px] text-slate-400 mb-2">Foto saat ini — klik untuk tandai hapus</p>
                <div className="grid grid-cols-4 gap-2">
                  {existingFotos.map((url, idx) => {
                    const willDelete = hapusFotoIdx.includes(idx);
                    return (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => toggleHapusExisting(idx)}>
                        <Image src={url} alt={`foto-${idx}`} fill sizes="120px" className={`object-cover transition-opacity ${willDelete ? "opacity-30" : ""}`} />
                        {willDelete ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
                            <span className="material-symbols-outlined text-red-600 text-2xl">delete</span>
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                            <span className="material-symbols-outlined text-white text-xl">delete</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {hapusFotoIdx.length > 0 && (
                  <p className="mt-1.5 text-xs text-red-500">{hapusFotoIdx.length} foto akan dihapus saat disimpan</p>
                )}
              </div>
            )}

            {/* Preview foto baru yang dipilih */}
            {newFotoPreviews.length > 0 && (
              <div className="mb-3">
                <p className="text-[11px] text-slate-400 mb-2">Foto baru yang akan diupload</p>
                <div className="grid grid-cols-4 gap-2">
                  {newFotoPreviews.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                      <Image src={url} alt={`new-${idx}`} fill sizes="120px" className="object-cover" />
                      <button type="button" onClick={() => removeNewFoto(idx)}
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="material-symbols-outlined text-white text-xl">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tombol tambah foto */}
            {totalFotos < 10 && (
              <button type="button" onClick={() => fotosRef.current?.click()}
                className="w-full py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary text-slate-400 hover:text-primary text-sm flex items-center justify-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                Tambah Foto ({10 - totalFotos} slot tersisa)
              </button>
            )}
            <input ref={fotosRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden"
              onChange={(e) => handleAddFotos(e.target.files)} />
          </div>

          {/* Judul */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Judul Kegiatan <span className="text-red-500">*</span>
            </label>
            <input required value={judul} onChange={(e) => setJudul(e.target.value)}
              className={inputCls} placeholder="Perayaan Hari Kemerdekaan RI ke-79" />
          </div>

          {/* Tanggal */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Tanggal Kegiatan <span className="text-red-500">*</span>
            </label>
            <input required type="date" value={tanggalKegiatan}
              onChange={(e) => setTanggalKegiatan(e.target.value)} className={inputCls} />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Deskripsi <span className="text-slate-400 font-normal">(opsional)</span>
            </label>
            <textarea rows={3} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder="Deskripsi singkat kegiatan..." />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            Batal
          </button>
          <button type="submit" form="gallery-form" disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors">
            {saving ? (
              <><span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>Menyimpan...</>
            ) : isEdit ? (
              <><span className="material-symbols-outlined text-[16px]">save</span>Simpan Perubahan</>
            ) : (
              <><span className="material-symbols-outlined text-[16px]">upload</span>Upload Foto</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
