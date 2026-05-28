import Link from "next/link";
import type { Gallery } from "@/lib/api";

interface Props {
  gallery: Gallery;
  related: Gallery[];
}

export default function GaleriDetailContent({ gallery, related }: Props) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });

  const fotoTambahan = gallery.foto_tambahan_urls ?? [];

  return (
    <article className="w-full max-w-[960px]">

      {/* ── Back ── */}
      <div className="mb-6">
        <Link href="/galeri"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Kembali ke Galeri
        </Link>
      </div>

      {/* ── Two-column header (seperti referensi) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 mb-8">
        {/* Kiri: meta + judul */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">
              {fmt(gallery.tanggal_kegiatan)}
            </span>
            <span>·</span>
            <span className="inline-block font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              {gallery.kategori}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {gallery.judul}
          </h1>
          {gallery.deskripsi && (
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
              {gallery.deskripsi}
            </p>
          )}
        </div>

        {/* Kanan: share + info singkat */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Bagikan</p>
            <div className="flex gap-2">
              {["facebook", "twitter", "whatsapp", "link"].map((s) => (
                <button key={s}
                  className="size-9 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-colors"
                  title={s}>
                  <span className="material-symbols-outlined text-[16px]">
                    {s === "link" ? "link" : s === "whatsapp" ? "chat" : "share"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Info tambahan */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Informasi</p>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
              {fmt(gallery.tanggal_kegiatan)}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="material-symbols-outlined text-[16px] text-primary">category</span>
              {gallery.kategori}
            </div>
            {fotoTambahan.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-[16px] text-primary">photo_library</span>
                {fotoTambahan.length + 1} foto
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Foto Utama (Hero) ── */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 mb-6 shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gallery.thumbnail_url ?? ""}
          alt={gallery.judul}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* ── Grid Foto Tambahan ── */}
      {fotoTambahan.length > 0 && (
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {fotoTambahan.map((url, idx) => (
              <div key={idx}
                className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 group cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`${gallery.judul} foto ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Kegiatan Terkait ── */}
      {related.length > 0 && (
        <section className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
            Kegiatan Terkait
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.id} href={`/galeri/${r.id}`}
                className="group flex flex-col rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:shadow-md transition-all bg-white dark:bg-slate-900">
                <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.thumbnail_url ?? ""} alt={r.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{r.kategori}</span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {r.judul}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(r.tanggal_kegiatan).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </article>
  );
}
