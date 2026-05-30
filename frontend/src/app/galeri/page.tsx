import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GaleriContent from "@/components/GaleriContent";
import { getGalleries } from "@/lib/api";
import type { Gallery } from "@/lib/api";

const KATEGORI: Gallery["kategori"][] = [
  "Ekstrakurikuler",
  "Galeri Umum",
  "Perayaan",
  "Penghargaan",
];

export default async function GaleriPage() {
  // Fetch halaman pertama tiap kategori secara paralel
  const results = await Promise.all(
    KATEGORI.map((k) =>
      getGalleries({ kategori: k, per_page: 12 }).catch(() => null)
    )
  );

  const sections = KATEGORI.map((kategori, i) => ({
    kategori,
    items:    results[i]?.data     ?? [],
    lastPage: results[i]?.meta.last_page ?? 1,
  }));

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 lg:px-20 py-12">
        <GaleriContent sections={sections} />
      </main>
      <Footer />
    </>
  );
}
