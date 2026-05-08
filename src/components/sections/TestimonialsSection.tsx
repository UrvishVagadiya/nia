"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useChapter } from "@/lib/chapter-context";
import { TESTIMONIALS_BY_CHAPTER } from "@/lib/data";
import { Card } from "@/components/ui/card";

export default function TestimonialsSection() {
  const { activeChapterId } = useChapter();
  const testimonials = TESTIMONIALS_BY_CHAPTER[activeChapterId] || [];
  const [active, setActive] = useState(0);
  const [prevChapterId, setPrevChapterId] = useState(activeChapterId);

  // Reset when chapter changes (using derived state instead of effect)
  if (activeChapterId !== prevChapterId) {
    setPrevChapterId(activeChapterId);
    setActive(0);
  }

  const nextItem = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevItem = useCallback(() => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, [testimonials.length]);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(nextItem, 8000);
    return () => clearInterval(timer);
  }, [nextItem]);

  const current = testimonials[active];
  if (!current) return null;

  return (
    <section className="bg-paper-2">
      <div className="section-container py-[88px] px-8">
        {/* Heading */}
        <div className="text-center flex flex-col items-center mb-[56px] max-w-[720px] mx-auto">
          <div className="inline-flex items-center gap-[10px] px-[14px] py-[6px] rounded-pill bg-brand-soft text-brand-2 text-[12px] font-bold tracking-[0.06em] uppercase mb-4">
            <span className="w-[6px] h-[6px] rounded-full bg-brand" />
            Member voices
          </div>
          <h2 className="font-sans text-[clamp(34px,4.4vw,52px)] leading-[1.1] tracking-[-0.025em] font-bold m-0 text-brand-deep text-balance">
            What our members say.
          </h2>
          <p className="text-[17px] leading-[1.6] text-ink-3 mt-[18px] mb-0 max-w-[620px] text-pretty">
            Three chapters, eighteen referral stories a year on average — here are a few in their
            own words.
          </p>
        </div>

        {/* Avatar Carousel Row */}
        <div className="flex justify-center items-center gap-[18px] mb-[32px] relative min-h-[100px]">
          {testimonials.map((t, i) => {
            // Determine shortest circular distance
            const n = testimonials.length;
            const distRight = (i - active + n) % n;
            const distLeft = (active - i + n) % n;
            const distance = Math.min(distRight, distLeft);

            let size = "w-[84px] h-[84px]";
            let border = "border-4 border-brand";
            let shadow = "shadow-[0_8px_20px_-6px_rgba(46,157,219,0.45)]";
            let transform = "translate-y-[0px]";
            let opacity = "opacity-100";

            if (distance === 1) {
              size = "w-[52px] h-[52px]";
              border = "border-[3px] border-white";
              shadow = "shadow-[0_4px_12px_-4px_rgba(14,58,92,0.2)]";
              transform = "translate-y-[5px]";
              opacity = "opacity-75";
            } else if (distance === 2) {
              size = "w-[48px] h-[48px]";
              border = "border-[3px] border-white";
              shadow = "shadow-[0_4px_12px_-4px_rgba(14,58,92,0.2)]";
              transform = "translate-y-[10px]";
              opacity = "opacity-65";
            } else if (distance >= 3) {
              size = "w-[44px] h-[44px]";
              border = "border-[3px] border-white";
              shadow = "shadow-[0_4px_12px_-4px_rgba(14,58,92,0.2)]";
              transform = "translate-y-[15px]";
              opacity = "opacity-55";
            }

            return (
              <button
                key={t.who + i}
                onClick={() => setActive(i)}
                aria-label={`Show testimonial from ${t.who}`}
                className={`rounded-full overflow-hidden shrink-0 cursor-pointer transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] p-0 ${size} ${border} ${shadow} ${transform} ${opacity}`}
              >
                <Image
                  src={t.photo}
                  alt={t.who}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* Main Testimonial Card */}
        <Card className="max-w-[720px] mx-auto bg-white border border-line rounded-[18px] py-[36px] px-[48px] text-center relative transition-all duration-350 shadow-none">
          <div className="font-serif italic text-[16px] text-brand mb-2 font-semibold">
            {current.who}
          </div>
          <div className="text-[12.5px] text-ink-4 mb-5 font-semibold tracking-[0.04em] uppercase">
            {current.role}
          </div>
          <p className="text-[17px] leading-[1.65] text-ink-2 m-0 text-pretty">
            &quot;{current.quote}&quot;
          </p>

          <div className="absolute left-[-16px] top-1/2 -translate-y-1/2">
            <button
              onClick={prevItem}
              aria-label="Previous testimonial"
              className="w-[36px] h-[36px] rounded-full bg-brand text-white grid place-items-center shadow-[0_4px_12px_-4px_rgba(46,157,219,0.5)] cursor-pointer pb-1 text-[20px] hover:bg-brand-2 transition-colors border-none"
            >
              ‹
            </button>
          </div>
          <div className="absolute right-[-16px] top-1/2 -translate-y-1/2">
            <button
              onClick={nextItem}
              aria-label="Next testimonial"
              className="w-[36px] h-[36px] rounded-full bg-brand text-white grid place-items-center shadow-[0_4px_12px_-4px_rgba(46,157,219,0.5)] cursor-pointer pb-1 text-[20px] hover:bg-brand-2 transition-colors border-none"
            >
              ›
            </button>
          </div>
        </Card>

        {/* Dots */}
        <div className="flex justify-center gap-[6px] mt-[24px]">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`rounded-[4px] transition-all duration-200 border-none p-0 cursor-pointer ${
                i === active
                  ? "w-[24px] h-[8px] bg-brand"
                  : "w-[8px] h-[8px] bg-line-2 hover:bg-ink-4"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
