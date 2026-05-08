"use client";

import { useChapter } from "@/lib/chapter-context";
import { SCHEDULE_BY_CHAPTER } from "@/lib/data";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default function ScheduleSection() {
  const { activeChapterId, chapter } = useChapter();
  const schedule = SCHEDULE_BY_CHAPTER[activeChapterId] || [];

  if (schedule.length === 0) return null;

  const nextMeeting = schedule[0];

  return (
    <section id="schedule" className="bg-paper-2">
      <div className="section-container py-[88px] px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
        {/* Left Side (Text content) */}
        <div>
          <div className="inline-flex items-center gap-[10px] px-[14px] py-[6px] rounded-pill bg-brand-soft text-brand-2 text-[12px] font-bold tracking-[0.06em] uppercase mb-4">
            <span className="w-[6px] h-[6px] rounded-full bg-brand" />
            Meeting Schedule
          </div>

          <h2 className="font-sans text-[clamp(34px,4vw,48px)] leading-[1.1] tracking-[-0.025em] font-bold mb-4 text-brand-deep text-balance">
            {chapter.meetingDay}{" "}
            <span className="italic font-serif text-brand">
              at {chapter.meetingTime.split("—")[0].trim()}
            </span>
          </h2>

          <p className="text-[17px] leading-[1.6] text-ink-2 mb-6 max-w-[480px] text-pretty">
            Same time, same room, every week. Sixty-second updates, one specific referral ask each —
            no slide decks.
          </p>

          {/* Venue Pill */}
          <div className="inline-flex items-center gap-[14px] px-[18px] py-[14px] rounded-pill bg-white border border-line">
            <span className="w-[36px] h-[36px] rounded-full bg-brand-soft text-brand-2 grid place-items-center shrink-0">
              <MapPin size={16} strokeWidth={1.6} />
            </span>
            <div>
              <div className="text-[11px] text-ink-4 uppercase tracking-[0.1em] font-bold">
                Venue
              </div>
              <div className="text-[14px] font-bold text-brand-deep">{chapter.venue}</div>
            </div>
          </div>
        </div>

        {/* Right Side (Cards) */}
        <div>
          {/* Main Next Meeting Card */}
          <div className="bg-brand-deep text-white rounded-[18px] p-8 mb-3 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-[5px] bg-brand text-white rounded-pill text-[11px] font-bold tracking-[0.08em] uppercase">
                Next meeting
              </span>
              <span className="text-[11px] text-white/70 font-semibold tracking-[0.04em]">
                {nextMeeting.rsvps} RSVP&apos;d
              </span>
            </div>

            <div className="font-serif text-[clamp(36px,4vw,52px)] leading-none font-semibold tracking-[-0.02em] mb-4">
              {nextMeeting.day}, {nextMeeting.date}
            </div>

            <div className="text-[15px] text-white/80 mb-7 leading-[1.5] text-pretty">
              {nextMeeting.topic}
            </div>

            <Link
              href="#apply"
              className="bg-brand text-white border border-brand py-[13px] px-[22px] rounded-pill text-[14px] font-semibold inline-flex items-center gap-[10px] w-full justify-center hover:bg-brand-2 transition-colors"
            >
              Request a visitor pass
              <span className="w-6 h-6 rounded-full bg-white/20 text-white grid place-items-center text-[12px]">
                &rarr;
              </span>
            </Link>
          </div>

          {/* Sub Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {schedule.map((item, index) => {
              const label = index === 0 ? "Up next" : `Wk ${index + 1}`;
              return (
                <div
                  key={index}
                  className="bg-white border border-line rounded-[12px] py-3 px-[14px]"
                >
                  <div className="text-[10px] text-ink-4 uppercase tracking-[0.08em] font-bold">
                    {label}
                  </div>
                  <div className="text-[15px] mt-1 font-bold text-brand-deep">{item.date}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
