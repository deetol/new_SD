"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard",      href: "/admin",           icon: "dashboard" },
  { label: "Guru",           href: "/admin/guru",       icon: "group" },
  { label: "Galeri",         href: "/admin/galeri",     icon: "photo_library" },
  { label: "PPDB",           href: "/admin/ppdb",       icon: "assignment" },
  { label: "Pendaftar",      href: "/admin/pendaftar",  icon: "how_to_reg" },
  { label: "Profil Sekolah", href: "/admin/profil",     icon: "school" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col min-h-screen">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-0.5">Admin Panel</p>
        <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
          SD Negeri 5
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mb-2">
          {user?.email}
        </p>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
