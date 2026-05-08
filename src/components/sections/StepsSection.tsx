"use client";

import { Check } from "lucide-react";

export default function StepsSection() {
  return (
    <section className="bg-paper-2 border-t border-line">
      <div className="max-w-[1280px] mx-auto px-[32px] py-[88px]">
        <div className="bg-white rounded-[24px] overflow-hidden border border-line grid grid-cols-1 md:grid-cols-2">
          {/* Left Side (Dark Blue) */}
          <div className="bg-brand-deep text-white p-[52px_44px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(46,157,219,0.25),transparent_50%)] pointer-events-none"></div>

            <div className="relative">
              <div className="inline-flex items-center gap-[10px] px-[14px] py-[6px] rounded-pill bg-white/15 text-white text-[12px] font-[700] tracking-[0.06em] uppercase mb-[18px]">
                <span className="w-[6px] h-[6px] rounded-full bg-brand" />
                Visit a meeting
              </div>

              <h2 className="font-sans text-[clamp(32px,3.8vw,48px)] leading-[1.05] tracking-[-0.025em] font-[700] m-0 mb-[18px] text-balance">
                Sit in,
                <br />
                <span className="italic text-brand font-serif">before you sign up.</span>
              </h2>

              <p className="text-[16px] leading-[1.6] text-white/80 mb-[28px] max-w-[460px] text-pretty">
                One Tuesday morning is the best way to feel the room. Tell us your specialty — if
                the seat is open, we&apos;ll book you in.
              </p>

              <ul className="list-none p-0 m-0 flex flex-col gap-[12px]">
                <li className="flex items-center gap-[12px] text-[14.5px] text-white/90">
                  <span className="w-[22px] h-[22px] rounded-full bg-brand grid place-items-center shrink-0">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </span>
                  No fee, no obligation, no follow-up sales call
                </li>
                <li className="flex items-center gap-[12px] text-[14.5px] text-white/90">
                  <span className="w-[22px] h-[22px] rounded-full bg-brand grid place-items-center shrink-0">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </span>
                  Sreyansh personally vets every applicant
                </li>
                <li className="flex items-center gap-[12px] text-[14.5px] text-white/90">
                  <span className="w-[22px] h-[22px] rounded-full bg-brand grid place-items-center shrink-0">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </span>
                  You&apos;ll know if it&apos;s a fit within 90 minutes
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side (Form) */}
          <div className="p-[44px_36px]">
            <form className="flex flex-col gap-[16px]" onSubmit={(e) => e.preventDefault()}>
              <div>
                <div className="text-[11px] font-[700] text-brand-2 uppercase tracking-[0.12em] pb-4">
                  Visitor Pass · Innovators
                </div>
                <div className="text-[24px] leading-[1.2] font-[700] mb-[8px] text-brand-deep tracking-[-0.015em]">
                  Request a pass
                </div>
              </div>

              <label className="flex flex-col gap-[6px]">
                <span className="text-[12px] text-ink-2 font-[700]">Your name</span>
                <input
                  placeholder="Full name"
                  className="w-full px-[13px] py-[11px] text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink! outline-none resize-none focus:border-brand transition-colors"
                />
              </label>

              <label className="flex flex-col gap-[6px]">
                <span className="text-[12px] text-ink-2 font-[700]">Your specialty / trade</span>
                <input
                  placeholder="e.g. Textile exports"
                  className="w-full px-[13px] py-[11px] text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink outline-none resize-none focus:border-brand transition-colors"
                />
              </label>

              <label className="flex flex-col gap-[6px]">
                <span className="text-[12px] text-ink-2 font-[700]">Phone (with code)</span>
                <input
                  placeholder="+91 …"
                  className="w-full px-[13px] py-[11px] text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink outline-none resize-none focus:border-brand transition-colors"
                />
              </label>

              <label className="flex flex-col gap-[6px]">
                <span className="text-[12px] text-ink-2 font-[700]">Anything else?</span>
                <textarea
                  placeholder="Optional context"
                  rows={3}
                  className="w-full px-[13px] py-[11px] text-[14px] font-sans border border-line rounded-[10px] bg-white text-ink outline-none resize-y focus:border-brand transition-colors"
                />
              </label>

              <button
                type="submit"
                className="bg-brand text-white border-none rounded-pill px-[22px] py-[14px] text-[14.5px] font-[700] cursor-pointer mt-[6px] inline-flex items-center justify-center gap-[8px] hover:bg-brand-2 transition-colors"
              >
                Submit request <span className="font-serif">&rarr;</span>
              </button>

              <div className="text-[11.5px] text-ink-4 text-center font-[600]">
                Replied within 24 hours
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
