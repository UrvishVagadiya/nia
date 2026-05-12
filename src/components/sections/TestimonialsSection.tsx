"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import Typography from "@/components/ui/typography";
import { TESTIMONIALS, SLOT_CONFIGS } from "@/constant/TestimonialsSection.data";
import { Testimonial } from "@/lib/types";

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const TestimonialsSection = ({ testimonials: cmsTestimonials }: TestimonialsSectionProps) => {
  // Use CMS testimonials if provided, otherwise fallback to static constants
  const testimonials = useMemo(() => {
    if (cmsTestimonials && cmsTestimonials.length > 0) {
      return cmsTestimonials;
    }
    return TESTIMONIALS;
  }, [cmsTestimonials]);

  const [active, setActive] = useState(0);
  const n = testimonials.length;

  const next = useCallback(() => setActive((p) => (p + 1) % n), [n]);
  const prev = useCallback(() => setActive((p) => (p - 1 + n) % n), [n]);

  const [autoKey, setAutoKey] = useState(0);
  useEffect(() => {
    const id = setInterval(next, 8000);
    return () => clearInterval(id);
  }, [next, autoKey]);

  const handleManual = (idx: number) => {
    setActive(idx);
    setAutoKey((k) => k + 1);
  };

  const current = testimonials[active];

  if (!current) return null;

  return (
    <section className="bg-paper">
      <div className="section-container section-padding">
        {/* ── Heading ── */}
        <div className="text-center flex flex-col items-center mb-14 max-w-180 mx-auto">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-soft mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              Member voices
            </Typography>
          </div>
          <Typography as="h2" variant="h2" color="brand-deep" className="mb-4">
            What our members say.
          </Typography>
          <Typography variant="body-md" color="ink-3" className="max-w-155">
            Three chapters, eighteen referral stories a year on average — here are a few in their
            own words.
          </Typography>
        </div>

        {/* ── Arc Avatar Row ── */}
        <div className="overflow-x-hidden">
          <div className="flex justify-center items-end gap-3.5 mb-12 min-h-27.5">
            {(() => {
              const displayCount = Math.min(n, 7);
              const configStartIndex = Math.max(0, 3 - Math.floor(displayCount / 2));
              const activeConfigs = SLOT_CONFIGS.slice(
                configStartIndex,
                configStartIndex + displayCount
              );

              return activeConfigs.map((slot, i) => {
                const centerInSub = Math.floor(displayCount / 2);
                const offset = i - centerInSub;
                const tIndex = (((active + offset) % n) + n) % n;
                const t = testimonials[tIndex];

                return (
                  <button
                    key={i}
                    onClick={() => handleManual(tIndex)}
                    aria-label={`Show testimonial from ${t.who}`}
                    suppressHydrationWarning
                    className="rounded-full overflow-hidden shrink-0 cursor-pointer p-0 border-none transition-all duration-350ms ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      width: slot.size,
                      height: slot.size,
                      opacity: slot.opacity,
                      transform: `translateY(${slot.translateY}px)`,
                      border: slot.isCenter
                        ? "2px solid #2e9ddb"
                        : `${slot.borderWidth}px solid #ffffff`,
                      boxShadow: slot.isCenter
                        ? "0 0 0 3px #2e9ddb, 0 8px 24px -6px rgba(46,157,219,0.5)"
                        : "0 4px 12px -4px rgba(14,58,92,0.2)",
                      zIndex: slot.isCenter ? 10 : 0,
                    }}
                  >
                    {t.photo && (
                      <Image
                        src={t.photo}
                        alt={t.who}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                );
              });
            })()}
          </div>
        </div>

        {/* ── Testimonial Card wrapper ── */}
        <div className="relative max-w-210 mx-auto px-6 sm:px-8">
          <div className="bg-white border border-line-2/40 rounded-[24px] py-12 px-16 max-sm:px-8 max-sm:py-8 text-center transition-all duration-500 shadow-none">
            {/* Name */}
            <Typography as="div" variant="h5" color="brand" className="mb-1 italic">
              {current.who}
            </Typography>

            {/* Role */}
            <Typography as="div" variant="eyebrow" color="ink-3" className="mb-8">
              {current.role}
            </Typography>

            {/* Quote */}
            <Typography as="p" variant="body-md" color="ink-2" className="max-w-170 mx-auto">
              &ldquo;{current.quote}&rdquo;
            </Typography>
          </div>

          {/* Prev arrow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <button
              onClick={() => {
                prev();
                setAutoKey((k) => k + 1);
              }}
              aria-label="Previous testimonial"
              suppressHydrationWarning
              className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center border-none cursor-pointer hover:bg-brand-2 transition-colors p-0 shadow-[0_6px_16px_-4px_rgba(46,157,219,0.4)]"
            >
              <span className="text-[24px] leading-none">‹</span>
            </button>
          </div>

          {/* Next arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
            <button
              onClick={() => {
                next();
                setAutoKey((k) => k + 1);
              }}
              aria-label="Next testimonial"
              suppressHydrationWarning
              className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center border-none cursor-pointer hover:bg-brand-2 transition-colors p-0 shadow-[0_6px_16px_-4px_rgba(46,157,219,0.4)]"
            >
              <span className="text-[24px] leading-none">›</span>
            </button>
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex justify-center gap-1.5 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleManual(i)}
              aria-label={`Show testimonial ${i + 1}`}
              suppressHydrationWarning
              className={[
                "rounded-[4px] border-none p-0 cursor-pointer transition-all duration-200",
                i === active ? "w-6 h-2 bg-brand" : "w-2 h-2 bg-line-2 hover:bg-ink-4",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
