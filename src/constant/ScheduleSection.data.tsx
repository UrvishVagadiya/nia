import type { ScheduleItem } from "@/lib/types";

export const VENUE = "Hyatt Regency, Athwa Lines";

export const SCHEDULE: ScheduleItem[] = [
  { day: "Wed", date: "May 13", topic: "Family Business Succession - Open Floor", rsvps: 22 },
  { day: "Wed", date: "May 20", topic: "Open Referral Floor", rsvps: 18 },
  { day: "Wed", date: "May 27", topic: "Guest Speaker: Export Finance", rsvps: 20 },
  { day: "Wed", date: "Jun 3", topic: "Quarterly Review & Planning", rsvps: 24 },
];

export const CHAPTER_VENUES: Record<string, string> = {
  innovators: "Hyatt Regency, Athwa Lines",
  superiors: "HEY, Athwa GATE",
  pioneers: "Hyatt Surat,  Lines",
};

export const CHAPTER_SCHEDULES: Record<string, ScheduleItem[]> = {
  innovators: SCHEDULE,
  superiors: SCHEDULE,
  pioneers: SCHEDULE,
};
