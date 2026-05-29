import { useMemo } from "react";
import { ScheduleItem } from "@/lib/types";

export const useDateFormatter = () => {
  // Native Formatter for "Wed, May 13"
  const formatDateLong = (dateStr?: string | Date): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
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
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(d);
  };

  const getWeekOfMonthLabel = (dateStr?: string | Date): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";

    const weekOfMonth = Math.ceil(d.getDate() / 7);
    return `Wk ${weekOfMonth}`;
  };

  const formatWeekday = (dateStr?: string | Date): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(d);
  };

  return {
    formatDateLong,
    formatDateShort,
    getWeekOfMonthLabel,
    formatWeekday,
  };
};

export const useSortedEvents = (events: ScheduleItem[]) => {
  return useMemo(() => {
    if (!events) return [];
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events]);
};
