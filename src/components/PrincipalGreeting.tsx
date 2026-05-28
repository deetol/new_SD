export default function PrincipalGreeting() {
  return (
    <section className="py-24 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center border border-primary/5">
          <div className="w-full lg:w-2/5 aspect-[4/5] lg:aspect-auto h-full min-h-[400px]">
            <img
              alt="Kepala Sekolah"
              className="w-full h-full object-cover"
              data-alt="Professional portrait of a friendly school principal"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC-QPqwccnxBMHGxdAVn0hP7khTGhDLLOj6mF5Es4p_bdU1obs0F5tMpTGIiDCNSBq3DuFR44y02-4M29NY2_EC917zoKzWmiFWnYjtjJZjoXRJLrCbWh9f8m5J47kUE-ZNRS75Cc0yTLqMaYXe299Fia1wu6IIRI5xLvknVjiK8HoF2CzZ75tx1OjJVY4-MbhvQh9wilC-c8H7SUK_NPAEL3-BtcQxSyN8B9g3Ad97JfG-iSjZzwph64D1Odpy2g6Szbfl36UNlc"
            />
          </div>
          <div className="w-full lg:w-3/5 p-8 lg:p-16 space-y-6">
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
              Sambutan
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-balance">
              Pesan dari Kepala Sekolah
            </h2>
            <p className="text-slate-600 dark:text-slate-300 italic text-lg leading-relaxed relative">
              <span className="material-symbols-outlined absolute -top-4 -left-6 text-primary/20 text-6xl">
                format_quote
              </span>
              &quot;Selamat datang di official website SD Negeri Selok Awar-Awar 05. Kami
              berkomitmen untuk memberikan pendidikan terbaik bagi putra-putri
              anda. Di sini, kami tidak hanya mengajar, tetapi membentuk
              karakter yang tangguh untuk masa depan yang lebih cerah.&quot;
            </p>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                Drs. Ahmad Jaelani, M.Pd.
              </h4>
              <p className="text-primary font-medium">
                Kepala SD Negeri Selok Awar-Awar 05
              </p>
            </div>
            <button className="flex items-center gap-2 text-slate-900 dark:text-white font-bold hover:text-primary transition-colors group">
              Baca Selengkapnya
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
