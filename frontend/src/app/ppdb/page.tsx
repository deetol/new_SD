import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PpdbHero from "@/components/ppdb/PpdbHero";
import PpdbInfo from "@/components/ppdb/PpdbInfo";
import PpdbForm from "@/components/ppdb/PpdbForm";
import PpdbTutup from "@/components/ppdb/PpdbTutup";
import type { Ppdb } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export type PpdbStatus =
  | "aktif"          // is_active=true, tanggal dalam range
  | "belum_dibuka"   // is_active=true, tanggal_buka belum tiba
  | "ditutup"        // is_active=true, tanggal_tutup sudah lewat
  | "nonaktif"       // is_active=false (dinonaktifkan manual oleh admin)
  | "tidak_ada";     // tidak ada data PPDB sama sekali

async function getAllPpdb(): Promise<Ppdb[]> {
  try {
    const res = await fetch(`${API_URL}/ppdb`, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function getPpdbStatus(ppdb: Ppdb): PpdbStatus {
  if (!ppdb.is_active) return "nonaktif";
  const now   = new Date();
  const buka  = new Date(ppdb.tanggal_buka);
  const tutup = new Date(ppdb.tanggal_tutup);
  if (now < buka)  return "belum_dibuka";
  if (now > tutup) return "ditutup";
  return "aktif";
}

export default async function PpdbPage() {
  const list = await getAllPpdb();

  // Prioritas: aktif > belum_dibuka > ditutup > nonaktif
  const priority: PpdbStatus[] = ["aktif", "belum_dibuka", "ditutup", "nonaktif"];

  let selectedPpdb: Ppdb | null = null;
  let status: PpdbStatus = "tidak_ada";

  for (const p of priority) {
    const found = list.find((item) => getPpdbStatus(item) === p);
    if (found) {
      selectedPpdb = found;
      status = p;
      break;
    }
  }

  return (
    <>
      <Header />
      <main>
        <PpdbHero ppdb={selectedPpdb} status={status} />
        {status === "aktif" && selectedPpdb ? (
          <>
            <PpdbInfo ppdb={selectedPpdb} />
            <PpdbForm ppdbId={selectedPpdb.id} tahunAjaran={selectedPpdb.tahun_ajaran} />
          </>
        ) : selectedPpdb ? (
          <PpdbInfo ppdb={selectedPpdb} />
        ) : null}
        {(status === "nonaktif" || status === "ditutup" || status === "tidak_ada") && (
          <PpdbTutup status={status} ppdb={selectedPpdb} />
        )}
      </main>
      <Footer />
    </>
  );
}
