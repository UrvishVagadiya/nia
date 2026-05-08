"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useChapter } from "@/lib/chapter-context";
import { MEMBERS_BY_CHAPTER } from "@/lib/data";
import { MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function MembersSection() {
  const { activeChapterId, chapter } = useChapter();
  const members = useMemo(() => MEMBERS_BY_CHAPTER[activeChapterId] || [], [activeChapterId]);

  const specialties = useMemo(() => {
    const set = new Set(members.map((m) => m.specialty));
    return ["All", ...Array.from(set).sort()];
  }, [members]);

  const [filter, setFilter] = useState("All");

  // Filter members based on selected specialty
  const filtered = filter === "All" ? members : members.filter((m) => m.specialty === filter);

  return (
    <section id="members" className="bg-paper-2 section-padding">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-pill bg-brand-soft px-3 py-1.5 mb-4">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow">THE DIRECTORY</Typography>
          </div>
          <Typography as="h2" variant="h2" color="brand-deep">
            Meet the {chapter.short.toLowerCase()}.
          </Typography>
          <Typography variant="body-md" color="ink-3" className="mt-4 max-w-2xl mx-auto">
            {chapter.members} category leaders. Each one holds an exclusive seat in their specialty.
          </Typography>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {specialties.map((s) => {
            const isActive = filter === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  "rounded-pill px-5 py-2 transition-all duration-200",
                  isActive
                    ? "bg-brand-deep text-white shadow-md"
                    : "bg-white text-ink-3 hover:text-ink shadow-sm hover:shadow-md"
                )}
              >
                <Typography
                  as="span"
                  variant="body-sm"
                  className={isActive ? "text-white" : "text-ink-3"}
                >
                  {s}
                </Typography>
              </button>
            );
          })}
        </div>

        {/* Member grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-240">
          {filtered.map((member) => (
            <Card
              key={member.name}
              className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_24px_-12px_rgba(14,58,92,0.1)] flex flex-col h-full border border-line/50 !p-0 gap-0 ring-0"
            >
              {/* Image Section (top half) */}
              <div className="relative h-[320px] w-full shrink-0">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e3a5c]/40 via-[#0e3a5c]/10 to-transparent" />

                {/* Specialty Badge */}
                <div className="absolute top-[16px] left-[16px] bg-white text-brand px-[12px] py-[6px] rounded-pill text-[11px] font-bold shadow-sm flex items-center gap-[6px]">
                  <span className="w-[5px] h-[5px] rounded-full bg-brand" />
                  {member.specialty}
                </div>

                {/* Name and Convention */}
                <CardHeader className="absolute bottom-[16px] left-[20px] right-[20px] flex flex-col p-0 border-none space-y-0">
                  <CardTitle className="m-0 leading-tight">
                    <Typography variant="h5" color="white" className="m-0">
                      {member.name}
                    </Typography>
                  </CardTitle>
                  <CardDescription className="mt-[2px] m-0">
                    <Typography variant="caption" color="white" className="italic m-0">
                      {member.convention}
                    </Typography>
                  </CardDescription>
                </CardHeader>
              </div>

              {/* Content Section (bottom half) */}
              <CardContent className="p-[24px] pb-0 flex flex-col flex-1 border-none shadow-none">
                {/* Meta info */}
                <div className="flex items-center gap-[6px] mb-[16px] tracking-wide text-ink-3">
                  <div className="flex items-center gap-[4px]">
                    <MapPin size={11} className="text-brand" />
                    <Typography as="span" variant="caption" className="text-ink-3">
                      {member.location}
                    </Typography>
                  </div>
                  <span className="text-ink-4 mx-[2px]">&bull;</span>
                  <div className="flex items-center gap-[4px]">
                    <Calendar size={11} className="text-brand" />
                    <Typography as="span" variant="caption" className="text-ink-3">
                      {member.joined}
                    </Typography>
                  </div>
                </div>

                {/* One-liner */}
                <Typography
                  as="p"
                  variant="body-sm"
                  color="ink-3"
                  className="leading-[1.6] line-clamp-3 m-0"
                >
                  {member.oneliner}
                </Typography>
                <div className="flex-1 min-h-[16px]" />
              </CardContent>

              {/* Footer with social icons */}
              <CardFooter className="px-[24px] pb-[10px] pt-[16px] border-t border-line flex items-center gap-[8px] bg-transparent">
                <a
                  href="#"
                  className="w-[28px] h-[28px] rounded-full bg-paper-2 flex items-center justify-center text-ink-3 hover:text-brand hover:bg-brand-soft transition-colors cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-[28px] h-[28px] rounded-full bg-paper-2 flex items-center justify-center text-ink-3 hover:text-brand hover:bg-brand-soft transition-colors cursor-pointer"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-[28px] h-[28px] rounded-full bg-paper-2 flex items-center justify-center text-ink-3 hover:text-brand hover:bg-brand-soft transition-colors cursor-pointer"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
