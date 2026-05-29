import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-10 flex items-center justify-center">
                <img src="/logosd5.png" alt="Logo SDN Selok Awar-Awar 05" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold">SD Negeri<br />
                Selok Awar-Awar 05</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Tempuran, Selok Anyar, Kec. Pasirian,<br />
              Kabupaten Lumajang, Jawa Timur 67372
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/sedan.karima"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#1877F2] transition-all"
                title="Facebook SD Negeri Selok Awar-Awar 05"
              >
                <svg className="size-5 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              </Link>
              <Link
                href="https://maps.app.goo.gl/6N9XdrZXTVayDyz48"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all"
                title="Lokasi di Google Maps"
              >
                <span className="material-symbols-outlined text-xl">
                  share_location
                </span>
              </Link>
              <Link
                href="/admin"
                className="size-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all"
                title="Admin Panel"
              >
                <span className="material-symbols-outlined text-xl">
                  admin_panel_settings
                </span>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Navigasi Utama</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-primary transition-colors">
                  Profil Sekolah
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Informasi Sekolah</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>
                <Link href="/guru" className="hover:text-primary transition-colors">
                  Tenaga Pendidik
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-primary transition-colors">
                  Galeri Kegiatan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Kontak Kami</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  call
                </span>
                <a
                  href="https://wa.me/6282139817999?text=Halo%20Admin%20Sekolah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Hubungi Kami
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  email
                </span>
                <a href="mailto:sdnselok05@gmail.com">
                  sdnselok05@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  schedule
                </span>
                Senin - Sabtu: 07.00 - 15.00
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Lokasi Kami</h4>
            <div className="rounded-xl overflow-hidden h-40 bg-slate-800 relative">
              {/* Using absolute path temporarily since images aren't stored locally */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31588.914503125423!2d113.1588868640534!3d-8.241481069534167!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd66f10d79b216f%3A0x561861c8203500bd!2sSDN%20Selok%20Awar-Awar%2005!5e0!3m2!1sid!2sid!4v1773483609862!5m2!1sid!2sid"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-4xl animate-bounce">
                  location_on
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          <p>© 2026 SD Negeri Selok Awar-Awar 05. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </div>
    </footer>
  );
}
