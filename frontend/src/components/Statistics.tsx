import { getStatistics } from "@/lib/api";

export default async function Statistics() {
  const stats = await getStatistics();

  return (
    <section className="py-4 bg-blue-600 dark:bg-background-dark/50 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-white mb-4">
              groups
            </span>
            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight">
              {stats?.siswa_aktif || 150}+
            </h3>
            <p className="text-white/90 font-medium text-lg">
              Siswa Aktif
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-white mb-4">
              co_present
            </span>
            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight">
              {stats?.guru_ahli || 20}+
            </h3>
            <p className="text-white/90 font-medium text-lg">
              Guru Ahli
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-white mb-4">
              history_edu
            </span>
            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight">
              {stats?.tahun_mengabdi || 30}+
            </h3>
            <p className="text-white/90 font-medium text-lg">
              Tahun Mengabdi
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-white mb-4">
              verified
            </span>
            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight">
              {stats?.tingkat_kelulusan || 95}%
            </h3>
            <p className="text-white/90 font-medium text-lg">
              Tingkat Kelulusan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
