import Image from "next/image";
import type { Teacher } from "@/lib/api";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const avatarUrl =
    teacher.foto_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.nama)}&background=random&size=120`;

  return (
    <div className="group bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center">
      {/* Avatar */}
      <div className="relative inline-block mb-4">
        <div className="size-[120px] rounded-full border-4 border-accent-gold p-1 overflow-hidden">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-200">
            <Image
              src={avatarUrl}
              alt={`Foto ${teacher.nama}`}
              fill
              sizes="120px"
              className="object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
        {teacher.nama}
      </h3>
      <p className="text-primary font-semibold text-sm mb-1">{teacher.jabatan}</p>
      {teacher.mata_pelajaran && (
        <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
          {teacher.mata_pelajaran}
        </p>
      )}

      {/* NIP */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
          Nomor Induk Pegawai
        </p>
        <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
          {teacher.nip ?? "-"}
        </p>
      </div>
    </div>
  );
}
