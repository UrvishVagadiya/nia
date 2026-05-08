"use client";

import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import { MEMBERS } from "../constant/MembersSection.data";
import { Member } from "@/lib/types";
import { MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function MembersSection() {
  const members = MEMBERS;

  const specialties = useMemo(() => {
    const set = new Set(members.map((m) => m.specialty));
    return ["All", ...Array.from(set).sort()];
  }, [members]);

  const [filter, setFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbScrollRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirstRender = useRef(true);

  // Filter members based on selected specialty
  const filtered = useMemo(() => {
    return filter === "All" ? members : members.filter((m) => m.specialty === filter);
  }, [filter, members]);

  // Reset active index when filter changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0 });
    }
    if (thumbScrollRef.current) {
      thumbScrollRef.current.scrollTo({ left: 0 });
    }
  }, [filter]);

  // Sync thumbnail scroll when activeIndex changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const targetThumb = thumbRefs.current[activeIndex];
    if (targetThumb) {
      targetThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex]);

  // Use Intersection Observer for robust active index tracking
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || window.innerWidth >= 768) return;

    const options = {
      root: container,
      threshold: 0.6, // Card must be 60% visible to be considered active
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    }, options);

    const currentCards = cardRefs.current;
    currentCards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      currentCards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [filtered, filter]);

  const scrollTo = (index: number) => {
    const targetCard = cardRefs.current[index];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section id="members" className="bg-paper-2 py-[88px]">
      <div className="max-w-[1280px] mx-auto px-[32px]">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-pill bg-brand-soft px-3 py-1.5 eyebrow-text mb-4">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            The Directory
          </div>
          <h2 className="text-[clamp(34px,4.4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-brand-deep">
            Meet the innovators.
          </h2>
          <p className="text-[17px] leading-[1.6] text-ink-3 mt-[18px] mb-0 max-w-[620px] text-pretty">
            {members.length} category leaders. Each one holds an exclusive seat in their specialty.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-[6px] mb-[24px]">
          {specialties.map((s) => {
            const isActive = filter === s;
            return (
              <button
                key={s}
                onClick={() => {
                  setFilter(s);
                  setActiveIndex(0);
                }}
                className={cn(
                  "px-[14px] py-[8px] rounded-pill text-[13px] font-[600] transition-all duration-200 whitespace-nowrap border",
                  isActive
                    ? "bg-brand-deep text-white shadow-md"
                    : "bg-white text-ink-3 hover:text-ink shadow-sm hover:shadow-md"
                )}
              >
                {s}
              </button>
            );
          })}
        </div>

        {/* Members List (Responsive: Carousel on Mobile, Grid on Desktop) */}
        <div className="relative -mx-[32px] px-[32px] md:mx-0 md:px-0">
          <div
            ref={scrollRef}
            className={cn(
              "flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[14px] md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none",
              "pb-[20px] -mb-[20px]" // Extra padding to hide scrollbar if it appears
            )}
          >
            {filtered.map((member, i) => (
              <div
                key={member.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="flex-none w-[78%] max-w-[320px] md:w-full md:max-w-none snap-center"
              >
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile-only Controls & Pagination */}
        <div className="md:hidden mt-[40px]">
          <div className="flex items-center justify-between mt-[18px] px-1">
            <div className="text-[12px] font-[700] tracking-[0.08em] text-ink-3 uppercase">
              {String(activeIndex + 1).padStart(2, "0")}{" "}
              <span className="text-ink-4">/ {String(filtered.length).padStart(2, "0")}</span>
            </div>
            <div className="flex gap-[8px]">
              <button
                onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                className="w-[40px] h-[40px] rounded-full border border-line bg-white text-brand-deep flex items-center justify-center disabled:opacity-30 transition-all active:scale-95"
                disabled={activeIndex === 0}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollTo(Math.min(filtered.length - 1, activeIndex + 1))}
                className="w-[40px] h-[40px] rounded-full bg-brand-deep text-white flex items-center justify-center disabled:opacity-30 transition-all active:scale-95 shadow-md"
                disabled={activeIndex === filtered.length - 1}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Carousel Image Strip */}
          <ScrollArea className="w-full">
            <div
              ref={thumbScrollRef}
              className="flex gap-[6px] px-1 py-2 overflow-x-auto scrollbar-none scroll-smooth"
            >
              {filtered.map((member, idx) => (
                <button
                  key={member.id}
                  ref={(el) => {
                    thumbRefs.current[idx] = el;
                  }}
                  onClick={() => scrollTo(idx)}
                  className={cn(
                    "relative w-[48px] h-[48px] rounded-full overflow-hidden flex-shrink-0 transition-all duration-300",
                    activeIndex === idx
                      ? "ring-2 ring-brand ring-offset-2 scale-110 opacity-100 z-10"
                      : "opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0"
                  )}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <Card className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_24px_-12px_rgba(14,58,92,0.1)] flex flex-col h-full border border-line/50 !p-0 gap-0 ring-0">
      {/* Image Section */}
      <div className="relative h-[280px] sm:h-[320px] w-full shrink-0 bg-paper-3">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e3a5c]/90 via-[#0e3a5c]/20 to-transparent" />
        <div className="absolute top-[16px] left-[16px] bg-white text-brand px-[10px] py-[5px] rounded-pill text-[10.5px] font-bold shadow-sm flex items-center gap-[6px] tracking-wide">
          <span className="w-[5px] h-[5px] rounded-full bg-brand" />
          {member.specialty}
        </div>
        <CardHeader className="absolute bottom-[16px] left-[20px] right-[20px] flex flex-col p-0 border-none space-y-0 text-left">
          <CardTitle className="text-white text-[18px] font-[700] tracking-tight m-0 leading-tight">
            {member.name}
          </CardTitle>
          <CardDescription className="text-white/85 text-[13px] font-[500] italic mt-[2px] m-0">
            {member.convention}
          </CardDescription>
        </CardHeader>
      </div>

      {/* Content Section */}
      <CardContent className="p-[24px] pb-0 flex flex-col flex-1 border-none shadow-none text-left">
        <div className="flex items-center gap-[6px] text-ink-3 text-[11px] font-[600] mb-[16px] tracking-wide">
          <div className="flex items-center gap-[4px]">
            <MapPin size={11} className="text-brand" />
            {member.location}
          </div>
          <span className="text-ink-4 mx-[2px]">&bull;</span>
          <div className="flex items-center gap-[4px]">
            <Calendar size={11} className="text-brand" />
            {member.joined}
          </div>
        </div>
        <p className="text-[13px] text-ink-3 leading-[1.6] line-clamp-3 m-0 text-pretty">
          {member.oneliner}
        </p>
        <div className="flex-1 min-h-[16px]" />
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-[24px] pb-[10px] pt-[16px] border-t border-line flex items-center gap-[8px] bg-transparent">
        {[
          {
            icon: "linkedin",
            path: "M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM20.45 20.45h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z",
          },
          { icon: "instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" },
          {
            icon: "web",
            path: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
          },
        ].map((social, idx) => (
          <a
            key={idx}
            href="#"
            className="w-[28px] h-[28px] rounded-full bg-paper-2 flex items-center justify-center text-ink-3 hover:text-brand hover:bg-brand-soft transition-colors cursor-pointer"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill={social.icon === "linkedin" ? "currentColor" : "none"}
              stroke={social.icon === "linkedin" ? "none" : "currentColor"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {social.icon === "instagram" && (
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              )}
              {social.icon === "web" && <circle cx="12" cy="12" r="10"></circle>}
              {social.icon === "web" && <line x1="2" y1="12" x2="22" y2="12"></line>}
              <path d={social.path} />
              {social.icon === "instagram" && <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>}
            </svg>
          </a>
        ))}
      </CardFooter>
    </Card>
  );
}
