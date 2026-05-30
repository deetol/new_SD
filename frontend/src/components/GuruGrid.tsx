"use client";

import { useState } from "react";
import type { Teacher, PaginatedResponse } from "@/lib/api";
import TeacherCard from "@/components/TeacherCard";
import TeacherEmpty from "@/components/TeacherEmpty";
import LoadMoreButton from "@/components/LoadMoreButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

interface Props {
  initialTeachers: Teacher[];
  initialLastPage: number;
}

export default function GuruGrid({ initialTeachers, initialLastPage }: Props) {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [page, setPage]         = useState(1);
  const [loading, setLoading]   = useState(false);
  const hasMore = page < initialLastPage;

  async function loadMore() {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const url = `${API_URL}/teachers?is_active=true&page=${nextPage}`;
      const res  = await fetch(url, { cache: "no-store" });
      if (!res.ok) return;
      const json: PaginatedResponse<Teacher> = await res.json();
      setTeachers((prev) => [...prev, ...json.data]);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  }

  if (teachers.length === 0) return <TeacherEmpty />;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
      <LoadMoreButton onClick={loadMore} loading={loading} hasMore={hasMore} label="guru" />
    </>
  );
}
