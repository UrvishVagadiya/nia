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
        const sorted = (data.docs || []).sort((a: Chapter, b: Chapter) =>
          a.name.localeCompare(b.name)
        );
        setChapters(sorted);
      });
  }, []);

  const currentChapterId = searchParams.get("where[chapter][equals]") || null;

  const handleFilter = (id: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (id) {
      params.set("where[chapter][equals]", id);
    } else {
      params.delete("where[chapter][equals]");
    }

    // Always reset to page 1 when filter changes
    params.delete("page");

    const newQuery = params.toString();
    router.push(`${pathname}${newQuery ? `?${newQuery}` : ""}`);
  };

  return (
    <div
      className="chapter-filter-container"
      style={{
        padding: "0 2rem",
        marginTop: "1.5rem",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          background: "var(--theme-elevation-50)",
          border: "1px solid var(--theme-elevation-150)",
          borderRadius: "12px",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem", flex: 1 }}>
          <div className="flex items-center gap-2.5" style={{ minWidth: "max-content" }}>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--theme-elevation-500)",
                margin: 0,
              }}
            >
              Chapters
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              overflowX: "auto",
              paddingRight: "1rem",
            }}
            className="no-scrollbar"
          >
            {/* All Chapters Pill */}
            <button
              onClick={() => handleFilter(null)}
              suppressHydrationWarning
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                border: "1px solid transparent",
                whiteSpace: "nowrap",
                background: !currentChapterId
                  ? "var(--theme-elevation-800)"
                  : "var(--theme-elevation-100)",
                color: !currentChapterId
                  ? "var(--theme-elevation-0)"
                  : "var(--theme-elevation-600)",
                transition: "all 0.2s",
              }}
            >
              All
            </button>

            {chapters.map((chapter) => {
              const isActive = currentChapterId === String(chapter.id);
              return (
                <button
                  key={chapter.id}
                  onClick={() => handleFilter(chapter.id)}
                  suppressHydrationWarning
                  style={{
                    padding: "6px 16px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    border: isActive
                      ? "1px solid var(--theme-elevation-800)"
                      : "1px solid var(--theme-elevation-200)",
                    background: isActive
                      ? "var(--theme-elevation-800)"
                      : "var(--theme-elevation-0)",
                    color: isActive ? "var(--theme-elevation-0)" : "var(--theme-elevation-600)",
                    transition: "all 0.15s",
                  }}
                >
                  {chapter.name}
                </button>
              );
            })}
          </div>
        </div>

        {currentChapterId && (
          <button
            onClick={() => handleFilter(null)}
            style={{
              fontSize: "11px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#ff4d4d",
              background: "rgba(255, 77, 77, 0.1)",
              border: "1px solid rgba(255, 77, 77, 0.2)",
              borderRadius: "6px",
              padding: "6px 12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            Clear Filter ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ChapterFilterBar;
