import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GaleriContent from "@/components/GaleriContent";

export default function GaleriPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 lg:px-20 py-12">
        <GaleriContent />
      </main>
      <Footer />
    </>
  );
}
