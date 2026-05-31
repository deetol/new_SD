"use client";

import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/admin/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
          <span className="text-sm">Memuat...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950 overflow-x-hidden">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Top bar ── */}
        <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 py-3 flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>

          {/* Page title */}
          {title && (
            <h1 className="text-base font-bold text-slate-900 dark:text-white truncate">
              {title}
            </h1>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* View site link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors font-medium"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            Lihat Website
          </a>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-slate-200 dark:bg-slate-700" />

          {/* User chip */}
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[16px]">person</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">
                {user.name ?? "Admin"}
              </p>
              <p className="text-[10px] text-slate-400 leading-none mt-0.5">{user.email}</p>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={logout}
            title="Keluar"
            className="p-2 rounded-lg text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </header>

        {/* ── Page content ── */}
        <main className="flex-1 px-4 md:px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
