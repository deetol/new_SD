"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { adminFetch } from "@/lib/fetchAdmin";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface Stats {
  teachers: number;
  galleries: number;
  ppdb: number;
  pendaftar: number;
}

function extractTotal(data: unknown): number {
  if (Array.isArray(data)) return data.length;
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    if (typeof d.meta === "object" && d.meta !== null) {
      const meta = d.meta as Record<string, unknown>;
      if (typeof meta.total === "number") return meta.total;
    }
    if (typeof d.total === "number") return d.total;
    if (Array.isArray(d)) return (d as unknown[]).length;
  }
  return 0;
}

const menuCards = [
  {
    label: "Guru & Staf",
    href:  "/admin/guru",
    icon:  "group",
    desc:  "Tambah, edit, dan kelola data guru",
    color: "bg-blue-500",
    light: "bg-blue-50 dark:bg-blue-900/20",
    text:  "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Galeri Foto",
    href:  "/admin/galeri",
    icon:  "photo_library",
    desc:  "Upload dan kelola foto kegiatan",
    color: "bg-purple-500",
    light: "bg-purple-50 dark:bg-purple-900/20",
    text:  "text-purple-600 dark:text-purple-400",
  },
  {
    label: "Pengaturan PPDB",
    href:  "/admin/ppdb",
    icon:  "assignment",
    desc:  "Atur jadwal dan info penerimaan",
    color: "bg-amber-500",
    light: "bg-amber-50 dark:bg-amber-900/20",
    text:  "text-amber-600 dark:text-amber-400",
  },
  {
    label: "Data Pendaftar",
    href:  "/admin/pendaftar",
    icon:  "how_to_reg",
    desc:  "Lihat dan verifikasi pendaftar PPDB",
    color: "bg-green-500",
    light: "bg-green-50 dark:bg-green-900/20",
    text:  "text-green-600 dark:text-green-400",
  },
  {
    label: "Profil Sekolah",
    href:  "/admin/profil",
    icon:  "school",
    desc:  "Update identitas dan konten profil",
    color: "bg-primary",
    light: "bg-primary/10",
    text:  "text-primary",
  },
];

function greeting(): string {
  const h = new Date().getHours();
  if (h < 11) return "Selamat Pagi";
  if (h < 15) return "Selamat Siang";
  if (h < 18) return "Selamat Sore";
  return "Selamat Malam";
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);

  const loadStats = useCallback(async () => {
    try {
      const [teachers, galleries, ppdb, pendaftar] = await Promise.all([
        adminFetch<unknown>("/teachers",       { _raw: true }).catch(() => null),
        adminFetch<unknown>("/galleries",      { _raw: true }).catch(() => null),
        adminFetch<unknown>("/ppdb",           { _raw: true }).catch(() => null),
        adminFetch<unknown>("/pendaftar-ppdb", { _raw: true }).catch(() => null),
      ]);
      setStats({
        teachers:  extractTotal(teachers),
        galleries: extractTotal(galleries),
        ppdb:      extractTotal(ppdb),
        pendaftar: extractTotal(pendaftar),
      });
    } catch {
      // stats opsional
    }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const statCards = [
    { label: "Total Guru",      value: stats?.teachers,  icon: "group",         color: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-900/20",     border: "border-blue-100 dark:border-blue-900/40" },
    { label: "Foto Galeri",     value: stats?.galleries, icon: "photo_library", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-100 dark:border-purple-900/40" },
    { label: "Data PPDB",       value: stats?.ppdb,      icon: "assignment",    color: "text-amber-500",  bg: "bg-amber-50 dark:bg-amber-900/20",   border: "border-amber-100 dark:border-amber-900/40" },
    { label: "Total Pendaftar", value: stats?.pendaftar, icon: "how_to_reg",    color: "text-green-500",  bg: "bg-green-50 dark:bg-green-900/20",   border: "border-green-100 dark:border-green-900/40" },
  ];

  return (
    <AdminShell title="Dashboard">

      {/* ── Welcome banner ── */}
      <div className="relative overflow-hidden rounded-2xl bg-background-dark mb-6 px-6 py-6 md:px-8 md:py-7">
        {/* Decorative blobs */}
        <div className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-30px] left-[30%] w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-primary text-sm font-semibold mb-1">
              {greeting()}, {user?.name ?? "Admin"} 👋
            </p>
            <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
              Panel Admin SDN Selok Awar-Awar 05
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Kelola konten website sekolah dari sini.
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-primary/15 hover:bg-primary/25 border border-primary/30 text-primary text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            Lihat Website
          </a>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <div
            key={s.label}
            className={`bg-white dark:bg-slate-900 rounded-2xl border ${s.border} p-5`}
          >
            <div className={`size-11 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <span className={`material-symbols-outlined text-[22px] ${s.color}`}>{s.icon}</span>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">
              {s.value !== undefined
                ? s.value
                : <span className="text-slate-300 dark:text-slate-700 text-xl">—</span>
              }
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Menu cards ── */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Kelola Konten
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuCards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all"
          >
            {/* Colored top accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${c.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

            <div className="flex items-start gap-4">
              <div className={`shrink-0 size-11 rounded-xl ${c.light} flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-[22px] ${c.text}`}>{c.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 dark:text-white text-sm">{c.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{c.desc}</p>
              </div>
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all text-[18px] mt-0.5 shrink-0">
                arrow_forward
              </span>
            </div>
          </Link>
        ))}
      </div>

    </AdminShell>
  );
}
