import Link from "next/link";
import type { ProfilSekolah } from "@/lib/api";

interface Props {
  profil: ProfilSekolah | null;
}

export default function ProfilHero({ profil }: Props) {
  const namaSekolah = profil?.nama_sekolah ?? "SD Negeri Selok Awar-Awar 05";
  const pengantar   = profil?.pengantar ?? "Menciptakan lingkungan belajar yang inspiratif dan berwawasan lingkungan untuk generasi masa depan.";

  return (
    <>
      <nav className="flex items-center gap-2 mb-8 text-sm font-medium overflow-x-auto whitespace-nowrap">
        <Link
          href="/"
          className="text-primary hover:opacity-80 flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-lg">home</span> Home
        </Link>
        <span className="text-slate-400 dark:text-slate-600">/</span>
        <span className="text-slate-900 dark:text-slate-100">Profil Sekolah</span>
      </nav>
      <section className="relative rounded-xl overflow-hidden mb-12 h-64 md:h-80 lg:h-96">
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{ backgroundImage: "url('/bg-sekolah.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 text-balance">
            Profil {namaSekolah}
          </h1>
          <p className="text-slate-200 max-w-2xl font-light text-balance">
            {pengantar}
          </p>
        </div>
      </section>
    </>
  );
}
