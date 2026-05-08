"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const CHAPTERS = ["Innovators", "Superiors", "Pioneers"];

export default function EyebrowChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill bg-brand-soft px-3 py-1.5 eyebrow-text transition-all duration-240",
        className
      )}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
      NIA SURAT &middot; CHAPTER 01
    </span>
  );
}

export function ChapterSwitcher() {
  const [active, setActive] = useState("Innovators");

  return (
    <div className="flex items-center border border-line rounded-pill bg-paper-3 p-1 shadow-sm">
      {CHAPTERS.map((ch) => {
        const isActive = active === ch;
        return (
          <button
            key={ch}
            onClick={() => setActive(ch)}
            className={cn(
              "px-4 py-1.5 rounded-pill text-[13px] font-semibold transition-all duration-200",
              isActive ? "bg-brand text-white shadow-sm" : "text-ink-3 hover:text-ink"
            )}
          >
            {ch}
          </button>
        );
      })}
    </div>
  );
}
