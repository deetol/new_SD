import Link from "next/link";
import Image from "next/image";
import type { Gallery } from "@/lib/api";
import ShareButtons from "@/components/ShareButtons";

interface Props {
  gallery: Gallery;
  related: Gallery[];
  pageUrl: string;
}

export default function GaleriDetailContent({ gallery, related, pageUrl }: Props) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });

  const fmtShort = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
    });

  const fotoTambahan = gallery.foto_tambahan_urls ?? [];

  return (
    <article className="w-full max-w-[1100px]">

      {/* ── Back ── */}
      <div className="mb-5">
        <Link
          href="/galeri"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Kembali ke Galeri
        </Link>
      </div>

      {/* ── Meta: tanggal + kategori ── */}
      <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">Waktu Publikasi :</span>
          <span className="ml-2">{fmt(gallery.tanggal_kegiatan)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary">category</span>
          <span className="font-semibold text-primary">{gallery.kategori}</span>
        </div>
      </div>

      {/* ── Judul ── */}
      <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-6">
        {gallery.judul}
      </h1>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">

        {/* ════ Kiri: konten utama ════ */}
        <div>
          {/* Foto utama */}
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 mb-6 shadow-lg">
            <Image
              src={gallery.thumbnail_url || "https://ui-avatars.com/api/?name=Foto"}
              alt={gallery.judul}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          {/* Deskripsi */}
          {gallery.deskripsi && (
            <div className="mb-8 space-y-4">
              {gallery.deskripsi.split("\n").filter(Boolean).map((para, i) => (
                <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
                  {para}
                </p>
              ))}
            </div>
          )}

          {/* Grid foto tambahan */}
          {fotoTambahan.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Foto Kegiatan
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {fotoTambahan.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 group cursor-pointer"
                  >
                    <Image
                      src={url || "https://ui-avatars.com/api/?name=Foto"}
                      alt={`${gallery.judul} foto ${idx + 2}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ════ Kanan: sidebar ════ */}
        <aside className="space-y-6">

          {/* Share */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              Bagikan :
            </p>
            <ShareButtons url={pageUrl} judul={gallery.judul} />
          </div>

          {/* Informasi lainnya (related) */}
          {related.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
                Informasi Lainnya :
              </p>
              <div className="space-y-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/galeri/${r.id}`}
                    className="group flex gap-3 items-start hover:bg-white dark:hover:bg-slate-800 -mx-2 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    {/* Thumbnail kecil */}
                    <div className="relative shrink-0 w-16 h-12 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700">
                      <Image
                        src={r.thumbnail_url || "https://ui-avatars.com/api/?name=Foto"}
                        alt={r.judul}
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* Judul */}
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 line-clamp-3 leading-snug group-hover:text-primary transition-colors">
                      {r.judul}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Kategori Informasi */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
              Kategori Informasi :
            </p>
            <div className="flex flex-col gap-1.5">
              {(["Ekstrakurikuler", "Galeri Umum", "Perayaan", "Penghargaan"] as const).map((kat) => (
                <Link
                  key={kat}
                  href={`/galeri?kategori=${encodeURIComponent(kat)}`}
                  className={`text-sm px-1 py-0.5 rounded transition-colors ${
                    gallery.kategori === kat
                      ? "font-bold text-primary"
                      : "text-slate-500 dark:text-slate-400 hover:text-primary"
                  }`}
                >
                  {gallery.kategori === kat && (
                    <span className="mr-1">›</span>
                  )}
                  {kat}
                </Link>
              ))}
            </div>
          </div>

        </aside>
      </div>

    </article>
  );
}
