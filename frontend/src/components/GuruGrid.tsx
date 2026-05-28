import type { Teacher } from "@/lib/api";
import TeacherCard from "@/components/TeacherCard";
import TeacherEmpty from "@/components/TeacherEmpty";

interface GuruGridProps {
  teachers: Teacher[];
}

export default function GuruGrid({ teachers }: GuruGridProps) {
  if (teachers.length === 0) {
    return <TeacherEmpty />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
}
