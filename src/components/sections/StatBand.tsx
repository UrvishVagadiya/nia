// "use client";

// import Typography from "../ui/typography";
// import { cn } from "@/lib/utils";

// import { StatBandProps } from "@/lib/types";

// const StatBand = ({ stats: cmsStats }: StatBandProps) => {
//   const items = cmsStats?.length
//     ? cmsStats.map((s, idx) => ({ key: idx, numeral: s.value, label: s.label }))
//     : [];
"use client";

import Typography from "../ui/typography";
import { cn } from "@/lib/utils";

import { StatBandProps } from "@/lib/types";

const StatBand = ({ stats: cmsStats }: StatBandProps) => {
  const items = cmsStats?.length
    ? cmsStats.map((s, idx) => ({ key: idx, numeral: s.value, label: s.label }))
    : [];

  if (items.length === 0) return null;

  return (
    <section className="bg-paper-2 px-4 pb-12 lg:px-8 lg:pb-20 overflow-hidden">
      <div className="section-container px-12! rounded-[18px] py-6 lg:py-9 lg:px-12 relative overflow-hidden bg-brand-2">
        <div
          className="absolute inset-0 bg-[--color-primary] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 90% 50%, rgba(245, 180, 62, 0.18), transparent 50%)",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-nowrap items-stretch">
          {items.map((stat, i) => {
            const isFirst = i === 0;

            return (
              <div
                key={stat.key}
                className={cn(
                  "min-w-0 transition-all duration-300 flex flex-col justify-center py-6 lg:flex-1 lg:basis-0 text-center",
                  !isFirst && "lg:border-l lg:border-white/20"
                )}
              >
                <div className="flex flex-col items-center justify-center px-6">
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
