"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard",      href: "/admin",           icon: "dashboard",     section: null },
  { label: "Guru",           href: "/admin/guru",       icon: "group",         section: "Konten" },
  { label: "Galeri",         href: "/admin/galeri",     icon: "photo_library", section: "Konten" },
  { label: "PPDB",           href: "/admin/ppdb",       icon: "assignment",    section: "PPDB" },
  { label: "Pendaftar",      href: "/admin/pendaftar",  icon: "how_to_reg",    section: "PPDB" },
  { label: "Profil Sekolah", href: "/admin/profil",     icon: "school",        section: "Pengaturan" },
];

// Group nav items by section
const sections = [
  { title: null,         items: navItems.filter((i) => i.section === null) },
  { title: "Konten",     items: navItems.filter((i) => i.section === "Konten") },
  { title: "PPDB",       items: navItems.filter((i) => i.section === "PPDB") },
  { title: "Pengaturan", items: navItems.filter((i) => i.section === "Pengaturan") },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Backdrop mobile */}
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 z-30 bg-black/50 md:hidden" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-background-dark flex flex-col transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ── Brand ── */}
        <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[18px]">school</span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 leading-none mb-0.5">Admin Panel</p>
              <p className="font-bold text-white text-sm leading-tight">SDN Selok Awar-Awar 05</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-white/10 md:hidden"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
          {sections.map((section) => (
            <div key={section.title ?? "main"}>
              {section.title && (
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 px-3 mb-1.5">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-primary text-background-dark shadow-lg shadow-primary/20"
                          : "text-slate-400 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      {item.label}
                      {active && (
                        <span className="ml-auto material-symbols-outlined text-[14px] opacity-70">
                          chevron_right
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ── User ── */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[16px]">person</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name ?? "Admin"}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
