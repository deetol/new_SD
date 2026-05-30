"use client";

interface Props {
  onClick: () => void;
  loading: boolean;
  hasMore: boolean;
  /** e.g. "foto" or "guru" */
  label?: string;
}

export default function LoadMoreButton({ onClick, loading, hasMore, label = "item" }: Props) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={onClick}
        disabled={loading}
        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? (
          <>
            <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
            Memuat...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
            Muat lebih banyak {label}
          </>
        )}
      </button>
    </div>
  );
}
