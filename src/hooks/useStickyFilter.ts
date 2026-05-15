"use client";
import { useState, useEffect, useCallback } from "react";

/**
 * A custom hook to persist filter state in localStorage.
 * Optimized to minimize the "flash" of initial state.
 */
export function useStickyFilter(
  key: string,
  initialValue: string = "All",
  validOptions?: string[]
) {
  // Initialize state directly from localStorage if available (client-side only)
  const [filter, setFilter] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(key);
        if (saved) {
          if (validOptions && !validOptions.includes(saved)) {
            return initialValue;
          }
          return saved;
        }
      } catch (e) {}
    }
    return initialValue;
  });

  // Keep localStorage in sync when filter changes
  const updateFilter = useCallback(
    (newValue: string) => {
      setFilter(newValue);
      try {
        localStorage.setItem(key, newValue);
      } catch (e) {}
    },
    [key]
  );

  // Secondary sync in case validOptions change after mount
  useEffect(() => {
    const checkAndReset = () => {
      const saved = localStorage.getItem(key);
      if (saved && validOptions && !validOptions.includes(saved)) {
        updateFilter(initialValue);
        localStorage.removeItem(key);
      }
    };

    checkAndReset();
  }, [key, initialValue, validOptions, updateFilter]);

  return [filter, updateFilter] as const;
}
