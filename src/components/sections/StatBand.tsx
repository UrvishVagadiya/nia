"use client";

import { useChapter } from "@/lib/chapter-context";
import Typography from "@/components/ui/typography";

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
    <section className="bg-paper-2 px-8 pb-20">
      <div className="section-container rounded-[18px] py-9 px-12 relative overflow-hidden bg-brand-2">
        {/* Radial highlight */}
        <div
          className="absolute inset-0 bg-[--color-primary] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 90% 50%, rgba(245, 180, 62, 0.18), transparent 50%)",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
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
                <div>
                  <Typography variant="stat" color="gold" className="font-semibold leading-none">
                    {stat.numeral}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="white"
                    className="mt-2 font-bold tracking-[0.12em] uppercase text-white/85"
                  >
                    {stat.label}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
