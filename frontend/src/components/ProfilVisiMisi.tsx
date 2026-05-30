import type { ProfilSekolah } from "@/lib/api";
import Image from "next/image";

// Icon mapping untuk poin-poin misi yang diparsing dari teks
const MISI_ICONS = [
  "auto_awesome",
  "lightbulb",
  "construction",
  "nature_people",
  "groups",
  "devices",
  "star",
  "favorite",
  "school",
  "emoji_events",
];

interface Props {
  profil: ProfilSekolah | null;
}

export default function ProfilVisiMisi({ profil }: Props) {
  // Parse misi: tiap baris non-kosong jadi satu poin
  const misiLines = profil?.misi
    ? profil.misi
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
    : [];

  const visiText = profil?.visi ?? null;

  return (
    <section className="mb-20">

      {/* ── Poster Visi Misi ── */}
      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
          <Image
            src="/visi_misi.png"
            alt="Visi dan Misi SD Negeri Selok Awar-Awar 05"
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* ── Detail Visi ── */}
      <div className="mb-12 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-8 md:p-10 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          Visi Kami
        </div>
        {visiText ? (
          <blockquote className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white italic leading-snug max-w-3xl mx-auto">
            &quot;{visiText}&quot;
          </blockquote>
        ) : (
          <p className="text-slate-400 dark:text-slate-500 italic">Visi belum diisi.</p>
        )}
        <div className="mt-6 h-1 w-20 bg-primary rounded-full mx-auto" />
      </div>

      {/* ── Detail Misi ── */}
      <div>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent-gold/10 text-accent-gold text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <span className="material-symbols-outlined text-[16px]">route</span>
            Misi Sekolah
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Langkah Strategis Kami
          </h2>
          {profil?.visi_misi_pengantar ? (
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {profil.visi_misi_pengantar}
            </p>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Dalam mencapai tujuan pendidikan yang berkualitas
            </p>
          )}
        </div>

        {misiLines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {misiLines.map((line, i) => (
              <div
                key={i}
                className="group p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="mb-4 size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[22px]">
                    {MISI_ICONS[i % MISI_ICONS.length]}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {line}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400 dark:text-slate-500 italic">
            Misi belum diisi.
          </p>
        )}
      </div>

    </section>
  );
}
