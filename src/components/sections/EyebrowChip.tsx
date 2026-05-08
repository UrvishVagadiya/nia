"use client";

import { useChapter } from "@/lib/chapter-context";
import { CHAPTER_IDS, CHAPTERS } from "@/lib/data";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";

export default function EyebrowChip({ className }: { className?: string }) {
  const { chapter } = useChapter();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill bg-brand-soft px-3 py-1.5 eyebrow-text transition-all duration-240",
        className
      )}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
      <Typography variant="eyebrow" className="m-0">
        NIA SURAT &middot; CHAPTER {chapter.number}
      </Typography>
    </span>
  );
}

export function ChapterSwitcher() {
  const { activeChapterId, setActiveChapterId } = useChapter();

  return (
    <div className="relative flex items-center border-1 border-[var(--color-line)] rounded-pill bg-paper-3 p-1 shadow-pill">
      {CHAPTER_IDS.map((id) => {
        const ch = CHAPTERS[id];
        const isActive = id === activeChapterId;
        return (
          <button
            key={id}
            onClick={() => setActiveChapterId(id)}
            className={cn(
              "relative z-10 rounded-pill px-[16px] py-[8px] transition-all duration-200",
              isActive ? "bg-brand text-white shadow-pill" : "text-ink-3 hover:text-ink"
            )}
          >
            <Typography
              as="span"
              variant="body-sm"
              className={isActive ? "text-white" : "text-ink-3"}
            >
              {ch.short}
            </Typography>
          </button>
        );
      })}
    </div>
  );
}
