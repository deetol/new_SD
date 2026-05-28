import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuruHero from "@/components/GuruHero";
import GuruGrid from "@/components/GuruGrid";
import { getTeachers } from "@/lib/api";

// Async Server Component — data di-fetch di server, tidak ada loading state di client
export default async function GuruPage() {
  let teachers = await getTeachers({ is_active: true }).catch(() => []);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GuruHero />
        <GuruGrid teachers={teachers} />
      </main>
      <Footer />
    </>
  );
}
