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

export default function GalleryFormModal({ gallery, onClose, onSaved }: Props) {
  const isEdit = !!gallery;

  const [judul, setJudul]                   = useState(gallery?.judul ?? "");
  const [deskripsi, setDeskripsi]           = useState(gallery?.deskripsi ?? "");
  const [tanggalKegiatan, setTanggalKegiatan] = useState(
    gallery?.tanggal_kegiatan
      ? gallery.tanggal_kegiatan.slice(0, 10)
      : new Date().toISOString().slice(0, 10)
  );

  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [preview, setPreview]     = useState<string | null>(gallery?.thumbnail_url ?? null);
  const fileRef                   = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!thumbFile) return;
    const url = URL.createObjectURL(thumbFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [thumbFile]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isEdit && !thumbFile) {
      setError("Thumbnail wajib diupload.");
      return;
    }

    setSaving(true);
    try {
      const form = new FormData();
      form.append("judul", judul);
      form.append("tanggal_kegiatan", tanggalKegiatan);
      if (deskripsi) form.append("deskripsi", deskripsi);
      if (thumbFile) form.append("thumbnail", thumbFile);

      if (isEdit) {
        form.append("_method", "PUT");
        await adminFetch(`/galleries/${gallery.id}`, { method: "POST", body: form });
      } else {
        await adminFetch("/galleries", { method: "POST", body: form });
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
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-slate-900 dark:text-white">
            {isEdit ? "Edit Foto Galeri" : "Upload Foto Galeri"}
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
          id="gallery-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
        >
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Thumbnail upload area */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
              Thumbnail {!isEdit && <span className="text-red-500">*</span>}
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className={`relative w-full aspect-video rounded-xl overflow-hidden border-2 border-dashed cursor-pointer transition-colors ${
                preview
                  ? "border-transparent"
                  : "border-slate-300 dark:border-slate-600 hover:border-primary bg-slate-50 dark:bg-slate-800"
              }`}
            >
              {preview ? (
                <>
                  <Image
                    src={preview}
                    alt="preview"
                    fill
                    sizes="448px"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <span className="text-white text-sm font-medium bg-black/50 px-3 py-1.5 rounded-lg">
                      Ganti foto
                    </span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
                  <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                  <p className="text-sm">Klik untuk pilih foto</p>
                  <p className="text-xs">JPG, PNG, WebP · maks 5 MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => setThumbFile(e.target.files?.[0] ?? null)}
            />
          </div>

          {/* Judul */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Judul <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className={inputCls}
              placeholder="Perayaan Hari Kemerdekaan RI"
            />
          </div>

          {/* Tanggal */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Tanggal Kegiatan <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="date"
              value={tanggalKegiatan}
              onChange={(e) => setTanggalKegiatan(e.target.value)}
              className={inputCls}
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Deskripsi
            </label>
            <textarea
              rows={3}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder="Deskripsi singkat kegiatan..."
            />
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
            form="gallery-form"
            disabled={saving}
            className="px-5 py-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary";
