"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="size-12 flex items-center justify-center">
              <img src="/logosd5.png" alt="Logo SDN Selok Awar-Awar 05" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                SD Negeri Selok Awar-Awar 05
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                Unggul & Berkarakter
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-semibold hover:text-primary transition-colors hover:border-b-2 hover:border-accent-gold pb-1"
            >
              Beranda
            </Link>
            <Link
              href="/profil"
              className="text-sm font-medium hover:text-primary transition-colors hover:border-b-2 hover:border-accent-gold pb-1"
            >
              Profil
            </Link>
            <Link
              href="/guru"
              className="text-sm font-medium hover:text-primary transition-colors hover:border-b-2 hover:border-accent-gold pb-1"
            >
              Tenaga Pendidik
            </Link>
            <Link
              href="/galeri"
              className="text-sm font-medium hover:text-primary transition-colors hover:border-b-2 hover:border-accent-gold pb-1"
            >
              Galeri
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              PPDB
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="bg-primary text-background-dark px-6 py-2.5 rounded-lg font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20">
              Daftar PPDB
            </button>
            <button className="md:hidden text-slate-900 dark:text-slate-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/">Beranda</Link>
            <Link href="/profil">Profil</Link>
            <Link href="/guru">Tenaga Pendidik</Link>
            <Link href="/galeri">Galeri</Link>
            <Link href="#">PPDB</Link>
          </div>
        )}</div>
    </header>
  );
}
