import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GaleriContent from "@/components/GaleriContent";
import type { Gallery } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

async function getGalleries(): Promise<Gallery[]> {
  try {
    const res = await fetch(`${API_URL}/galleries`, {
      next: { revalidate: 60 }, // ISR — refresh tiap 60 detik
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items = data.data ? data.data : data;
    // Guard: pastikan selalu array
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return [];
  }
}

export default async function GaleriPage() {
  const galleries = await getGalleries();

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 lg:px-20 py-12">
        <GaleriContent galleries={galleries} />
      </main>
      <Footer />
    </>
  );
}
