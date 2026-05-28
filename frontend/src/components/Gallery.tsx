import Image from "next/image";
import Link from "next/link";

export default function Gallery() {
  return (
    <section className="py-24 bg-white dark:bg-background-dark/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Galeri Sekolah
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Momen kebersamaan dan kegiatan siswa kami.
            </p>
          </div>
          <Link
            href="/galeri"
            className="hidden md:flex items-center gap-2 px-6 py-3 border border-primary/20 rounded-xl font-bold text-primary hover:bg-primary/5 transition-all">
            Lihat Semua
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="group relative overflow-hidden rounded-2xl aspect-square">
            <img
              alt="Siswa Bermain"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Elementary students playing in school playground"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4PRykEHx0xI1EFIBh3qw0SPBPRW_p1nXvN_TJ__E3IXwKk0R9eWeu23rwtFy2SnHMzAZVTxiXLH6U2XSw5ij5bB6PepaRdDRIgeV5suXRlYKrk5wzlK_0RqWE-f3kwzhh3JSMoHD4XA2GXiTaSJpi6RKb0PHUQJPfnWSsKoWnp6QZnVAZwcxxrF46kON22KjoWgA4zjhuzg9UO6RcW8xtwN-CkZs8sLCPj6TUG0HmQG1gCK4eN7r1BV16wOK3AKz4UpDM6wc-d6U"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-bold">Kegiatan Luar Ruangan</p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl aspect-square">
            <img
              alt="Belajar Mengajar"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Children learning in a bright modern classroom"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUpOJFy86FcF9Q745bBCL6FBy1JeFgAsPJZrgHAP1i547PExaAnQzF234vpSoJf5tBcHavrggQPiV5N-MJu8tAwsWfj6eNA8-gMaJylwBid07U--Qpw1U1x4pRaV__0mSTdijwWRWrFYz-0bxSO0MnVGc_9022fAvK1BWDOJ1kSbeUjFZZdGOjGXzpGHjGZeBoA2e5rBRl3CF24b2tneW63RGtXzLtpONLLcngAzIdmToDIwntpphG8KNG52tnzyGU5WDQPVuycTI"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-bold">Suasana Kelas Inovatif</p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl aspect-square">
            <img
              alt="Perpustakaan"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Close up of student reading book in library"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAZ7wojpFx27dWEOYkNcZz7s8p2nLLiCQ9o44HgYa19BztwLhfNGmFsw3NEXqSaKMdvrmI2rhKRXF2NJQbkmptiLvHA2Ko6oL8HS5EHqFPDT93S3gmNznZAw9us8rilOUBLsPCgZrBQljGvGnB3xB9p2l9_zjxuHJnphgrRpgcJpnWtnHconBdzG4ilyfDkSzNtF4vTTxHh1XzJtT7KM7K6gjSOppqG5lSR2icYxiIHOwvBq-S4_gKIX-gwQlvzQakZLBxWeCPVRg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-bold">Waktu Literasi</p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl aspect-square">
            <img
              alt="Kelompok Siswa"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              data-alt="Group of elementary kids posing happily"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBZVOD8h44V-e0ceXPcVE5KiSgyZKXkDjupAHlNEw8QYTavbcwT3QzKlz3s_vRtqXAoG2x0Dxs2fmYy0SB8RitBDfg9hfRSSmngAwoFwMaqhRetYVuQ37VvOX1pVWxUGL-qLc2gqJ05K_ocIoBX_OtUgc5KYieV8H9VlkbniusTQwIhpB18yTYe0pBFS_ClNrbOJMxVEcJDrgcAy7UhYRwucPLCG75_VvTNt58VRpD1OuAHlKWa33yK59ss5PCCpG9cRyvNVEE1J0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-bold">Persahabatan Siswa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
