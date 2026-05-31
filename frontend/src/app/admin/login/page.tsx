"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal.");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) return null;

  return (
    <div className="min-h-screen flex">

      {/* ── Kiri: ilustrasi / branding ─────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background-dark flex-col items-center justify-center p-12">
        {/* Background foto sekolah dengan overlay */}
        <div className="absolute inset-0">
          <Image
            src="/bg-sekolah.jpg"
            alt="SD Negeri Selok Awar-Awar 05"
            fill
            className="object-cover object-top opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-dark/90 to-primary/20" />
        </div>

        {/* Dekorasi lingkaran */}
        <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full bg-primary/10 blur-3xl" />

        {/* Konten branding */}
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center size-20 rounded-2xl bg-primary/20 border border-primary/30 mb-6">
            <span className="material-symbols-outlined text-primary text-4xl">school</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-3 leading-tight">
            SD Negeri<br />
            <span className="text-primary">Selok Awar-Awar 05</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
            Panel administrasi untuk mengelola konten website sekolah secara mudah dan efisien.
          </p>

          {/* Feature list */}
          <div className="mt-10 space-y-3 text-left">
            {[
              { icon: "photo_library", text: "Kelola galeri foto kegiatan" },
              { icon: "group",         text: "Manajemen data guru & staf" },
              { icon: "assignment",    text: "Pengaturan PPDB online" },
              { icon: "school",        text: "Update profil sekolah" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <div className="shrink-0 size-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[16px]">{f.icon}</span>
                </div>
                <span className="text-slate-300 text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Kanan: form login ───────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 py-12">
        <div className="w-full max-w-md">

          {/* Header mobile (hanya tampil di layar kecil) */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">school</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">SD Negeri Selok Awar-Awar 05</h1>
          </div>

          {/* Card form */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">

            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Selamat Datang 👋
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Masuk ke panel admin untuk mengelola konten website.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] shrink-0">error</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">
                    mail
                  </span>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    placeholder="admin@sekolah.id"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">
                    lock
                  </span>
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-11 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPass ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 text-sm transition-all hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 mt-2"
              >
                {submitting ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                    Masuk...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">login</span>
                    Masuk ke Panel Admin
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-6">
            © {new Date().getFullYear()} SD Negeri Selok Awar-Awar 05
          </p>
        </div>
      </div>

    </div>
  );
}
