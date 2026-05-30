import Link from "next/link";
import Image from "next/image";
import { getStatistics, type Gallery } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

// Stats will be generated dynamically based on backend data

async function getFeaturedGalleries(): Promise<Gallery[]> {
  try {
    const res = await fetch(`${API_URL}/galleries`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items = data.data ? data.data : data;
    return Array.isArray(items) ? items.slice(0, 3) : [];
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return [];
  }
}

export default async function Gallery() {
  const [featured, statsData] = await Promise.all([
    getFeaturedGalleries(),
    getStatistics()
  ]);

  const stats = [
    { value: `${statsData?.prestasi?.internasional || 2}+`, label: "Prestasi Internasional" },
    { value: `${statsData?.prestasi?.nasional || 5}+`, label: "Prestasi Nasional" },
    { value: `${statsData?.prestasi?.provinsi || 12}+`, label: "Prestasi Provinsi dan Regional" },
  ];

  return (
    <section className="py-24 bg-white dark:bg-background-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Beberapa Informasi Dari Sekolah Kami
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white max-w-5xl leading-tight">
            Find the best information about our school in the Extracurricular Activities, Gallery, Celebrations, and Awards sections.
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* ── Kiri: daftar artikel galeri dari API ── */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {featured.length === 0 ? (
              <div className="py-16 text-center">
                <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-3 block">
                  photo_library
                </span>
                <p className="text-slate-400 dark:text-slate-500 text-sm">
                  Belum ada foto galeri.
                </p>
              </div>
            ) : (
              featured.map((item) => (
                <Link
                  key={item.id}
                  href={`/galeri/${item.id}`}
                  className="group flex gap-5 py-7 first:pt-0 last:pb-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 -mx-4 px-4 rounded-xl transition-colors"
                >
                  {/* Thumbnail — lebih besar seperti referensi */}
                  <div className="relative shrink-0 w-[220px] h-[130px] rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700">
                    <Image
                      src={item.thumbnail_url || "https://ui-avatars.com/api/?name=Foto"}
                      alt={item.judul}
                      fill
                      sizes="220px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-3 group-hover:text-primary transition-colors mb-2">
                      {item.judul}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
                      {new Date(item.tanggal_kegiatan).toLocaleDateString("id-ID", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </p>
                    {item.deskripsi && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {item.deskripsi}
                      </p>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* ── Kanan: stat prestasi ── */}
          <div className="bg-accent-gold rounded-2xl p-8 text-white flex flex-col gap-4 sticky top-10">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">
              Prestasi Siswa SDN Selok Awar-Awar 05
            </p>
            {stats.map((s) => (
              <div key={s.label} className="border-b border-white/20 pb-5 last:border-0 last:pb-0">
                <p className="text-5xl font-black text-white leading-none mb-1">{s.value}</p>
                <p className="text-sm text-white/80">{s.label}</p>
              </div>
            ))}
            <Link
              href="/galeri"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              Selengkapnya
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
