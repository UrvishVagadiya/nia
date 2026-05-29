"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { ScheduleItem, ScheduleSectionProps } from "@/lib/types";
import { useDateFormatter, useSortedEvents } from "@/hooks/date";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/reveal";

const ScheduleSection = ({ chapterSlug, events = [], chapterVenue = "" }: ScheduleSectionProps) => {
  const [selectedEvent, setSelectedEvent] = useState<ScheduleItem | null>(null);
  const { formatDateLong, formatDateShort, getWeekOfMonthLabel, formatWeekday } =
    useDateFormatter();
  const sortedEvents = useSortedEvents(events);

  const activeEvent =
    selectedEvent ||
    sortedEvents[0] ||
    ({ day: "", date: "", topic: "", rsvps: 0, venue: "" } as ScheduleItem);

  const displayVenue = activeEvent.venue || chapterVenue;
  const selectedSlug = chapterSlug || "innovators";

  const meetingWeekday = activeEvent.day || formatWeekday(activeEvent.date);

  if (!sortedEvents || sortedEvents.length === 0) return null;

  return (
    <section id="schedule">
      <div className="section-container section-padding grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
        {/* Left Side (Text content) */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.25 rounded-pill bg-brand-soft mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              Meeting Schedule
            </Typography>
          </div>

          <Typography as="h2" variant="h2" color="brand-deep" className="mb-4 text-[48px]!">
            Every {meetingWeekday || "Wednesday"}{" "}
            <span className="italic font-serif text-brand">at 9:30</span>
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
        </ScrollReveal>

        {/* Right Side (Cards) */}
        <div className="flex flex-col">
          {/* Active Event Card */}
          <ScrollReveal
            delay={0.15}
            className="bg-brand-deep text-white rounded-[18px] p-8 mb-3 relative overflow-hidden transition-all duration-300 min-h-[300px] flex flex-col justify-between"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.date}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col flex-1"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1.25 bg-brand text-white rounded-pill text-[11px] font-bold tracking-[0.08em] uppercase">
                    {!selectedEvent || sortedEvents.indexOf(activeEvent) === 0
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
                <div className="text-[15px] text-white/80 mb-7 leading-normal text-pretty min-h-11.25 flex-1">
                  {activeEvent.topic}
                </div>
              </motion.div>
            </AnimatePresence>

            <Button
              variant="primary"
              render={
                <Link
                  href={
                    selectedSlug && activeEvent.date
                      ? `?chapter=${selectedSlug}&venue=${encodeURIComponent(displayVenue)}&date=${encodeURIComponent(activeEvent.date)}&topic=${encodeURIComponent(activeEvent.topic)}#StepsSection`
                      : "#StepsSection"
                  }
                />
              }
              nativeButton={false}
              className="w-full justify-center mt-auto"
            >
              Request a visitor pass
            </Button>
          </ScrollReveal>

          {/* Schedule Grid buttons */}
          <StaggerContainer staggerDelay={0.06} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {sortedEvents.map((item, index) => {
              const label = index === 0 ? "Up next" : getWeekOfMonthLabel(item.date) || "Wk";
              const isActive = selectedEvent === item;
              return (
                <StaggerItem key={index} direction="up" distance={15}>
                  <Button
                    variant={isActive ? "schedule-active" : "schedule-inactive"}
                    onClick={() => setSelectedEvent(item)}
                    className="w-full h-full"
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
                  </Button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
