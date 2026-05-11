"use client";

import { Check } from "lucide-react";
import Typography from "@/components/ui/typography";

export default function StepsSection() {
  return (
    <section className="bg-paper-2 border-t border-line">
      <div className="section-container section-padding">
        <div className="bg-white rounded-[24px] overflow-hidden border border-line grid grid-cols-1 md:grid-cols-2">
          {/* Left Side (Dark Blue) */}
          <div className="bg-brand-deep text-white p-[52px_44px] relative overflow-hidden">
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
          <div className="p-[44px_36px]">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Typography as="div" variant="eyebrow" color="brand-2" className="pb-4">
                  Visitor Pass · Innovators
                </Typography>
                <Typography
                  as="div"
                  variant="h3"
                  color="brand-deep"
                  className="mb-2 text-[24px]! font-bold!"
                >
                  Request a pass
                </Typography>
              </div>

              <label className="flex flex-col gap-1.5">
                <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
                  Your name
                </Typography>
                <input
                  placeholder="Full name"
                  suppressHydrationWarning
                  className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink! outline-none resize-none focus:border-brand transition-colors"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
                  Your specialty / trade
                </Typography>
                <input
                  placeholder="e.g. Textile exports"
                  suppressHydrationWarning
                  className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink outline-none resize-none focus:border-brand transition-colors"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold!">
                  Phone (with code)
                </Typography>
                <input
                  placeholder="+91 …"
                  suppressHydrationWarning
                  className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink outline-none resize-none focus:border-brand transition-colors"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <Typography as="span" variant="eyebrow" color="ink-2" className="font-bold! ">
                  Anything else?
                </Typography>
                <textarea
                  placeholder="Optional context"
                  rows={3}
                  suppressHydrationWarning
                  className="w-full px-3.25 py-2.75 text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink outline-none resize-y focus:border-brand transition-colors"
                />
              </label>

              <button
                type="submit"
                suppressHydrationWarning
                className="bg-brand text-white border-none rounded-pill px-5.5 py-3.5 font-bold cursor-pointer mt-1.5 inline-flex items-center justify-center gap-2 hover:bg-brand-2 transition-colors"
              >
                <Typography as="span" variant="body-sm" color="white" className="font-bold!">
                  Submit request
                </Typography>
                <span className="font-serif">&rarr;</span>
              </button>

              <Typography
                as="div"
                variant="caption"
                color="ink-4"
                className="text-center font-semibold"
              >
                Replied within 24 hours
              </Typography>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
