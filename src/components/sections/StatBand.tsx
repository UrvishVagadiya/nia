"use client";
import { STATS } from "@/constant/Stantband.data";
import Typography from "../ui/typography";
import { cn } from "@/lib/utils";

interface StatBandProps {
  stats?: { label: string; value: string }[];
}

const StatBand = ({ stats: cmsStats }: StatBandProps) => {
  // Use CMS stats if provided, otherwise fallback to static constants
  const items = cmsStats?.length
    ? cmsStats.map((s, idx) => ({ key: idx, numeral: s.value, label: s.label }))
    : STATS;

  return (
    <section className="bg-paper-2 px-4 pb-12 lg:px-8 lg:pb-20 overflow-hidden">
      <div className="section-container px-12! rounded-[18px] py-6 lg:py-9 lg:px-12 relative overflow-hidden bg-brand-2">
        {/* Radial highlight */}
        <div
          className="absolute inset-0 bg-[--color-primary] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 90% 50%, rgba(245, 180, 62, 0.18), transparent 50%)",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 relative z-10 items-stretch lg:items-start justify-between">
          {items.map((stat, i) => {
            const isFirst = i === 0;

            return (
              <div
                key={stat.key}
                className={cn(
                  "flex-1 min-w-0 transition-all duration-300",
                  !isFirst && "sm:border-l border-white/20 sm:pl-6 lg:pl-6"
                )}
              >
                <div className="flex flex-col">
                  <Typography
                    variant="stat"
                    color="gold"
                    className="serif font-semibold leading-none text-[40px] lg:text-[clamp(36px,4vw,48px)]"
                  >
                    {stat.numeral}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="white"
                    className="mt-3 lg:mt-2 font-bold tracking-[0.12em] uppercase text-white/85 text-[12px] lg:text-[11.5px]"
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
};

export default StatBand;
