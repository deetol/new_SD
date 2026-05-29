import type { Ppdb } from "@/lib/api";
import type { PpdbStatus } from "@/app/ppdb/page";

interface Props {
  ppdb: Ppdb | null;
  status: PpdbStatus;
}

const STATUS_CONFIG: Record<PpdbStatus, {
  dot: string;
  ping: boolean;
  badge: string;
  badgeBg: string;
  desc: string;
}> = {
  aktif: {
    dot:     "bg-primary",
    ping:    true,
    badge:   "PPDB Sedang Dibuka",
    badgeBg: "bg-primary/20 border-primary/30 text-primary",
    desc:    "Daftarkan putra-putri Anda sekarang dan bergabunglah bersama keluarga besar SD Negeri Selok Awar-Awar 05.",
  },
  belum_dibuka: {
    dot:     "bg-amber-400",
    ping:    false,
    badge:   "PPDB Akan Segera Dibuka",
    badgeBg: "bg-amber-400/20 border-amber-400/30 text-amber-400",
    desc:    "Pendaftaran peserta didik baru akan segera dibuka. Persiapkan dokumen Anda dari sekarang.",
  },
  ditutup: {
    dot:     "bg-red-400",
    ping:    false,
    badge:   "Pendaftaran Telah Ditutup",
    badgeBg: "bg-red-400/20 border-red-400/30 text-red-400",
    desc:    "Periode pendaftaran untuk tahun ajaran ini telah berakhir. Pantau informasi PPDB berikutnya.",
  },
  nonaktif: {
    dot:     "bg-slate-500",
    ping:    false,
    badge:   "PPDB Tidak Aktif",
    badgeBg: "bg-slate-500/20 border-slate-500/30 text-slate-400",
    desc:    "PPDB saat ini sedang tidak aktif. Informasi pendaftaran akan diumumkan lebih lanjut.",
  },
  tidak_ada: {
    dot:     "bg-slate-500",
    ping:    false,
    badge:   "Informasi PPDB",
    badgeBg: "bg-slate-500/20 border-slate-500/30 text-slate-400",
    desc:    "Informasi penerimaan peserta didik baru akan segera diumumkan. Pantau terus website kami.",
  },
};

export default function PpdbHero({ ppdb, status }: Props) {
  const cfg = STATUS_CONFIG[status];

  return (
    <section className="relative bg-gradient-to-br from-background-dark via-slate-900 to-accent-gold/20 text-white overflow-hidden">
      {/* Background blur */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 size-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-10 right-10 size-96 rounded-full bg-accent-gold blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">

          {/* ── Status Badge ── */}
          <div className={`inline-flex items-center gap-2 border px-4 py-1.5 rounded-full text-sm font-bold mb-6 ${cfg.badgeBg}`}>
            <span className="relative flex size-2">
              {cfg.ping && (
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${cfg.dot}`} />
              )}
              <span className={`relative inline-flex size-2 rounded-full ${cfg.dot}`} />
            </span>
            {ppdb ? `${cfg.badge} ${ppdb.tahun_ajaran}` : cfg.badge}
          </div>

          {/* ── Judul ── */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            {ppdb?.judul ?? "Penerimaan Peserta Didik Baru"}
          </h1>

          {/* ── Deskripsi ── */}
          <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
            {ppdb?.deskripsi ?? cfg.desc}
          </p>

          {/* ── Info cards — hanya tampil jika ada data ── */}
          {ppdb && (
            <div className="flex flex-wrap gap-4">
              {/* Periode */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3">
                <span className="material-symbols-outlined text-primary text-xl">calendar_month</span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Periode Pendaftaran</p>
                  <p className="text-sm font-bold">
                    {new Date(ppdb.tanggal_buka).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                    {" — "}
                    {new Date(ppdb.tanggal_tutup).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>

              {/* Kuota */}
              {ppdb.kuota && (
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3">
                  <span className="material-symbols-outlined text-primary text-xl">groups</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">Kuota</p>
                    <p className="text-sm font-bold">{ppdb.kuota} Siswa</p>
                  </div>
                </div>
              )}

              {/* Status label tambahan untuk nonaktif/ditutup */}
              {(status === "nonaktif" || status === "ditutup" || status === "belum_dibuka") && (
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3">
                  <span className="material-symbols-outlined text-amber-400 text-xl">info</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">Status</p>
                    <p className="text-sm font-bold">
                      {status === "nonaktif"     && "Dinonaktifkan Admin"}
                      {status === "ditutup"      && "Pendaftaran Ditutup"}
                      {status === "belum_dibuka" && "Belum Dibuka"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
