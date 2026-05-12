"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Chapter {
  id: string;
  name: string;
  slug: string;
}

const ChapterFilterBar: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch("/api/chapters?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const rootChapter = process.env.NEXT_PUBLIC_ROOT_CHAPTER_SLUG || "innovators";
        const sorted = (data.docs || []).sort((a: Chapter, b: Chapter) => {
          if (a.slug === rootChapter) return -1;
          if (b.slug === rootChapter) return 1;
          return a.name.localeCompare(b.name);
        });
        setChapters(sorted);
      });
  }, []);

  const currentChapterId = searchParams.get("where[chapter][equals]");

  const handleFilter = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set("where[chapter][equals]", id);
    } else {
      params.delete("where[chapter][equals]");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--theme-elevation-400)] m-0">
          Chapter Filter
        </h4>
        {currentChapterId && (
          <button
            onClick={() => handleFilter(null)}
            className="text-[11px] font-bold uppercase tracking-wider text-brand hover:text-brand-2 transition-colors cursor-pointer border-none bg-transparent p-0 flex items-center gap-1.5"
          >
            <span className="text-[14px]">×</span> Clear Filter
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {chapters.map((chapter) => {
          const isActive = currentChapterId === String(chapter.id);
          return (
            <button
              key={chapter.id}
              onClick={() => handleFilter(chapter.id)}
              className={`px-5 py-2 rounded-pill text-[13px] font-bold transition-all duration-200 cursor-pointer border ${
                isActive
                  ? "bg-[var(--theme-text)] text-[var(--theme-base-0)] border-[var(--theme-text)] shadow-lg scale-[1.02]"
                  : "bg-[var(--theme-elevation-50)] text-[var(--theme-elevation-600)] border-[var(--theme-elevation-200)] hover:border-[var(--theme-elevation-400)] hover:bg-[var(--theme-elevation-100)]"
              }`}
            >
              {chapter.name}
            </button>
          );
        })}
      </div>
      <div className="h-[1px] w-full bg-[var(--theme-elevation-150)] mt-2 opacity-50" />
    </div>
  );
};

export default ChapterFilterBar;
