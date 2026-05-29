"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Typography from "../ui/typography";
import type { HeroProps } from "@/lib/types";
import { motion, type Easing } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const EASE_PRESET: [number, number, number, number] = [0.22, 1, 0.36, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_PRESET satisfies Easing,
    },
  },
};

const HeroSection = ({
  chapterNumber,
  chapterName,
  subtitle,
  caption,
  bullets = [],
  mainImage,
  leaderImage,
  nextEvent,
}: HeroProps) => {
  const mainUrl =
    (typeof mainImage === "object" ? mainImage.url : mainImage) ||
    "https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=700&fit=crop";
  const leaderUrl =
    (typeof leaderImage === "object" ? leaderImage.url : leaderImage) ||
    "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=500&fit=crop&crop=faces";

  // Native Formatter for "Wed, May 13"
  const formatDateLong = (dateStr?: string | Date): string => {
    if (!dateStr) return "TBA";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr);
    try {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(d);
    } catch {
      return String(dateStr);
    }
  };

  // Native Formatter for "9:30 — 11:00 AM"
  const formatTimeRange = (startStr?: string | Date, endStr?: string | Date): string => {
    if (!startStr || !endStr) return "9:30 — 11:00 AM";

    const start = new Date(startStr);
    const end = new Date(endStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "9:30 — 11:00 AM";
    }

    try {
      const startTimeStr = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      }).format(start);

      const endTimeStr = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(end);

      return `${startTimeStr} — ${endTimeStr}`;
    } catch {
      return "9:30 — 11:00 AM";
    }
  };

  return (
    <section className="overflow-hidden">
      <div className="section-container section-padding grid grid-col-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Side: Copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-brand-soft mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              <Typography variant="eyebrow" color="brand-2">
                NIA Surat · {chapterNumber}
              </Typography>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography as="h1" variant="h1" color="brand-deep" className="mb-1">
              NIA {chapterName}.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="h1" color="brand" className="italic mb-5.5">
              {subtitle}
            </Typography>
          </motion.div>

          {caption && (
            <motion.div variants={itemVariants}>
              <Typography variant="body-lg" color="ink-2" className="mb-7">
                {caption}
              </Typography>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <ul className="list-none p-0 m-0 mb-8 grid grid-cols-2 gap-3">
              {(bullets || []).map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <span className="w-5.5 h-5.5 rounded-full bg-brand-soft text-brand grid place-items-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <Typography variant="body-sm" color="ink-2" className="text-[14.5px]!">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" render={<Link href="#apply" />} nativeButton={false}>
                Visit a meeting
              </Button>
              <Button variant="secondary" render={<Link href="#about" />} nativeButton={false}>
                What is NIA?
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Visuals */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="relative"
        >
          <div className="grid grid-cols-[1.15fr_1fr] grid-rows-2 gap-3 aspect-[1.05/1]">
            <div className="row-span-2 rounded-[18px] overflow-hidden bg-paper-3 relative border border-line w-full h-full">
              <Image
                src={mainUrl}
                alt="Main chapter group"
                fill
                priority
                fetchPriority="high"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="rounded-[18px] overflow-hidden bg-paper-3 border border-line relative w-full h-full">
              <Image
                src={leaderUrl}
                alt="Chapter leader"
                fill
                priority
                fetchPriority="high"
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
                  {nextEvent ? formatDateLong(nextEvent.date) : "TBA"}
                </Typography>
                <Typography as="div" variant="caption" color="white" className="opacity-85 mt-1">
                  {nextEvent
                    ? formatTimeRange(nextEvent.startTime, nextEvent.endTime)
                    : "9:30 — 11:00 AM"}
                </Typography>
              </div>
            </div>
          </div>

          <Link
            href="#schedule"
            className="absolute top-4 right-4 bg-brand-deep text-white py-2.5 px-4 rounded-pill text-[12.5px] font-semibold shadow-[0_8px_24px_-8px_rgba(14,58,92,0.4)] inline-flex items-center gap-2 hover:bg-brand-deep/90 transition-colors"
          >
            View Schedule
            <ArrowRight className="bg-brand rounded-full h-5 w-5 p-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
