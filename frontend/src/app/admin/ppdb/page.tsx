"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { adminFetch } from "@/lib/fetchAdmin";
import type { Ppdb } from "@/lib/api";
import PpdbFormModal from "@/components/admin/PpdbFormModal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

function StatusBadge({ ppdb }: { ppdb: Ppdb }) {
  const now = new Date();
  const buka = new Date(ppdb.tanggal_buka);
  const tutup = new Date(ppdb.tanggal_tutup);

  if (!ppdb.is_active)
    return <Badge color="slate">Nonaktif</Badge>;
  if (now < buka)
    return <Badge color="amber">Belum Dibuka</Badge>;
  if (now > tutup)
    return <Badge color="red">Ditutup</Badge>;
  return <Badge color="green">Aktif</Badge>;
}

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  const cls: Record<string, string> = {
    green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    red:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    slate: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls[color]}`}>
      {children}
    </span>
  );
}

export default function AdminPpdbPage() {
  const [list, setList]         = useState<Ppdb[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing]   = useState<Ppdb | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Ppdb | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminFetch<Ppdb[]>("/ppdb");
      setList(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminFetch(`/ppdb/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menghapus.");
    } finally {
      setDeleting(false);
    }
  }

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  return (
    <AdminShell title="Manajemen PPDB">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {loading ? "Memuat..." : `${list.length} data PPDB`}
        </p>
        <button
          onClick={() => { setEditing(null); setFormOpen(true); }}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Tambah PPDB
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Judul</th>
              <th className="px-4 py-3 text-left">Tahun Ajaran</th>
              <th className="px-4 py-3 text-left">Tanggal Buka</th>
              <th className="px-4 py-3 text-left">Tanggal Tutup</th>
              <th className="px-4 py-3 text-left">Kuota</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">Memuat data...</td></tr>
            ) : list.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">Belum ada data PPDB.</td></tr>
            ) : list.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-white max-w-[200px] truncate">
                  {p.judul}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{p.tahun_ajaran}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{fmt(p.tanggal_buka)}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{fmt(p.tanggal_tutup)}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{p.kuota ?? "∞"}</td>
                <td className="px-4 py-3"><StatusBadge ppdb={p} /></td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => { setEditing(p); setFormOpen(true); }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
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
      </div>

      {formOpen && (
        <PpdbFormModal
          ppdb={editing}
          onClose={() => setFormOpen(false)}
          onSaved={() => { setFormOpen(false); load(); }}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Hapus Data PPDB"
          message={`Yakin ingin menghapus PPDB "${deleteTarget.judul}"? Semua data pendaftar terkait juga akan terhapus.`}
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </AdminShell>
  );
}
