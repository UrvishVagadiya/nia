"use client";
import { STATS } from "@/components/constant/Stantband.data";
import Typography from "../ui/typography";
import { cn } from "@/lib/utils";

export default function StatBand() {
  return (
    <section className="bg-paper-2 px-4 pb-12 lg:px-8 lg:pb-20 overflow-hidden">
      <div className="section-container rounded-[18px] py-6 px-5 lg:py-9 lg:px-12 relative overflow-hidden bg-brand-2">
        {/* Radial highlight */}
        <div
          className="absolute inset-0 bg-[--color-primary] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 90% 50%, rgba(245, 180, 62, 0.18), transparent 50%)",
          }}
        />

        <div className="stat-band-grid flex flex-col md:flex-row items-stretch lg:items-start justify-between gap-12 lg:gap-6 relative z-10">
          {STATS.map((stat, i) => {
            const isFirst = i === 0;

            return (
              <div
                key={stat.key}
                className={cn(
                  "flex-1 min-w-0 transition-all duration-300",
                  !isFirst && "border-l border-white/20 pl-6 lg:pl-6"
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
}
