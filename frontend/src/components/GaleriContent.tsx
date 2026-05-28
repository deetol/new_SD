import Link from "next/link";
import type { Gallery } from "@/lib/api";

// ── Shared card components ────────────────────────────────────────────────────

function GalleryCard({ item }: { item: Gallery }) {
  return (
    <Link
      href={`/galeri/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:shadow-lg transition-all"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.thumbnail_url ?? ""}
          alt={item.judul}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary text-[10px] font-bold uppercase tracking-widest">
            {item.kategori}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            {new Date(item.tanggal_kegiatan).toLocaleDateString("id-ID", {
              day: "numeric", month: "short", year: "numeric",
            })}
          </span>
        </div>
        <h4 className="font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {item.judul}
        </h4>
        {item.deskripsi && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {item.deskripsi}
          </p>
        )}
      </div>
    </Link>
  );
}

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border-l-4 border-primary pl-4 mb-8">
      <h3 className="text-3xl font-bold mb-1 text-slate-900 dark:text-white">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400">{desc}</p>
    </div>
  );
}

// ── Main component — menerima data dari server ────────────────────────────────

interface Props {
  galleries: Gallery[];
}

const SECTIONS: {
  kategori: Gallery["kategori"];
  title: string;
  desc: string;
}[] = [
  {
    kategori: "Ekstrakurikuler",
    title: "Ekstrakurikuler",
    desc: "Pengembangan bakat dan minat siswa melalui berbagai klub seni dan olahraga.",
  },
  {
    kategori: "Galeri Umum",
    title: "Galeri Umum",
    desc: "Melihat lebih dekat lingkungan belajar dan aktivitas harian di sekolah kami.",
  },
  {
    kategori: "Perayaan",
    title: "Perayaan",
    desc: "Momen meriah perayaan hari besar nasional dan acara khusus sekolah.",
  },
  {
    kategori: "Penghargaan",
    title: "Penghargaan",
    desc: "Bukti nyata dedikasi dan prestasi akademik maupun non-akademik siswa kami.",
  },
];

export default function GaleriContent({ galleries = [] }: Props) {
  // Pisahkan per kategori
  const byKategori = SECTIONS.map((s) => ({
    ...s,
    items: (galleries ?? []).filter((g) => g.kategori === s.kategori),
  }));

  const hasAny = (galleries ?? []).length > 0;

  return (
    <>
      {/* Hero Header */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          Galeri Sekolah
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Dokumentasi perjalanan pendidikan, prestasi, dan kegembiraan seluruh warga SD Negeri Selok Awar-Awar 05.
        </p>
      </div>

      {!hasAny && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <span className="material-symbols-outlined text-7xl text-slate-300 dark:text-slate-600 mb-4">
            photo_library
          </span>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            Belum ada foto galeri.
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
            Foto akan muncul setelah admin mengunggah melalui panel admin.
          </p>
        </div>
      )}

      {byKategori.map((section) => {
        if (section.items.length === 0) return null;
        return (
          <section key={section.kategori} className="mb-20">
            <SectionHeader title={section.title} desc={section.desc} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {section.items.map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
