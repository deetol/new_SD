import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GaleriDetailContent from "@/components/GaleriDetailContent";
import { galleryData } from "@/data/galeri";
import { notFound } from "next/navigation";

// Generate static params for all known gallery items
export function generateStaticParams() {
  return galleryData.map((item) => ({
    id: item.id,
  }));
}

export default function GaleriDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = galleryData.find((g) => g.id === params.id);

  if (!item) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex flex-1 justify-center py-8 px-4 lg:px-40">
        <GaleriDetailContent item={item} />
      </main>
      <Footer />
    </>
  );
}
