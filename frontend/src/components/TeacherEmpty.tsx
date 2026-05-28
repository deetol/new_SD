export default function TeacherEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
        group_off
      </span>
      <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
        Data guru belum tersedia.
      </p>
      <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
        Silakan tambahkan data guru melalui panel admin.
      </p>
    </div>
  );
}
