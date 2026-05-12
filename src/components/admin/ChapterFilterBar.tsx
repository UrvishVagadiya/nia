// 'use client'

// import React, { useEffect, useState } from 'react'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// const ChapterFilterBar: React.FC = () => {
//   const [chapters, setChapters] = useState<any[]>([])
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   useEffect(() => {
//     fetch('/api/chapters?limit=100')
//       .then((res) => res.json())
//       .then((data) => {
//         setChapters(data.docs || [])
//       })
//   }, [])

//   const currentChapterId = searchParams.get('where[chapter][equals]')

//   const handleFilter = (id: string | null) => {
//     const params = new URLSearchParams(searchParams.toString())
//     if (id) {
//       params.set('where[chapter][equals]', id)
//     } else {
//       params.delete('where[chapter][equals]')
//     }
//     router.push(`${pathname}?${params.toString()}`)
//   }

//   return (
//     <div className="mb-8 p-1 bg-[var(--theme-elevation-100)] rounded-[14px] flex flex-wrap gap-1.5 items-center border border-[var(--theme-elevation-200)] shadow-sm">
//       <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[var(--theme-elevation-500)] border-r border-[var(--theme-elevation-250)] mr-1">
//         Chapters
//       </div>
//       <button
//         onClick={() => handleFilter(null)}
//         className={`px-4 py-2 rounded-[10px] cursor-pointer transition-all duration-200 text-sm font-semibold border ${
//           !currentChapterId
//             ? 'bg-white text-[var(--theme-elevation-900)] border-[var(--theme-elevation-300)] shadow-sm scale-[1.02]'
//             : 'bg-transparent text-[var(--theme-elevation-600)] border-transparent hover:bg-[var(--theme-elevation-200)] hover:text-[var(--theme-elevation-800)]'
//         }`}
//       >
//         All Members
//       </button>
//       {chapters.map((chapter) => (
//         <button
//           key={chapter.id}
//           onClick={() => handleFilter(chapter.id)}
//           className={`px-4 py-2 rounded-[10px] cursor-pointer transition-all duration-200 text-sm font-semibold border ${
//             currentChapterId === String(chapter.id)
//               ? 'bg-white text-[var(--theme-elevation-900)] border-[var(--theme-elevation-300)] shadow-sm scale-[1.02]'
//               : 'bg-transparent text-[var(--theme-elevation-600)] border-transparent hover:bg-[var(--theme-elevation-200)] hover:text-[var(--theme-elevation-800)]'
//           }`}
//         >
//           {chapter.name}
//         </button>
//       ))}
//     </div>
//   )
// }

// export default ChapterFilterBar

"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Chapter {
  id: string;
  name: string;
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
        setChapters(data.docs || []);
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

  const baseButton =
    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border cursor-pointer";

  const inactiveButton = `
    bg-[var(--theme-bg)]
    text-[var(--theme-text)]
    border-[var(--theme-elevation-200)]
    hover:bg-[var(--theme-elevation-100)]
    hover:border-[var(--theme-elevation-300)]
  `;

  const activeButton = `
    bg-[var(--theme-text)]
    text-[var(--theme-base-0)]
    border-[var(--theme-text)]
    shadow-sm
  `;

  return (
    <div className="mb-6">
      {/* Heading */}
      <div className="mb-2">
        <p className="text-sm font-medium text-[var(--theme-elevation-700)]">Chapters</p>
      </div>

      {/* Filter Tabs */}
      <div
        className="
          flex flex-wrap items-center gap-2
          rounded-xl
          border border-[var(--theme-elevation-200)]
          bg-[var(--theme-elevation-50)]
          p-2
          w-fit
        "
      >
        {/* All Members */}
        <button
          onClick={() => handleFilter(null)}
          className={`${baseButton} ${!currentChapterId ? activeButton : inactiveButton}`}
        >
          All Members
        </button>

        {/* Dynamic Chapters */}
        {chapters.map((chapter) => {
          const isActive = currentChapterId === String(chapter.id);

          return (
            <button
              key={chapter.id}
              onClick={() => handleFilter(chapter.id)}
              className={`${baseButton} ${isActive ? activeButton : inactiveButton}`}
            >
              {chapter.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterFilterBar;
