"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-paper-2">
      <div className="section-container pt-[64px] px-8 pb-[80px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Copy */}
        <div>
          <div className="inline-flex items-center gap-[10px] px-[14px] py-[6px] rounded-pill bg-brand-soft text-brand-2 text-[12px] font-bold tracking-[0.06em] uppercase mb-4">
            <span className="w-[6px] h-[6px] rounded-full bg-brand" />
            NIA Surat · Chapter 01
          </div>
          <h1 className="font-sans text-[clamp(40px,5.4vw,64px)] leading-[1.05] tracking-[-0.025em] font-bold m-0 mb-[22px] text-balance text-brand-deep">
            NIA Innovators.
            <br />
            <span className="italic text-brand font-serif">
              Surat’s room of trusted professionals.
            </span>
          </h1>
          <p className="text-[17.5px] leading-[1.6] text-ink-2 m-0 mb-[28px] max-w-[520px] text-pretty">
            25 category leaders. One chair per specialty. No overlap.
          </p>

          <ul className="list-none p-0 m-0 mb-[32px] grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            {[
              "Weekly meetings, predictable cadence",
              "One member per specialty",
              "Personally vetted by chapter leader",
              "Trusted referrals, real ROI",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-[10px] text-[14.5px] text-ink-2 font-medium"
              >
                <span className="w-[22px] h-[22px] rounded-full bg-brand-soft text-brand grid place-items-center shrink-0">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6.5L4.5 9L10 3.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-[12px]">
            <Button variant="primary" render={<Link href="#apply" />} nativeButton={false}>
              Visit a meeting
            </Button>
            <Button variant="secondary" render={<Link href="#about" />} nativeButton={false}>
              What is NIA?
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-[1.15fr_1fr] grid-rows-2 gap-[12px] aspect-[1.05/1]">
            <div className="row-span-2 rounded-[18px] overflow-hidden bg-paper-3 relative border border-line">
              <Image
                src="https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=700&fit=crop"
                alt="Main chapter group"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="rounded-[18px] overflow-hidden bg-paper-3 border border-line relative">
              <Image
                src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=500&fit=crop&crop=faces"
                alt="Chapter leader"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="rounded-[18px] overflow-hidden bg-brand p-[18px] text-white flex flex-col justify-between relative">
              <div className="text-[11px] opacity-85 font-bold tracking-[0.1em] uppercase">
                Next meeting
              </div>
              <div>
                <div className="font-serif text-[22px] leading-[1.1] tracking-[-0.015em] font-medium">
                  Wed, May 13
                </div>
                <div className="text-[12px] opacity-85 mt-1 font-medium">9:30 — 11:00 AM</div>
              </div>
            </div>
          </div>

          <Link
            href="#schedule"
            className="absolute top-4 right-4 bg-brand-deep text-white py-[10px] px-[16px] rounded-pill text-[12.5px] font-semibold shadow-[0_8px_24px_-8px_rgba(14,58,92,0.4)] inline-flex items-center gap-[8px] hover:bg-brand-deep/90 transition-colors"
          >
            View Schedule
            <span className="w-[18px] h-[18px] rounded-full bg-brand grid place-items-center text-[9px]">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
