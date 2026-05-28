export default function CallToAction() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto bg-primary rounded-[2rem] p-8 md:p-16 relative overflow-hidden group">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 size-96 bg-background-dark/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-background-dark">
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-balance">
              Siap Bergabung Bersama Kami?
            </h2>
            <p className="text-xl font-medium opacity-90 max-w-xl text-balance">
              Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 telah
              dibuka. Segera amankan kursi Anda!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="bg-background-dark text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all whitespace-nowrap">
              Daftar Sekarang
            </button>
            <button className="bg-white/30 backdrop-blur-sm text-background-dark border border-background-dark/10 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/40 transition-all">
              Panduan PPDB
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
