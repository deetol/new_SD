export default function ProfilMisi() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 text-balance">
          Misi Sekolah
        </h2>
        <p className="text-slate-500 mt-2 text-balance">
          Langkah strategis kami dalam mencapai tujuan pendidikan
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all group">
          <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-colors">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
            Spiritualitas
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Menanamkan nilai-nilai keagamaan dan moral dalam setiap aspek
            kegiatan pembelajaran harian.
          </p>
        </div>
        <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all group">
          <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-colors">
            <span className="material-symbols-outlined">lightbulb</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
            Kecerdasan
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Mengembangkan potensi akademik siswa melalui metode pembelajaran yang
            inovatif dan partisipatif.
          </p>
        </div>
        <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all group">
          <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-colors">
            <span className="material-symbols-outlined">construction</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
            Keterampilan
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Membekali siswa dengan keterampilan hidup dan kreativitas untuk
            menghadapi tantangan masa depan.
          </p>
        </div>
        <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all group">
          <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-colors">
            <span className="material-symbols-outlined">nature_people</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
            Lingkungan
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Membudayakan sikap peduli lingkungan melalui program Adiwiyata dan
            pengelolaan sekolah hijau.
          </p>
        </div>
        <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all group">
          <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-colors">
            <span className="material-symbols-outlined">groups</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
            Sosial
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Menumbuhkan jiwa sosial, kerjasama, dan toleransi antar warga sekolah
            serta masyarakat luas.
          </p>
        </div>
        <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all group">
          <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-colors">
            <span className="material-symbols-outlined">devices</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
            Teknologi
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Mengintegrasikan teknologi informasi dalam tata kelola dan proses
            pembelajaran sekolah.
          </p>
        </div>
      </div>
    </section>
  );
}
