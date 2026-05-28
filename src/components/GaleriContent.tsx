import Link from "next/link";
import { galleryData } from "@/data/galeri";

export default function GaleriContent() {
  // Section 1: Ekstrakurikuler (Seni & Budaya, Olahraga)
  const ekstrakurikulerItems = galleryData.filter(
    (item) => item.id === "tari-tradisional" || item.id === "lomba-estafet"
  );

  // Section 2: Galeri Umum (Upacara, Akademik)
  const generalItems = galleryData.filter(
    (item) => item.id === "upacara-senin" || item.id === "hari-guru" || item.id === "pameran-lukisan"
  );

  // Section 3: Perayaan (Highlight / Perayaan Kemerdekaan)
  const perayaanItems = galleryData.filter(
    (item) => item.id === "hari-kemerdekaan-79"
  );

  // Section 4: Penghargaan (Prestasi)
  const penghargaanItems = galleryData.filter(
    (item) => item.category === "Prestasi"
  );

  return (
    <>
      {/* Hero Header */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-5xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
          Galeri Sekolah
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Dokumentasi perjalanan pendidikan, prestasi, dan kegembiraan seluruh warga SD Negeri Selok Awar-Awar 05.
        </p>
      </div>

      {/* Section 1: Ekstrakurikuler */}
      <section className="mb-20">
        <div className="border-l-4 border-primary pl-4 mb-8">
          <h3 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">Ekstrakurikuler</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Pengembangan bakat dan minat siswa melalui berbagai klub seni dan olahraga.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ekstrakurikulerItems.map((item) => (
            <Link
              key={item.id}
              href={`/galeri/${item.id}`}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all block"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={item.image}
                />
              </div>
              <div className="p-4 flex-grow">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1 block">
                  {item.category}
                </span>
                <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">{item.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {item.content ? item.content[0] : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 2: Galeri Umum */}
      <section className="mb-20">
        <div className="border-l-4 border-primary pl-4 mb-8">
          <h3 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">Galeri Umum</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Melihat lebih dekat lingkungan belajar dan aktivitas harian di sekolah kami.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {generalItems.map((item) => (
            <Link
              key={item.id}
              href={`/galeri/${item.id}`}
              className="group relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm aspect-square border border-slate-200 dark:border-slate-800 block"
            >
              <img
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={item.image}
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                <span className="text-white font-semibold text-sm">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 3: Perayaan */}
      <section className="mb-20">
        <div className="border-l-4 border-primary pl-4 mb-8">
          <h3 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">Perayaan</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Momen meriah perayaan hari besar nasional dan acara khusus sekolah.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {perayaanItems.map((item) => (
            <Link
              key={item.id}
              href={`/galeri/${item.id}`}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all block"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={item.image}
                />
              </div>
              <div className="p-4 flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase">
                    Highlight
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.date}</span>
                </div>
                <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">{item.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {item.content ? item.content[0] : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 4: Penghargaan */}
      <section className="mb-20">
        <div className="border-l-4 border-primary pl-4 mb-8">
          <h3 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">Penghargaan</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Bukti nyata dedikasi dan prestasi akademik maupun non-akademik siswa kami.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {penghargaanItems.map((item) => (
            <Link
              key={item.id}
              href={`/galeri/${item.id}`}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all block cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={item.image}
                />
              </div>
              <div className="p-4 flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.date}</span>
                </div>
                <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">{item.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {item.content ? item.content[0] : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
