import type { Ppdb } from "@/lib/api";
import type { PpdbStatus } from "@/app/ppdb/page";

interface Props {
  status: PpdbStatus;
  ppdb: Ppdb | null;
}

const CONFIG: Record<string, { icon: string; title: string; desc: string }> = {
  nonaktif: {
    icon:  "pause_circle",
    title: "PPDB Sedang Tidak Aktif",
    desc:  "PPDB saat ini dinonaktifkan sementara oleh admin sekolah. Informasi pendaftaran akan diumumkan kembali segera.",
  },
  ditutup: {
    icon:  "event_busy",
    title: "Pendaftaran Telah Ditutup",
    desc:  "Periode pendaftaran untuk tahun ajaran ini telah berakhir. Pantau informasi PPDB berikutnya melalui website dan media sosial kami.",
  },
  tidak_ada: {
    icon:  "school",
    title: "PPDB Belum Dibuka",
    desc:  "Saat ini belum ada periode penerimaan peserta didik baru yang aktif. Pantau terus informasi terbaru dari sekolah kami.",
  },
};

export default function PpdbTutup({ status, ppdb }: Props) {
  const cfg = CONFIG[status] ?? CONFIG["tidak_ada"];

  return (
    <section className="py-24 bg-white dark:bg-background-dark">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="size-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-slate-400 text-5xl">{cfg.icon}</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4">
          {cfg.title}
        </h2>

        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
          {cfg.desc}
        </p>

        {/* Tampilkan info tahun ajaran jika ada */}
        {ppdb && (
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-8">
            PPDB terakhir: <span className="font-semibold">{ppdb.judul}</span>
            {status === "ditutup" && (
              <> · Ditutup {new Date(ppdb.tanggal_tutup).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</>
            )}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href="https://www.facebook.com/sedan.karima"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <svg className="size-5 fill-white" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
            Ikuti Facebook Kami
          </a>
          <a
            href="https://wa.me/6282139817999?text=Halo%2C%20saya%20ingin%20menanyakan%20informasi%20PPDB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
