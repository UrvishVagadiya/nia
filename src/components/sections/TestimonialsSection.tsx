"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Typography from "@/components/ui/typography";

interface Testimonial {
  who: string;
  role: string;
  quote: string;
  photo: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    who: "Hetal Mehta",
    role: "Mehta & Associates · CA",
    quote:
      "I've closed three textile-export deals through warm intros from this room in eight months. NIA Innovators is the highest-leverage hour of my week.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
  },
  {
    who: "Karan Desai",
    role: "Desai Tech · Founder",
    quote:
      "The referral quality here is unmatched. In six months I've built genuine partnerships that my previous network couldn't deliver in years.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
  },
  {
    who: "Anjali Shah",
    role: "Shah Consulting · MD",
    quote:
      "Every meeting brings a warm intro that actually converts. This chapter changed how I think about professional networking entirely.",
    photo:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=faces",
  },
];

interface SlotConfig {
  size: number;
  opacity: number;
  translateY: number;
  borderWidth: number;
  isCenter: boolean;
}

const SLOT_CONFIGS: SlotConfig[] = [
  { size: 44, opacity: 0.55, translateY: 15, borderWidth: 3, isCenter: false },
  { size: 52, opacity: 0.65, translateY: 10, borderWidth: 3, isCenter: false },
  { size: 60, opacity: 0.75, translateY: 5, borderWidth: 3, isCenter: false },
  { size: 84, opacity: 1, translateY: 0, borderWidth: 4, isCenter: true },
  { size: 60, opacity: 0.75, translateY: 5, borderWidth: 3, isCenter: false },
  { size: 52, opacity: 0.65, translateY: 10, borderWidth: 3, isCenter: false },
  { size: 44, opacity: 0.55, translateY: 15, borderWidth: 3, isCenter: false },
];

export default function TestimonialsSection() {
  const testimonials = TESTIMONIALS;
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

  return (
    <section className="bg-paper">
      {/* ✅ Remove overflow-x-hidden from section — it clips the arrow buttons */}
      <div className="section-container py-[88px] px-8">
        {/* ── Heading ── */}
        <div className="text-center flex flex-col items-center mb-14 max-w-[720px] mx-auto">
          <div className="inline-flex items-center gap-[10px] px-[14px] py-[6px] rounded-full bg-brand-soft mb-4">
            <span className="w-[6px] h-[6px] rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              Member voices
            </Typography>
          </div>
          <Typography as="h2" variant="h2" color="brand-deep" className="mb-4">
            What our members say.
          </Typography>
          <Typography variant="body-md" color="ink-3" className="max-w-[620px]">
            Three chapters, eighteen referral stories a year on average — here are a few in their
            own words.
          </Typography>
        </div>

        {/* ── Arc Avatar Row ── */}
        {/* ✅ overflow-x-hidden only on this row to clip avatars, not the card below */}
        <div className="overflow-x-hidden">
          <div className="flex justify-center items-end gap-[14px] mb-12 min-h-[110px]">
            {SLOT_CONFIGS.map((slot, slotIndex) => {
              const offset = slotIndex - 3;
              const tIndex = (((active + offset) % n) + n) % n;
              const t = testimonials[tIndex];

              return (
                <button
                  key={slotIndex}
                  onClick={() => handleManual(tIndex)}
                  aria-label={`Show testimonial from ${t.who}`}
                  className="rounded-full overflow-hidden flex-shrink-0 cursor-pointer p-0 border-none transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
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
                  <Image
                    src={t.photo}
                    alt={t.who}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Testimonial Card wrapper — gives room for the absolute buttons ── */}
        {/*
          ✅ Key fix: wrap the card in a div with horizontal padding equal to
          the button's overflow (≈ 22px half-width = 18px button radius + 4px bleed).
          On mobile, buttons move inside the card instead of overflowing.
        */}
        <div className="max-w-[840px] mx-auto px-6 sm:px-8">
          <div className="relative bg-white border border-line-2/40 rounded-[24px] py-[48px] px-[64px] max-sm:px-8 max-sm:py-8 text-center transition-all duration-500 shadow-none">
            {/* Name */}
            <Typography as="div" variant="h5" color="brand" className="mb-1 italic">
              {current.who}
            </Typography>

            {/* Role */}
            <Typography as="div" variant="eyebrow" color="ink-3" className="mb-8">
              {current.role}
            </Typography>

            {/* Quote */}
            <Typography as="p" variant="body-md" color="ink-2" className="max-w-[680px] mx-auto">
              &ldquo;{current.quote}&rdquo;
            </Typography>

            {/* ✅ Prev arrow — negative translate pulls it outside the card,
                but the parent px-6/px-8 wrapper ensures it never overflows the viewport */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
              <button
                onClick={() => {
                  prev();
                  setAutoKey((k) => k + 1);
                }}
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center
                           border-none cursor-pointer hover:bg-brand-2 transition-colors p-0
                           shadow-[0_6px_16px_-4px_rgba(46,157,219,0.4)]"
              >
                <span className="text-[24px] leading-none">‹</span>
              </button>
            </div>

            {/* ✅ Next arrow — same pattern on the right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
              <button
                onClick={() => {
                  next();
                  setAutoKey((k) => k + 1);
                }}
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center
                           border-none cursor-pointer hover:bg-brand-2 transition-colors p-0
                           shadow-[0_6px_16px_-4px_rgba(46,157,219,0.4)]"
              >
                <span className="text-[24px] leading-none">›</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex justify-center gap-[6px] mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleManual(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={[
                "rounded-[4px] border-none p-0 cursor-pointer transition-all duration-200",
                i === active
                  ? "w-[24px] h-[8px] bg-brand"
                  : "w-[8px] h-[8px] bg-line-2 hover:bg-ink-4",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
