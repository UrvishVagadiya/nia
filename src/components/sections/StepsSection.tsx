"use client";

import { Check } from "lucide-react";
import Typography from "@/components/ui/typography";
import VistorPassForm from "./VistorPassForm";
import { StepsSectionProps } from "@/lib/types";

const StepsSection = ({ chapterId, chapterSlug, chapterName, venue }: StepsSectionProps) => {
  return (
    <section id="StepsSection" className="bg-paper border-t border-line">
      <div className="section-container section-padding">
        <div className="bg-white rounded-3xl overflow-hidden border border-line grid grid-cols-1 md:grid-cols-2">
          {/* Left Side (Dark Blue) */}
          <div className="bg-brand-deep text-white p-[52px_36px] sm:p-[52px_44px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(46,157,219,0.25),transparent_50%)] pointer-events-none"></div>

            <div className="relative">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-white/15 mb-4.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                <Typography variant="eyebrow" color="white" className="uppercase">
                  Visit a meeting
                </Typography>
              </div>

              <Typography as="h2" variant="h2" color="white" className="mb-4.5">
                Sit in,
                <br />
                <span className="italic text-brand font-serif">before you sign up.</span>
              </Typography>

              <Typography variant="body-md" color="white" className="opacity-80 mb-7 max-w-115">
                One Tuesday morning is the best way to feel the room. Tell us your specialty — if
                the seat is open, we&apos;ll book you in.
              </Typography>

              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                <li className="flex items-center gap-3">
                  <span className="w-5.5 h-5.5 rounded-full bg-brand grid place-items-center shrink-0">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </span>
                  <Typography variant="body-sm" color="white" className="opacity-90">
                    No fee, no obligation, no follow-up sales call
                  </Typography>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5.5 h-5.5 rounded-full bg-brand grid place-items-center shrink-0">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </span>
                  <Typography variant="body-sm" color="white" className="opacity-90">
                    Sreyansh personally vets every applicant
                  </Typography>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5.5 h-5.5 rounded-full bg-brand grid place-items-center shrink-0">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </span>
                  <Typography variant="body-sm" color="white" className="opacity-90">
                    You&apos;ll know if it&apos;s a fit within 90 minutes
                  </Typography>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side (Form) */}
          <VistorPassForm
            chapterId={chapterId}
            chapterSlug={chapterSlug}
            chapterName={chapterName}
            venue={venue}
          />
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
