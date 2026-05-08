"use client";

import { useChapter } from "@/lib/chapter-context";

const STATS = [
  { key: "active", numeral: "23+", label: "Years Active" },
  { key: "referrals", numeral: "109+", label: "Referrals This Year" },
  { key: "visitor", numeral: "196+", label: "Visitor Sessions" },
  { key: "members", numeral: "25+", label: "Active Members" },
];

export default function StatBand() {
  const { chapter } = useChapter();

  const stats = STATS.map((s) => {
    if (s.key === "members") return { ...s, numeral: `${chapter.members}+` };
    return s;
  });

  return (
    <section className="bg-paper-2 px-8 pb-[80px]">
      <div className="section-container rounded-[18px] py-[36px] px-[48px] relative overflow-hidden bg-brand-2">
        {/* Radial highlight */}
        <div
          className="absolute inset-0 bg-[--color-primary] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 90% 50%, rgba(245, 180, 62, 0.18), transparent 50%)",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] relative z-10">
          {stats.map((stat, i) => {
            let borderClass = "border-l border-white/20 pl-[24px]";
            if (i === 0) {
              borderClass = "border-none pl-0";
            } else if (i === 2) {
              borderClass =
                "border-l border-white/20 pl-[24px] sm:border-none sm:pl-0 lg:border-solid lg:border-l lg:pl-[24px]";
            }

            return (
              <div key={stat.key} className={`text-left ${borderClass}`}>
                <div className="font-serif text-[clamp(36px,4vw,48px)] leading-none tracking-[-0.02em] text-gold font-semibold">
                  {stat.numeral}
                </div>
                <div className="text-[11.5px] text-white/85 mt-2 font-bold tracking-[0.12em] uppercase">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
