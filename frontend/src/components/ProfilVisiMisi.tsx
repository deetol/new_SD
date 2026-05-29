import Image from "next/image";

const misiItems = [
  {
    icon: "auto_awesome",
    judul: "Spiritualitas",
    desc: "Menanamkan nilai-nilai keagamaan dan moral dalam setiap aspek kegiatan pembelajaran harian.",
  },
  {
    icon: "lightbulb",
    judul: "Kecerdasan",
    desc: "Mengembangkan potensi akademik siswa melalui metode pembelajaran yang inovatif dan partisipatif.",
  },
  {
    icon: "construction",
    judul: "Keterampilan",
    desc: "Membekali siswa dengan keterampilan hidup dan kreativitas untuk menghadapi tantangan masa depan.",
  },
  {
    icon: "nature_people",
    judul: "Lingkungan",
    desc: "Membudayakan sikap peduli lingkungan melalui program Adiwiyata dan pengelolaan sekolah hijau.",
  },
  {
    icon: "groups",
    judul: "Sosial",
    desc: "Menumbuhkan jiwa sosial, kerjasama, dan toleransi antar warga sekolah serta masyarakat luas.",
  },
  {
    icon: "devices",
    judul: "Teknologi",
    desc: "Mengintegrasikan teknologi informasi dalam tata kelola dan proses pembelajaran sekolah.",
  },
];

export default function ProfilVisiMisi() {
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
        <blockquote className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white italic leading-snug max-w-3xl mx-auto">
          &quot;Terwujudnya generasi yang beriman, cerdas, terampil, dan
          berwawasan lingkungan.&quot;
        </blockquote>
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
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Dalam mencapai tujuan pendidikan yang berkualitas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {misiItems.map((item, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="mb-4 size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                {item.judul}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
