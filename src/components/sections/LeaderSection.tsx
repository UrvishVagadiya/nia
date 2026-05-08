"use client";

import Image from "next/image";
import { useChapter } from "@/lib/chapter-context";

export default function LeaderSection() {
  const { chapter } = useChapter();
  const { leader } = chapter;

  const stats = [
    { label: "Specialty", value: leader.specialty },
    { label: "Tenure", value: leader.tenure },
    { label: "Leads", value: "3 chapters" },
  ];

  return (
    <section id="leader" className="bg-paper section-padding">
      <div className="section-container">
        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-pill bg-brand-soft px-3 py-1.5 eyebrow-text mb-4">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            LEADERSHIP
          </span>
          <h2 className="text-[clamp(28px,4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em] text-ink">
            Led by <span className="heading-italic-brand">Sreyansh Jain.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Portrait */}
          <div className="relative w-full aspect-square max-w-[480px] mx-auto rounded-[20px] overflow-hidden">
            <Image
              src={leader.photo}
              alt={leader.name}
              fill
              className="object-cover transition-all duration-240"
              sizes="(max-width: 1024px) 90vw, 480px"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-[24px] font-bold tracking-[-0.02em] text-ink">{leader.name}</h3>
              <p className="text-[14px] text-ink-3 mt-1">{leader.title}</p>
            </div>

            <p className="text-[15px] leading-relaxed text-ink-2 transition-all duration-240">
              {leader.bio}
            </p>

            {/* Stat strip */}
            <div className="flex flex-wrap gap-0 rounded-[12px] border border-line overflow-hidden mt-2">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex-1 min-w-[120px] px-4 py-3 ${
                    i < stats.length - 1 ? "border-r border-line" : ""
                  }`}
                >
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-4">
                    {stat.label}
                  </span>
                  <span className="block text-[14px] font-semibold text-ink mt-0.5">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
