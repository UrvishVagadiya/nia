"use client";

import { SCHEDULE } from "@/components/constant/ScheduleSection.data";
import { MapPin } from "lucide-react";
import Link from "next/link";
import Typography from "@/components/ui/typography";

export default function ScheduleSection() {
  const schedule = SCHEDULE;
  const nextMeeting = schedule[0];

  return (
    <section id="schedule" className="bg-paper-2">
      <div className="section-container py-22 px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
        {/* Left Side (Text content) */}
        <div>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.25 rounded-pill bg-brand-soft mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              Meeting Schedule
            </Typography>
          </div>

          <Typography as="h2" variant="h2" color="brand-deep" className="mb-4">
            Every Wednesday <span className="italic font-serif text-brand">at 9:30 AM</span>
          </Typography>

          <Typography variant="body-md" color="ink-2" className="mb-6 max-w-120">
            Same time, same room, every week. Sixty-second updates, one specific referral ask each —
            no slide decks.
          </Typography>

          {/* Venue Pill */}
          <div className="inline-flex items-center gap-3.5 px-4.5 py-3.5 rounded-pill bg-white border border-line">
            <span className="w-9 h-9 rounded-full bg-brand-soft text-brand-2 grid place-items-center shrink-0">
              <MapPin size={16} strokeWidth={1.6} />
            </span>
            <div>
              <Typography as="div" variant="caption" color="ink-4">
                Venue
              </Typography>
              <Typography as="div" variant="body-sm" color="brand-deep">
                Hyatt Regency, Athwa Lines
              </Typography>
            </div>
          </div>
        </div>

        {/* Right Side (Cards) */}
        <div>
          {/* Main Next Meeting Card */}
          <div className="bg-brand-deep text-white rounded-[18px] p-8 mb-3 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1.25 bg-brand text-white rounded-pill text-[11px] font-bold tracking-[0.08em] uppercase">
                Next meeting
              </span>
              <span className="text-[11px] text-white/70 font-semibold tracking-[0.04em]">
                {nextMeeting.rsvps} {" RSVP'd"}
              </span>
            </div>

            <div className="font-serif text-[clamp(36px,4vw,52px)] leading-none font-semibold tracking-[-0.02em] mb-4">
              {nextMeeting.day}, {nextMeeting.date}
            </div>

            <div className="text-[15px] text-white/80 mb-7 leading-normal text-pretty">
              {nextMeeting.topic}
            </div>

            <Link
              href="#apply"
              className="bg-brand text-white border border-brand py-3.25 px-5.5 rounded-pill text-[14px] font-semibold inline-flex items-center gap-2.5 w-full justify-center hover:bg-brand-2 transition-colors"
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
                <div key={index} className="bg-white border border-line rounded-md py-3 px-3.5">
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
