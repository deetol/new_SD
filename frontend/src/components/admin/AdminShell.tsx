"use client";

import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Wrapper untuk semua halaman admin.
 * Menampilkan sidebar + konten, dan redirect ke login jika belum auth.
 */
export default function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/admin/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="flex items-center gap-3 text-slate-500">
          <span className="material-symbols-outlined animate-spin text-2xl">
            progress_activity
          </span>
          <span className="text-sm">Memuat...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {title && (
          <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-4">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              {title}
            </h1>
          </header>
        )}
        <main className="flex-1 px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
