"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { adminFetch } from "@/lib/fetchAdmin";
import type { Gallery } from "@/lib/api";
import GalleryFormModal from "@/components/admin/GalleryFormModal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Image from "next/image";

type Kategori = Gallery["kategori"];

const TABS: { value: Kategori | "Semua"; label: string; icon: string }[] = [
  { value: "Semua",           label: "Semua",           icon: "grid_view" },
  { value: "Ekstrakurikuler", label: "Ekstrakurikuler", icon: "sports_soccer" },
  { value: "Galeri Umum",     label: "Galeri Umum",     icon: "photo_library" },
  { value: "Perayaan",        label: "Perayaan",         icon: "celebration" },
  { value: "Penghargaan",     label: "Penghargaan",      icon: "emoji_events" },
];

const KATEGORI_COLORS: Record<Kategori, string> = {
  "Ekstrakurikuler": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Galeri Umum":     "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  "Perayaan":        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Penghargaan":     "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export default function AdminGaleriPage() {
  const [galleries, setGalleries]   = useState<Gallery[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [activeTab, setActiveTab]   = useState<Kategori | "Semua">("Semua");

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

  // Filter berdasarkan tab aktif
  const filtered = activeTab === "Semua"
    ? galleries
    : galleries.filter((g) => g.kategori === activeTab);

  // Hitung jumlah per kategori
  const counts = galleries.reduce<Record<string, number>>((acc, g) => {
    acc[g.kategori] = (acc[g.kategori] ?? 0) + 1;
    return acc;
  }, {});

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  return (
    <AdminShell title="Manajemen Galeri">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {loading ? "Memuat..." : `${filtered.length} foto${activeTab !== "Semua" ? ` · ${activeTab}` : ""}`}
        </p>
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
          Upload Foto
        </button>
      </div>

      {/* Tabs kategori */}
      <div className="flex items-center gap-1 mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto">
        {TABS.map((tab) => {
          const count = tab.value === "Semua" ? galleries.length : (counts[tab.value] ?? 0);
          const active = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                active
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              {tab.label}
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
                active
                  ? "bg-primary/10 text-primary"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
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
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-3">
            photo_library
          </span>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {activeTab === "Semua" ? "Belum ada foto galeri." : `Belum ada foto kategori "${activeTab}".`}
          </p>
          <button
            onClick={() => { setEditing(null); setFormOpen(true); }}
            className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline font-medium"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Upload foto sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((g) => (
            <div
              key={g.id}
              className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all"
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
                    <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">image</span>
                  </div>
                )}

                {/* Hover overlay dengan aksi */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => { setEditing(g); setFormOpen(true); }}
                    className="p-2 rounded-full bg-white/90 text-slate-700 hover:bg-white hover:scale-110 transition-all"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(g)}
                    className="p-2 rounded-full bg-white/90 text-red-600 hover:bg-white hover:scale-110 transition-all"
                    title="Hapus"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="px-3 py-2.5">
                {/* Badge kategori */}
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 ${KATEGORI_COLORS[g.kategori]}`}>
                  {g.kategori}
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate leading-tight">
                  {g.judul}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {fmt(g.tanggal_kegiatan)}
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
