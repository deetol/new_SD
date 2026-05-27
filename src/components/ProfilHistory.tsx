export default function ProfilHistory() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
          Sejarah Singkat
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 text-balance">
          Dedikasi Pendidikan Sejak 1985
        </h2>
        <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
          <p>
            SD Negeri Selok Awar-Awar 05 didirikan pada tahun 1985 dengan semangat untuk
            memberikan akses pendidikan berkualitas bagi masyarakat sekitar.
            Berawal dari gedung sederhana dengan tiga ruang kelas, sekolah ini
            terus bertransformasi seiring berjalannya waktu.
          </p>
          <p>
            Hingga kini, kami telah meluluskan ribuan alumni yang berkontribusi
            dalam berbagai bidang di tingkat nasional maupun internasional.
            Komitmen kami tetap sama: mengedepankan integritas, kreativitas, dan
            karakter.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="text-2xl font-bold text-primary">38+</div>
            <div className="text-sm text-slate-500">Tahun Mengabdi</div>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-slate-500">Siswa Aktif</div>
          </div>
        </div>
      </div>
      <div className="relative rounded-xl overflow-hidden aspect-video shadow-xl">
        <img
          alt="Foto arsip sejarah sekolah"
          className="w-full h-full object-cover"
          data-alt="Koleksi piala prestasi siswa sekolah"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGRBQid75kHueaNlS8GZlK3I8kVFR8-5Dm0XvBSilApExfkyvKbEe2DGvGuzrv15xyFhkaEctG3l6jegrHVsVDBStzlcbrtf9iTc84vTb7geZ2q1QZFmKtsqSSrA-xs9VHt-BX1plJ1btZICiwpr_7KzF9Cl7sTaxcoEySEeABeeBQMEFNAtefkk-riFn575nRo5xoj_WkGQ5c3Piv5lgDmNajVWcHUEBj_xa3mojPVy02--Brl0u4Pos1fw9HqUh79k68s4jnBuo"
        />
      </div>
    </section>
  );
}
