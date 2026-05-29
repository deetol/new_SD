import type { Ppdb } from "@/lib/api";

interface Props {
  ppdb: Ppdb;
}

export default function PpdbInfo({ ppdb }: Props) {
  const alur        = ppdb.alur_langkah    ?? [];
  const jadwal      = ppdb.jadwal_kegiatan ?? [];
  const persyaratan = ppdb.persyaratan
    ? ppdb.persyaratan.split(/\d+\.\s+/).filter(Boolean)
    : [];

  return (
    <section className="py-20 bg-background-light dark:bg-background-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ── Persyaratan ── */}
        {persyaratan.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">checklist</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Persyaratan Pendaftaran</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {persyaratan.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <span className="shrink-0 size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {item.trim()}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Alur Pendaftaran ── */}
        {alur.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="size-10 rounded-xl bg-accent-gold/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent-gold">route</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Alur Pendaftaran</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alur.map((step, i) => (
                <div key={i} className="relative flex gap-4">
                  {/* Nomor */}
                  <div className="shrink-0 size-9 rounded-full bg-accent-gold text-white flex items-center justify-center text-sm font-black">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                      {step.judul}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {step.deskripsi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Jadwal Kegiatan ── */}
        {jadwal.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-500">event_note</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Jadwal Kegiatan</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 text-left rounded-l-lg">No</th>
                    <th className="px-4 py-3 text-left">Kegiatan</th>
                    <th className="px-4 py-3 text-left">Tanggal</th>
                    <th className="px-4 py-3 text-left">Jam</th>
                    <th className="px-4 py-3 text-left rounded-r-lg">Tempat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {jadwal.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 text-slate-400 font-mono text-xs">{item.no}</td>
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{item.kegiatan}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.tanggal}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{item.jam}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.tempat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
