import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GaleriDetailContent from "@/components/GaleriDetailContent";
import type { Gallery } from "@/lib/api";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

async function getGallery(id: string): Promise<Gallery | null> {
  try {
    const res = await fetch(`${API_URL}/galleries/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const item = data.data ? data.data : data;
    // Guard: pastikan object bukan array
    return item && !Array.isArray(item) ? item : null;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return null;
  }
}

async function getAllGalleries(): Promise<Gallery[]> {
  try {
    const res = await fetch(`${API_URL}/galleries`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items = data.data ? data.data : data;
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error("Error fetching all galleries:", error);
    return [];
  }
}

export default async function GaleriDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [gallery, allGalleries] = await Promise.all([
    getGallery(params.id),
    getAllGalleries(),
  ]);

  if (!gallery) notFound();

  // Artikel terkait — kategori sama, bukan item ini sendiri, maks 3
  const related = allGalleries
    .filter((g) => g.id !== gallery.id && g.kategori === gallery.kategori)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex flex-1 justify-center py-8 px-4 lg:px-40">
        <GaleriDetailContent
          gallery={gallery}
          related={related}
          pageUrl={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/galeri/${gallery.id}`}
        />
      </main>
      <Footer />
    </>
  );
}
