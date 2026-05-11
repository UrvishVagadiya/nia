"use client";

import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import { MEMBERS } from "@/constant/MembersSection.data";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import MemberCard from "./MemberCard";

const MembersSection = () => {
  const members = MEMBERS;

  const specialties = useMemo(() => {
    const set = new Set(members.map((m) => m.specialty));
    return ["All", ...Array.from(set).sort()];
  }, [members]);

  const [filter, setFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbScrollRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirstRender = useRef(true);
  const [api, setApi] = useState<CarouselApi>();

  // Filter members based on selected specialty
  const filtered = useMemo(() => {
    return filter === "All" ? members : members.filter((m) => m.specialty === filter);
  }, [filter, members]);
  // Sync thumbnail scroll when activeIndex changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const targetThumb = thumbRefs.current[activeIndex];
    if (targetThumb && thumbScrollRef.current) {
      const container = thumbScrollRef.current;
      const thumb = targetThumb;
      const scrollLeft = thumb.offsetLeft - container.offsetWidth / 2 + thumb.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeIndex]);

  // Handle Carousel API state
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const scrollTo = (index: number) => {
    if (api) {
      api.scrollTo(index);
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
        <div className="flex overflow-x-auto no-scrollbar md:flex-wrap items-center justify-start md:justify-center gap-2 mb-8 px-8 sm:px-12 md:px-0">
          {specialties.map((s) => {
            const isActive = filter === s;
            return (
              <button
                key={s}
                onClick={() => {
                  setFilter(s);
                  scrollTo(0);
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
                  className={`${isActive ? "text-white" : "text-ink-3"} text-[13px]!  font-semibold!`}
                >
                  {s}
                </Typography>
              </button>
            );
          })}
        </div>

        <Carousel
          setApi={setApi}
          plugins={[WheelGesturesPlugin()]}
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
            containScroll: false,
            breakpoints: {
              "(min-width: 768px)": { active: false },
            },
          }}
          className="relative -mx-8 sm:-mx-12 md:mx-0 px-8 sm:px-12 md:px-0"
        >
          <CarouselContent className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 ml-0">
            {filtered.map((member) => (
              <CarouselItem
                key={member.id}
                className="basis-[82%] min-w-73 sm:max-w-80 md:basis-full md:max-w-none pl-0 pr-4 md:pr-0"
              >
                <MemberCard member={member} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

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
};

export default MembersSection;
