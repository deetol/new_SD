import type { ProfilSekolah } from "@/lib/api";

interface Props {
  profil: ProfilSekolah | null;
}

export default function ProfilHistory({ profil }: Props) {
  const sejarah = profil?.sejarah ?? null;
  const namaSekolah = profil?.nama_sekolah ?? "SD Negeri Selok Awar-Awar 05";

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
          Sejarah Singkat
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 text-balance">
          {namaSekolah}
        </h2>
        <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
          {sejarah ? (
            sejarah.split("\n\n").map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))
          ) : (
            <p className="italic text-slate-400 dark:text-slate-500">
              Sejarah sekolah belum diisi.
            </p>
          )}
        </div>
      </div>
      <div className="relative rounded-xl overflow-hidden aspect-video shadow-xl">
        {profil?.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profil.logo_url}
            alt={`Logo ${namaSekolah}`}
            className="w-full h-full object-contain bg-white p-4"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="Foto arsip sejarah sekolah"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGRBQid75kHueaNlS8GZlK3I8kVFR8-5Dm0XvBSilApExfkyvKbEe2DGvGuzrv15xyFhkaEctG3l6jegrHVsVDBStzlcbrtf9iTc84vTb7geZ2q1QZFmKtsqSSrA-xs9VHt-BX1plJ1btZICiwpr_7KzF9Cl7sTaxcoEySEeABeeBQMEFNAtefkk-riFn575nRo5xoj_WkGQ5c3Piv5lgDmNajVWcHUEBj_xa3mojPVy02--Brl0u4Pos1fw9HqUh79k68s4jnBuo"
          />
        )}
      </div>
    </section>
  );
}
