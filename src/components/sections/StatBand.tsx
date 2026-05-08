"use client";
import { STATS } from "@/components/constant/Stantband.data";
import Typography from "../ui/typography";

export default function StatBand() {
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
          {STATS.map((stat, i) => {
            let borderClass = "border-l border-white/20 pl-6";
            if (i === 0) {
              borderClass = "border-none pl-0";
            } else if (i === 2) {
              borderClass =
                "border-l border-white/20 pl-6 sm:border-none sm:pl-0 lg:border-solid lg:border-l lg:pl-6";
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
