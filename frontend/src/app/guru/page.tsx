import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuruHero from "@/components/GuruHero";
import GuruGrid from "@/components/GuruGrid";
import { getTeachersPaginated } from "@/lib/api";

export default async function GuruPage() {
  const result = await getTeachersPaginated({ is_active: true, per_page: 20 }).catch(() => null);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GuruHero />
        <GuruGrid
          initialTeachers={result?.data ?? []}
          initialLastPage={result?.meta.last_page ?? 1}
        />
      </main>
      <Footer />
    </>
  );
}
