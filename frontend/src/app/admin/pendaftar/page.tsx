"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { adminFetch } from "@/lib/fetchAdmin";
import type { PendaftarPpdb, Ppdb } from "@/lib/api";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import PendaftarDetailModal from "@/components/admin/PendaftarDetailModal";

const STATUS_COLORS = {
  menunggu: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  diterima: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  ditolak:  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const STATUS_LABELS = { menunggu: "Menunggu", diterima: "Diterima", ditolak: "Ditolak" };

export default function AdminPendaftarPage() {
  const [list, setList]           = useState<PendaftarPpdb[]>([]);
  const [ppdbList, setPpdbList]   = useState<Ppdb[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [filterPpdb, setFilterPpdb]     = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch]       = useState("");

  const [detailOpen, setDetailOpen]     = useState(false);
  const [selected, setSelected]         = useState<PendaftarPpdb | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PendaftarPpdb | null>(null);
  const [deleting, setDeleting]         = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterPpdb)   params.set("ppdb_id", filterPpdb);
      if (filterStatus) params.set("status", filterStatus);

      const [data, ppdb] = await Promise.all([
        adminFetch<PendaftarPpdb[]>(`/pendaftar-ppdb?${params}`),
        adminFetch<Ppdb[]>("/ppdb"),
      ]);
      setList(data);
      setPpdbList(ppdb);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  }, [filterPpdb, filterStatus]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminFetch(`/pendaftar-ppdb/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menghapus.");
    } finally {
      setDeleting(false);
    }
  }

  const filtered = list.filter((p) =>
    search === "" ||
    p.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
    p.nomor_pendaftaran.toLowerCase().includes(search.toLowerCase())
  );

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  return (
    <AdminShell title="Data Pendaftar PPDB">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Cari nama / nomor pendaftaran..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={filterPpdb}
          onChange={(e) => setFilterPpdb(e.target.value)}
          className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Semua PPDB</option>
          {ppdbList.map((p) => (
            <option key={p.id} value={p.id}>{p.judul} ({p.tahun_ajaran})</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Semua Status</option>
          <option value="menunggu">Menunggu</option>
          <option value="diterima">Diterima</option>
          <option value="ditolak">Ditolak</option>
        </select>
        <p className="text-sm text-slate-500 dark:text-slate-400 ml-auto">
          {loading ? "Memuat..." : `${filtered.length} pendaftar`}
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">No. Pendaftaran</th>
              <th className="px-4 py-3 text-left">Nama Lengkap</th>
              <th className="px-4 py-3 text-left">L/P</th>
              <th className="px-4 py-3 text-left">No. HP</th>
              <th className="px-4 py-3 text-left">Tgl. Daftar</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">Memuat data...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">Tidak ada data pendaftar.</td></tr>
            ) : filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.nomor_pendaftaran}</td>
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{p.nama_lengkap}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {p.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{p.no_hp}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {p.submitted_at ? fmt(p.submitted_at) : "-"}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[p.status]}`}>
                    {STATUS_LABELS[p.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => { setSelected(p); setDetailOpen(true); }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                      title="Lihat Detail & Ubah Status"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button
                      onClick={() => setDeleteTarget(p)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Hapus"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detailOpen && selected && (
        <PendaftarDetailModal
          pendaftar={selected}
          onClose={() => setDetailOpen(false)}
          onStatusChanged={() => { setDetailOpen(false); load(); }}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Hapus Data Pendaftar"
          message={`Yakin ingin menghapus pendaftar "${deleteTarget.nama_lengkap}" (${deleteTarget.nomor_pendaftaran})?`}
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminShell>
  );
}
