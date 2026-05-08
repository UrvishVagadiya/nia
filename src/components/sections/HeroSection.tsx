"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Typography from "../ui/typography";
import { HERO_BULLETS } from "../constant/HeroSection.data";

export default function HeroSection() {
  return (
    <section className="bg-paper-2">
      <div className="section-container pt-[64px] px-8 pb-[80px] grid grid-col-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Side: Copy */}
        <div>
          <div className="inline-flex items-center gap-[10px] px-[14px] py-[6px] rounded-pill bg-brand-soft mb-4">
            <span className="w-[6px] h-[6px] rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              NIA Surat · Chapter 01
            </Typography>
          </div>
          <Typography as="h1" variant="h1" color="brand-deep" className="mb-[22px]">
            <span className="italic text-brand font-serif">
              Surat’s room of trusted professionals.
            </span>
          </Typography>
          <Typography variant="body-lg" color="ink-2" className="mb-[28px]">
            25 category leaders. One chair per specialty. No overlap.
          </Typography>

          <ul className="list-none p-0 m-0 mb-[32px] grid grid-cols-2 gap-[12px]">
            {HERO_BULLETS.map((item, idx) => (
              <li key={idx} className="flex items-center gap-[10px]">
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
                <Typography variant="body-sm" color="ink-2">
                  {item}
                </Typography>
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
              <Typography as="div" variant="caption" color="white" className="opacity-85">
                Next meeting
              </Typography>
              <div>
                <Typography as="div" variant="h5" color="white">
                  Wed, May 13
                </Typography>
                <Typography as="div" variant="caption" color="white" className="opacity-85 mt-1">
                  9:30 — 11:00 AM
                </Typography>
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
