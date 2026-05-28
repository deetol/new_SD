"use client";

interface Props {
  title: string;
  message: string;
  loading?: boolean;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  title,
  message,
  loading = false,
  confirmLabel = "Hapus",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6">
        <div className="flex items-start gap-4 mb-5">
          <div className="shrink-0 size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-[20px]">
              warning
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{message}</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {loading ? "Menghapus..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
