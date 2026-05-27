export default function Statistics() {
  return (
    <section className="py-20 bg-white dark:bg-background-dark/50 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center p-8 rounded-2xl bg-background-light dark:bg-background-dark border border-primary/10 shadow-sm hover:shadow-primary/5 transition-shadow">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">
              groups
            </span>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-1">
              150+
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Siswa Aktif
            </p>
          </div>
          <div className="flex flex-col items-center p-8 rounded-2xl bg-background-light dark:bg-background-dark border border-primary/10 shadow-sm hover:shadow-primary/5 transition-shadow">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">
              co_present
            </span>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-1">
              20+
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Guru Ahli
            </p>
          </div>
          <div className="flex flex-col items-center p-8 rounded-2xl bg-background-light dark:bg-background-dark border border-primary/10 shadow-sm hover:shadow-primary/5 transition-shadow">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">
              history_edu
            </span>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-1">
              30+
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Tahun Mengabdi
            </p>
          </div>
          <div className="flex flex-col items-center p-8 rounded-2xl bg-background-light dark:bg-background-dark border border-primary/10 shadow-sm hover:shadow-primary/5 transition-shadow">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">
              verified
            </span>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-1">
              95%
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Tingkat Kelulusan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
