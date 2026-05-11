"use client";

import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import { MEMBERS } from "@/components/constant/MembersSection.data";
import { Member } from "@/lib/types";
import { MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
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
    <section id="members" className="bg-paper-2">
      <div className="section-container section-padding">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-pill bg-brand-soft px-3 py-1.5 mb-4">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow">THE DIRECTORY</Typography>
          </div>
          <Typography as="h2" variant="h2" color="brand-deep">
            Meet the innovators.
          </Typography>
          <Typography variant="body-md" color="ink-3" className="mt-4 max-w-2xl mx-auto">
            {members.length} category leaders. Each one holds an exclusive seat in their specialty.
          </Typography>
        </div>

        {/* Filter buttons */}
        <div className="flex overflow-x-auto no-scrollbar md:flex-wrap items-center justify-center gap-2 mb-6">
          {specialties.map((s) => {
            const isActive = filter === s;
            return (
              <button
                key={s}
                onClick={() => {
                  setFilter(s);
                  setActiveIndex(0);
                }}
                suppressHydrationWarning
                className={cn(
                  "rounded-pill px-5 py-2 transition-all duration-200 shrink-0 mb-1",
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

        {/* Members List (Responsive: Carousel on Mobile, Grid on Desktop) */}
        <div className="relative -mx-8 px-8 md:mx-0 md:px-0">
          <div
            ref={scrollRef}
            className={cn(
              "flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none",
              "pb-5 -mb-5" // Extra padding to hide scrollbar if it appears
            )}
          >
            {filtered.map((member, i) => (
              <div
                key={member.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="flex-none w-[78%] max-w-80 md:w-full md:max-w-none snap-center"
              >
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile-only Controls & Pagination */}
        <div className="md:hidden mt-10">
          <div className="flex items-center justify-between mt-4.5 px-1">
            <div className="text-sm font-bold tracking-[0.08em] text-ink-3 uppercase">
              {String(activeIndex + 1).padStart(2, "0")}{" "}
              <span className="text-ink-4">/ {String(filtered.length).padStart(2, "0")}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                suppressHydrationWarning
                className="w-10 h-10 rounded-full border border-line bg-white text-brand-deep flex items-center justify-center disabled:opacity-30 transition-all active:scale-95"
                disabled={activeIndex === 0}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollTo(Math.min(filtered.length - 1, activeIndex + 1))}
                suppressHydrationWarning
                className="w-10 h-10 rounded-full bg-brand-deep text-white flex items-center justify-center disabled:opacity-30 transition-all active:scale-95 shadow-md"
                disabled={activeIndex === filtered.length - 1}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Carousel Image Strip */}
          <div
            ref={thumbScrollRef}
            className="flex gap-1.5 px-1 py-2 overflow-x-auto scrollbar-none scroll-smooth mt-3.5 -mx-1 pt-0.5 pb-1.5"
          >
            {filtered.map((member, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={member.id}
                  ref={(el) => {
                    thumbRefs.current[idx] = el;
                  }}
                  onClick={() => scrollTo(idx)}
                  suppressHydrationWarning
                  className={cn(
                    "flex-none w-9 h-9 rounded-full overflow-hidden p-0 transition-all duration-[160ms]",
                    isActive
                      ? "border-2 border-brand opacity-100"
                      : "border-2 border-transparent ring-1 ring-line ring-inset opacity-65"
                  )}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-[0_8px_24px_-12px_rgba(14,58,92,0.1)] flex flex-col h-full border border-line/50 !p-0 gap-0 ring-0">
      {/* Image Section */}
      <div className="relative h-72 sm:h-80 w-full shrink-0 bg-paper-3">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e3a5c]/90 via-[#0e3a5c]/20 to-transparent" />
        <div className="absolute top-4 left-4 bg-white text-brand px-2.5 py-1 rounded-pill text-2.5 font-bold shadow-sm flex items-center gap-[6px] tracking-wide">
          <span className="w-1.25 h-1.25 rounded-full bg-brand" />
          {member.specialty}
        </div>
        <CardHeader className="absolute bottom-4 left-5 right-5 flex flex-col p-0 border-none space-y-0">
          <CardTitle className="m-0 leading-tight">
            <Typography as="span" variant="h5" color="white" className="m-0">
              {member.name}
            </Typography>
          </CardTitle>
          <CardDescription className="mt-0.5 m-0">
            <Typography as="span" variant="caption" color="white" className="italic m-0">
              {member.convention}
            </Typography>
          </CardDescription>
        </CardHeader>
      </div>

      {/* Content Section */}
      <CardContent className="p-6 pb-0 flex flex-col flex-1 border-none shadow-none text-left">
        <div className="flex items-center gap-2 text-ink-4 text-[11px] font-bold mb-4 tracking-wide uppercase">
          <div className="flex items-center gap-1">
            <MapPin size={11} className="text-brand" />
            {member.location}
          </div>
          <span className="text-ink-4 mx-0.5">&bull;</span>
          <div className="flex items-center gap-1">
            <Calendar size={11} className="text-brand" />
            {member.joined}
          </div>
        </div>
        <p className="text-[13px] text-ink-3 leading-[1.6] line-clamp-3 m-0 text-pretty">
          {member.oneliner}
        </p>
        <div className="flex-1 min-h-4" />
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-6 pb-2.5 pt-4 border-t border-line flex items-center gap-2 bg-transparent">
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
            className="w-7 h-7 rounded-full bg-paper-2 flex items-center justify-center text-ink-3 hover:text-brand hover:bg-brand-soft transition-colors cursor-pointer"
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
