"use client";

import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import Typography from "@/components/ui/typography";
import { ScheduleItem, ScheduleSectionProps } from "@/lib/types";

const ScheduleSection = ({ chapterSlug, events = [], chapterVenue = "" }: ScheduleSectionProps) => {
  const [selectedEvent, setSelectedEvent] = useState<ScheduleItem | null>(null);

  const activeEvent = selectedEvent ||
    events[0] || { day: "", date: "", topic: "", rsvps: 0, venue: "" };
  const displayVenue = activeEvent.venue || chapterVenue;
  const selectedSlug = chapterSlug || "innovators";

  // Native Formatter for "Wed, May 13"
  const formatDateLong = (dateStr?: string | Date): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(d);
  };

  // Native Formatter for "May 13"
  const formatDateShort = (dateStr?: string | Date): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(d);
  };

  if (!events || events.length === 0) return null;

  return (
    <section id="schedule" className="bg-paper-2">
      <div className="section-container section-padding grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
        {/* Left Side (Text content) */}
        <div>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.25 rounded-pill bg-brand-soft mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              Meeting Schedule
            </Typography>
          </div>

          <Typography as="h2" variant="h2" color="brand-deep" className="mb-4 text-[48px]!">
            Every Wednesday <span className="italic font-serif text-brand">at 9:30</span>
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
              <Typography as="div" variant="caption" color="ink-4" className="uppercase">
                Venue
              </Typography>
              <Typography as="div" variant="body-sm" color="brand-deep" className="font-bold!">
                {displayVenue || "—"}
              </Typography>
            </div>
          </div>
        </div>

        {/* Right Side (Cards) */}
        <div>
          {/* Main Next Meeting Card */}
          <div className="bg-brand-deep text-white rounded-[18px] p-8 mb-3 relative overflow-hidden transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1.25 bg-brand text-white rounded-pill text-[11px] font-bold tracking-[0.08em] uppercase">
                {selectedEvent && events.indexOf(selectedEvent) === 0
                  ? "Next meeting"
                  : "Selected meeting"}
              </span>
              <span className="text-[11px] text-white/70 font-semibold tracking-[0.04em]">
                {activeEvent.rsvps} {" RSVP'd"}
              </span>
            </div>
            <div className="font-serif text-[clamp(36px,4vw,52px)] leading-none font-semibold tracking-[-0.02em] mb-4">
              {formatDateLong(activeEvent.date)}
            </div>
            <div className="text-[15px] text-white/80 mb-7 leading-normal text-pretty min-h-11.25">
              {activeEvent.topic}
            </div>
            <Link
              href={
                selectedSlug && activeEvent.date
                  ? `?chapter=${selectedSlug}&venue=${encodeURIComponent(displayVenue)}&date=${encodeURIComponent(activeEvent.date)}&topic=${encodeURIComponent(activeEvent.topic)}#StepsSection`
                  : "#StepsSection"
              }
              className="bg-brand text-white border border-brand text-center py-3.25 px-5.5 rounded-pill text-[14px] font-semibold inline-flex items-center gap-2.5 w-full justify-center hover:bg-brand-2 transition-colors"
            >
              <span className="flex items-center justify-center">Request a visitor pass</span>
              <ArrowRight size={15} />
            </Link>{" "}
          </div>

          {/* Sub Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {events.map((item, index) => {
              const label = index === 0 ? "Up next" : `Wk ${index + 1}`;
              const isActive = selectedEvent === item;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedEvent(item)}
                  className={`text-left bg-white border rounded-md py-3 px-3.5 transition-all duration-200 ${
                    isActive
                      ? "border-brand shadow-sm ring-1 ring-brand/20"
                      : "border-line hover:border-brand/40"
                  }`}
                >
                  <div
                    className={`text-[10px] uppercase tracking-[0.08em] font-bold ${isActive ? "text-brand" : "text-ink-4"}`}
                  >
                    {label}
                  </div>
                  <div
                    className={`text-[15px] mt-1 font-bold ${isActive ? "text-brand" : "text-brand-deep"}`}
                  >
                    {formatDateShort(item.date)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
