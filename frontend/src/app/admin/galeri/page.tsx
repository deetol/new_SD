"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { adminFetch } from "@/lib/fetchAdmin";
import type { Gallery } from "@/lib/api";
import GalleryFormModal from "@/components/admin/GalleryFormModal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Image from "next/image";

export default function AdminGaleriPage() {
  const [galleries, setGalleries]   = useState<Gallery[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  const [formOpen, setFormOpen]         = useState(false);
  const [editing, setEditing]           = useState<Gallery | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Gallery | null>(null);
  const [deleting, setDeleting]         = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminFetch<Gallery[]>("/galleries");
      setGalleries(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminFetch(`/galleries/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menghapus.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminShell title="Manajemen Galeri">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {loading ? "Memuat..." : `${galleries.length} foto tersimpan`}
        </p>
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
          Upload Foto
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-video rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : galleries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-3">
            photo_library
          </span>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Belum ada foto galeri.</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
            Klik &quot;Upload Foto&quot; untuk menambahkan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleries.map((g) => (
            <div
              key={g.id}
              className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
                {g.thumbnail_url ? (
                  <Image
                    src={g.thumbnail_url}
                    alt={g.judul}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">
                      image
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => { setEditing(g); setFormOpen(true); }}
                    className="p-2 rounded-full bg-white/90 text-slate-700 hover:bg-white transition-colors"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(g)}
                    className="p-2 rounded-full bg-white/90 text-red-600 hover:bg-white transition-colors"
                    title="Hapus"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="px-3 py-2.5">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {g.judul}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {new Date(g.tanggal_kegiatan).toLocaleDateString("id-ID", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {formOpen && (
        <GalleryFormModal
          gallery={editing}
          onClose={() => setFormOpen(false)}
          onSaved={() => { setFormOpen(false); load(); }}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Hapus Foto Galeri"
          message={`Yakin ingin menghapus "${deleteTarget.judul}"? File thumbnail juga akan dihapus dari server.`}
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminShell>
  );
}
