"use client";

import Image from "next/image";
import Typography from "@/components/ui/typography";
import { LeaderProps } from "@/lib/types";

const LeaderSection = ({ leader: cmsLeader, chapter }: LeaderProps) => {
  if (!cmsLeader) return null;

  const chapterName = chapter?.name || "Chapter";

  const leader = {
    name: cmsLeader.name,
    title: cmsLeader.role,
    bio: cmsLeader.quote,
    photo:
      (typeof cmsLeader.photo === "object" ? cmsLeader.photo?.url : cmsLeader.photo) ||
      (cmsLeader as { photoURL?: string }).photoURL,
    specialty: cmsLeader.specialty || "Chapter Leader",
    tenure: cmsLeader.tenure || "Founding Member",
  };
  return (
    <section id="leader">
      <div className="section-container section-padding">
        <div className="leader-grid flex flex-col md:flex-row gap-16 items-center">
          {/* Portrait with gradient overlay */}
          <div className="relative aspect-4/5 rounded-[18px] overflow-hidden bg-paper-3 w-full sm:w-105 sm:flex-none">
            {leader.photo ? (
              <Image
                src={leader.photo}
                alt={leader.name}
                fill
                loading="eager"
                className="object-cover"
                sizes="(max-width: 980px) 90vw, 480px"
                priority
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-paper-2 to-paper-3 flex items-center justify-center">
                <Typography variant="body-sm" color="ink-4">
                  No image available
                </Typography>
              </div>
            )}
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
                Group Leader · {chapterName}
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
              className="mb-6 [text-balance] md:text-[48px]!"
            >
              Led by <span className="heading-italic-brand">{leader.name.split(" ")[0]}</span>.
              <br />
              Vouched for by every seat in the room.
            </Typography>

            {/* Bio */}
            <Typography variant="body-md" color="ink-2" className="mb-7 max-w-145 [text-pretty]">
              {leader.bio}
            </Typography>

            {/* Stats from leader and chapter */}
            <div className="grid grid-cols-3 border border-line rounded-[14px] overflow-hidden bg-paper-2 max-w-135">
              {[
                { label: "Specialty", value: leader.specialty },
                { label: "Tenure", value: leader.tenure },
                { label: "Chapter", value: chapterName },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`px-4.5 py-4 ${index !== 2 ? "border-r border-line" : ""}`}
                >
                  <Typography
                    as="span"
                    variant="eyebrow"
                    color="ink-4"
                    className="block font-bold! text-[#8b95a4]! mb-1.5"
                  >
                    {item.label}
                  </Typography>

                  <Typography
                    as="span"
                    variant="body-sm"
                    color="brand-deep"
                    className="block font-bold! text-[12px]!"
                  >
                    {item.value}
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
