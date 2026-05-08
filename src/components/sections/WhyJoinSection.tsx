"use client";

import { VALUE_PROPS } from "@/lib/data";
import Typography from "@/components/ui/typography";

const CUSTOM_ICONS: Record<string, { svg: React.ReactNode; colorClass: string; bgClass: string }> =
  {
    Users: {
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.4 7.2 17.9l.9-5.4L4.2 8.7l5.4-.8z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      colorClass: "text-[#8b5cf6]",
      bgClass: "bg-tint-lavender",
    },
    ShieldCheck: {
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"
            stroke="currentColor"
            strokeWidth="1.6"
          ></path>
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      colorClass: "text-[#ea580c]",
      bgClass: "bg-tint-butter", // The previous mapping used butter for this to match the HTML color rgb(253, 238, 220)
    },
    IndianRupee: {
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"></circle>
          <path
            d="M9 9h6M9 12h6M9 15h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          ></path>
        </svg>
      ),
      colorClass: "text-[#dc2626]",
      bgClass: "bg-tint-blush",
    },
    Award: {
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.6"></circle>
          <path
            d="M5 20a7 7 0 0114 0"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          ></path>
        </svg>
      ),
      colorClass: "text-[#15803d]",
      bgClass: "bg-tint-mint",
    },
  };

export default function WhyJoinSection() {
  return (
    <section id="about" className="bg-paper">
      <div className="max-w-7xl mx-auto px-8 py-22">
        {/* Section heading */}
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
          <Typography variant="body-md" color="ink-3" className="max-w-155">
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
                  {displayConfig.svg}
                </div>
                <Typography as="h3" variant="h4" color="brand-deep">
                  {prop.title}
                </Typography>
                <Typography variant="body-sm" color="ink-3">
                  {prop.body}
                </Typography>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
