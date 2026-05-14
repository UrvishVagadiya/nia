import { ScheduleItem } from "@/lib/types";

/**
 * Returns the next upcoming event from a list of ScheduleItem.
 * - Prefer events on or after today.
 * - If no future events found, returns the first event as fallback or undefined.
 */
export function getNextEvent(events: ScheduleItem[] = []): ScheduleItem | undefined {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const parsed = events
    .map((e) => {
      const raw = e.date || "";
      let ts = Date.parse(raw);

      if (isNaN(ts)) {
        // Try parsing with the current year appended (e.g. "Apr 10" -> "Apr 10 2026")
        ts = Date.parse(`${raw} ${now.getFullYear()}`);
      }

      const dateObj = isNaN(ts) ? null : new Date(ts);
      return { event: e, dateObj };
    })
    .filter((p) => p.dateObj !== null && (p.dateObj as Date) >= startOfToday)
    .sort((a, b) => (a.dateObj as Date).getTime() - (b.dateObj as Date).getTime());

  if (parsed.length > 0) return parsed[0].event;
  return events.length > 0 ? events[0] : undefined;
}

export default getNextEvent;
