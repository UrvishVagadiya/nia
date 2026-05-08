"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { CHAPTERS, type Chapter } from "@/lib/data";

type ChapterContextType = {
  activeChapterId: string;
  setActiveChapterId: (id: string) => void;
  chapter: Chapter;
};

const ChapterContext = createContext<ChapterContextType | null>(null);

export function ChapterProvider({ children }: { children: ReactNode }) {
  const [activeChapterId, setActiveChapterId] = useState("innovators");

  useEffect(() => {
    const saved = localStorage.getItem("nia-chapter");
    if (saved && CHAPTERS[saved]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveChapterId(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nia-chapter", activeChapterId);
  }, [activeChapterId]);

  const chapter = CHAPTERS[activeChapterId];

  return (
    <ChapterContext.Provider value={{ activeChapterId, setActiveChapterId, chapter }}>
      {children}
    </ChapterContext.Provider>
  );
}

export function useChapter() {
  const ctx = useContext(ChapterContext);
  if (!ctx) throw new Error("useChapter must be used within ChapterProvider");
  return ctx;
}
