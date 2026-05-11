"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Typography from "../ui/typography";
import { HERO_BULLETS, HERO_IMAGES } from "@/components/constant/HeroSection.data";
import { MEMBERS } from "@/components/constant/MembersSection.data";
import { SCHEDULE } from "@/components/constant/ScheduleSection.data";

interface HeroProps {
  chapterNumber: string;
  title: React.ReactNode;
  subtitle: string;
  mainImage?: string;
  leaderImage?: string;
}

export default function HeroSection({
  chapterNumber,
  title,
  subtitle,
  mainImage = HERO_IMAGES.main,
  leaderImage = HERO_IMAGES.leader,
}: HeroProps) {
  return (
    <section className="bg-paper-2 overflow-hidden">
      <div className="section-container section-padding grid grid-col-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Side: Copy */}
        <div>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-brand-soft mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              NIA Surat · {chapterNumber}
            </Typography>
          </div>
          <Typography as="h1" variant="h1" color="brand-deep" className="mb-5.5">
            {title}
          </Typography>
          <Typography variant="body-lg" color="ink-2" className="mb-7">
            {subtitle}
          </Typography>

          <ul className="list-none p-0 m-0 mb-8 grid grid-cols-2 gap-3">
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
                <Typography variant="body-sm" color="ink-2" className="text-[14.5px]!">
                  {item}
                </Typography>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" render={<Link href="#apply" />} nativeButton={false}>
              Visit a meeting
            </Button>
            <Button variant="secondary" render={<Link href="#about" />} nativeButton={false}>
              What is NIA?
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-[1.15fr_1fr] grid-rows-2 gap-3 aspect-[1.05/1]">
            <div className="row-span-2 rounded-[18px] overflow-hidden bg-paper-3 relative border border-line">
              <Image
                src={mainImage}
                alt="Main chapter group"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="rounded-[18px] overflow-hidden bg-paper-3 border border-line relative">
              <Image
                src={leaderImage}
                alt="Chapter leader"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="rounded-[18px] overflow-hidden bg-brand p-4.5 text-white flex flex-col justify-between relative">
              <Typography as="div" variant="caption" color="white" className="opacity-85">
                Next meeting
              </Typography>
              <div>
                <Typography as="div" variant="h5" color="white">
                  {SCHEDULE[0].day}, {SCHEDULE[0].date}
                </Typography>
                <Typography as="div" variant="caption" color="white" className="opacity-85 mt-1">
                  9:30 — 11:00 AM
                </Typography>
              </div>
            </div>
          </div>

          <Link
            href="#schedule"
            className="absolute top-4 right-4 bg-brand-deep text-white py-2.5 px-4 rounded-pill text-[12.5px] font-semibold shadow-[0_8px_24px_-8px_rgba(14,58,92,0.4)] inline-flex items-center gap-2 hover:bg-brand-deep/90 transition-colors"
          >
            View Schedule
            <span className="w-4.5 h-4.5 rounded-full bg-brand grid place-items-center text-[9px]">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
