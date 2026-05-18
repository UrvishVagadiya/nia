"use client";

import { VALUE_PROPS } from "@/constant/WhyJoinSection.data";
import Typography from "@/components/ui/typography";

import { Users, ShieldCheck, IndianRupee, Award } from "lucide-react";

const CUSTOM_ICONS: Record<string, { icon: React.ReactNode; colorClass: string; bgClass: string }> =
  {
    Users: {
      icon: <Users size={22} strokeWidth={1.6} />,
      colorClass: "text-[#8b5cf6]",
      bgClass: "bg-tint-lavender",
    },
    ShieldCheck: {
      icon: <ShieldCheck size={22} strokeWidth={1.6} />,
      colorClass: "text-[#ea580c]",
      bgClass: "bg-tint-butter",
    },
    IndianRupee: {
      icon: <IndianRupee size={22} strokeWidth={1.6} />,
      colorClass: "text-[#dc2626]",
      bgClass: "bg-tint-blush",
    },
    Award: {
      icon: <Award size={22} strokeWidth={1.6} />,
      colorClass: "text-[#15803d]",
      bgClass: "bg-tint-mint",
    },
  };

const WhyJoinSection = () => {
  return (
    <section id="about" className="overflow-hidden">
      <div className="section-container section-padding">
        <div className="text-center flex flex-col items-center mb-14 max-w-180 mx-auto">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-brand-soft mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              Why NIA
            </Typography>
          </div>
          <Typography as="h2" variant="h2" color="brand-deep">
            Why join us?
          </Typography>
          <Typography variant="body-md" color="ink-3" className="mt-3 md:mt-5 max-w-155">
            NIA is built differently — three chapters, exclusive categories, and a structure that
            makes referrals predictable, not coincidental.
          </Typography>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUE_PROPS.map((prop) => {
            const displayConfig = CUSTOM_ICONS[prop.icon] || CUSTOM_ICONS.Users;

            return (
              <article
                key={prop.title}
                className={`rounded-[20px] px-8 py-7 flex flex-col gap-3.5 min-h-55 relative ${displayConfig.bgClass}`}
              >
                <div
                  className={`w-13 h-13 rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0_6px_16px_-8px_rgba(14,58,92,0.18)] ${displayConfig.colorClass}`}
                >
                  {displayConfig.icon}
                </div>
                <Typography as="h4" variant="h4" color="brand-deep" className="font-bold!">
                  {prop.title}
                </Typography>
                <Typography variant="body-sm" color="ink-3" className="text-[13px]!">
                  {prop.body}
                </Typography>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default WhyJoinSection;
