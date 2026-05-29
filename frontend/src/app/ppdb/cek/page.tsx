import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CekPendaftaran from "@/components/ppdb/CekPendaftaran";

export default function CekPendaftaranPage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-background-light dark:bg-background-dark">
        <CekPendaftaran />
      </main>
      <Footer />
    </>
  );
}
