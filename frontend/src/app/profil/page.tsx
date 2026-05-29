import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfilHero from "@/components/ProfilHero";
import ProfilHistory from "@/components/ProfilHistory";
import ProfilVisiMisi from "@/components/ProfilVisiMisi";

export default function ProfilPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfilHero />
        <ProfilHistory />
        <ProfilVisiMisi />
      </main>
      <Footer />
    </>
  );
}
