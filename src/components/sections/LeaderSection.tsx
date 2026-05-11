"use client";

import Image from "next/image";
import Typography from "@/components/ui/typography";

const leader = {
  name: "Sreyansh Jain",
  title: "Group Leader · Community Builder",
  specialty: "Diamond Trading",
  tenure: "Since 2023",
  bio: "Third-generation diamond trader and a believer that trust compounds faster than capital. Sreyansh founded the Innovators chapter to give Surat’s professionals a room where referrals come from genuine relationships, not transactions.",
  photo:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop&crop=faces",
};

const LeaderSection = () => {
  const stats = [
    { label: "SPECIALTY", value: leader.specialty },
    { label: "TENURE", value: leader.tenure },
    { label: "LEADS", value: "3 chapters" },
  ];

  return (
    <section id="leader" className="bg-paper">
      <div className="section-container section-padding">
        <div className="leader-grid flex flex-col md:flex-row gap-16 items-center">
          {/* Portrait with gradient overlay */}
          <div className="relative aspect-4/5 rounded-[18px] overflow-hidden bg-paper-3 w-full sm:w-105 sm:flex-none">
            <Image
              src={leader.photo}
              alt={leader.name}
              fill
              className="object-cover"
              sizes="(max-width: 980px) 90vw, 480px"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-x-0 bottom-0 pt-15 px-5.5 pb-5.5"
              style={{ background: "linear-gradient(transparent, rgba(14,58,92,0.92))" }}
            >
              <Typography
                as="div"
                variant="eyebrow"
                className="block font-bold! tracking-[0.12em] text-[11px]! text-white!"
              >
                Group Leader · Innovators
              </Typography>
              <Typography
                as="div"
                variant="h3"
                color="white"
                className="serif mt-1 text-[26px] font-semibold tracking-[-0.015em]"
              >
                {leader.name}
              </Typography>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col sm:flex-1">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-pill bg-brand-soft px-3.5 py-1.5 w-fit mb-4">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
              <Typography variant="eyebrow" color="brand-2" className="font-bold!">
                Chapter Leadership
              </Typography>
            </span>

            {/* Heading */}
            <Typography
              as="h2"
              variant="h2"
              color="brand-deep"
              className="mb-6 [text-balance] text-[48px]!"
            >
              Led by <span className="heading-italic-brand">Sreyansh</span>.
              <br />
              Vouched for by every seat in the room.
            </Typography>

            {/* Bio */}
            <Typography variant="body-md" color="ink-2" className="mb-7 max-w-145 [text-pretty]">
              {leader.bio}
            </Typography>

            {/* Stat strip */}
            <div className="grid grid-cols-3 border border-line rounded-[14px] overflow-hidden bg-paper-2 max-w-135">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`px-4.5 py-4 ${i < stats.length - 1 ? "border-r border-line" : ""}`}
                >
                  <Typography
                    as="span"
                    variant="eyebrow"
                    color="ink-4"
                    className="block font-bold! text-[#8b95a4]! mb-1.5"
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    as="span"
                    variant="body-sm"
                    color="brand-deep"
                    className="block font-bold!"
                  >
                    {stat.value}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LeaderSection;
