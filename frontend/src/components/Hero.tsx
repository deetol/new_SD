import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/90 via-blue-500/50 to-transparent z-10"></div>
        <img
          alt="SD Negeri 5 Exterior"
          className="w-full h-full object-cover object-top"
          data-alt="Modern primary school building exterior with students"
          src="/bg-sekolah.jpg"
        />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 text-center sm:text-left grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border-2 border-background-dark"></span>
            </span>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Penerimaan Siswa Baru 2026/2027
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight text-balance">
            <span>
              Selamat Datang di <span className="text-primary">SD Negeri</span>
            </span>
            <br />
            <span className="text-primary text-3xl md:text-5xl">Selok Awar-Awar 05</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-xl leading-relaxed text-balance">
            Mewujudkan Generasi Cerdas, Berkarakter, dan Berakhlak Mulia melalui
            pendidikan yang inovatif dan inklusif.
          </p>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <button className="bg-primary text-background-dark px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/30">
              Daftar PPDB Sekarang
            </button>
            <button>
              <Link
                href="/profil"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                Profil Sekolah
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
