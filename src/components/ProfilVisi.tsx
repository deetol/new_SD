export default function ProfilVisi() {
  return (
    <section className="relative py-16 mb-16 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-primary/10 -z-10"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/30 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/30 rounded-full blur-3xl opacity-50"></div>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center text-center">
          <div className="mb-6 h-20 w-20 rounded-2xl bg-primary flex items-center justify-center text-background-dark shadow-lg shadow-primary/40">
            <span className="material-symbols-outlined text-4xl">
              visibility
            </span>
          </div>
          <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-4 text-balance">
            Visi Kami
          </h2>
          <blockquote className="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100 italic leading-snug text-balance">
            &quot;Terwujudnya generasi yang beriman, cerdas, terampil, dan
            berwawasan lingkungan.&quot;
          </blockquote>
          <div className="mt-8 h-1 w-24 bg-primary rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
