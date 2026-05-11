"use client";

import { cn } from "@/lib/utils";

const EyebrowChip = ({ className }: { className?: string }) => {
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
};

export default EyebrowChip;
