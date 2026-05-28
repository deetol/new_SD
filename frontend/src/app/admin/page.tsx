"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { adminFetch } from "@/lib/fetchAdmin";
import Link from "next/link";

interface Stats {
  teachers: number;
  galleries: number;
  ppdb: number;
  pendaftar: number;
}

const menuCards = [
  { label: "Guru",           href: "/admin/guru",      icon: "group",         desc: "Kelola data guru & staf" },
  { label: "Galeri",         href: "/admin/galeri",    icon: "photo_library", desc: "Upload & kelola foto kegiatan" },
  { label: "PPDB",           href: "/admin/ppdb",      icon: "assignment",    desc: "Pengaturan penerimaan siswa baru" },
  { label: "Pendaftar",      href: "/admin/pendaftar", icon: "how_to_reg",    desc: "Daftar & status pendaftar PPDB" },
  { label: "Profil Sekolah", href: "/admin/profil",    icon: "school",        desc: "Informasi & identitas sekolah" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  const loadStats = useCallback(async () => {
    try {
      const [teachers, galleries, ppdb, pendaftar] = await Promise.all([
        adminFetch<unknown[]>("/teachers").catch(() => []),
        adminFetch<unknown[]>("/galleries").catch(() => []),
        adminFetch<unknown[]>("/ppdb").catch(() => []),
        adminFetch<unknown[]>("/pendaftar-ppdb").catch(() => []),
      ]);
      setStats({
        teachers: (teachers as unknown[]).length,
        galleries: (galleries as unknown[]).length,
        ppdb: (ppdb as unknown[]).length,
        pendaftar: (pendaftar as unknown[]).length,
      });
    } catch {
      // stats opsional, tidak perlu error state
    }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const statCards = [
    { label: "Total Guru",      value: stats?.teachers,  icon: "group",         color: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Foto Galeri",     value: stats?.galleries, icon: "photo_library", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { label: "PPDB Aktif",      value: stats?.ppdb,      icon: "assignment",    color: "text-amber-500",  bg: "bg-amber-50 dark:bg-amber-900/20" },
    { label: "Total Pendaftar", value: stats?.pendaftar, icon: "how_to_reg",    color: "text-green-500",  bg: "bg-green-50 dark:bg-green-900/20" },
  ];

  return (
    <AdminShell title="Dashboard">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex items-center gap-4"
          >
            <div className={`shrink-0 size-12 rounded-xl ${s.bg} flex items-center justify-center`}>
              <span className={`material-symbols-outlined text-2xl ${s.color}`}>{s.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {s.value ?? <span className="text-slate-300 dark:text-slate-600 text-lg">—</span>}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Cards */}
      <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
        Kelola Konten
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuCards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex items-start gap-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 transition-all group"
          >
            <span className="material-symbols-outlined text-3xl text-primary mt-0.5 group-hover:scale-110 transition-transform">
              {c.icon}
            </span>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{c.label}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{c.desc}</p>
            </div>
            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 ml-auto self-center text-[18px]">
              chevron_right
            </span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
