"use client";

import { Check } from "lucide-react";

export default function StepsSection() {
  return (
    <section className="bg-paper-2 section-padding flex items-center justify-center">
      <div className="w-full max-w-[1080px] px-4 md:px-8 mx-auto">
        <div className="flex flex-col lg:flex-row bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          {/* Left Side (Dark Blue) */}
          <div className="bg-brand-deep text-white p-10 md:p-14 lg:p-16 lg:w-1/2 flex flex-col justify-center">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-white/90">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                VISIT A MEETING
              </span>
            </div>

            <h2 className="text-[clamp(36px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-0.02em] mb-6">
              Sit in,
              <br />
              <span className="italic text-brand font-semibold">before you sign up.</span>
            </h2>

            <p className="text-[16px] text-white/90 leading-relaxed mb-10 max-w-[360px]">
              One Tuesday morning is the best way to feel the room. Tell us your specialty — if the
              seat is open, we&apos;ll book you in.
            </p>

            <div className="flex flex-col gap-4.5">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-brand text-white shrink-0 mt-[2px]">
                  <Check size={13} strokeWidth={3} />
                </div>
                <span className="text-[15px] text-white">
                  No fee, no obligation, no follow-up sales call
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-brand text-white shrink-0 mt-[2px]">
                  <Check size={13} strokeWidth={3} />
                </div>
                <span className="text-[15px] text-white">
                  Sreyansh personally vets every applicant
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-brand text-white shrink-0 mt-[2px]">
                  <Check size={13} strokeWidth={3} />
                </div>
                <span className="text-[15px] text-white">
                  You&apos;ll know if it&apos;s a fit within 90 minutes
                </span>
              </div>
            </div>
          </div>

          {/* Right Side (Form) */}
          <div className="bg-white p-10 md:p-14 lg:p-16 lg:w-1/2 flex flex-col justify-center">
            <div className="mb-8">
              <p className="text-[11px] font-bold text-brand uppercase tracking-[0.1em] mb-2.5">
                VISITOR PASS - INNOVATORS
              </p>
              <h3 className="text-[26px] font-bold text-brand-deep">Request a pass</h3>
            </div>

            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="text-[12px] font-bold text-ink mb-1.5 block">
                  Your name
                </label>
                <input
                  id="name"
                  placeholder="Full name"
                  className="w-full h-[46px] px-4 rounded-[8px] border border-line focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-[14px] placeholder:text-ink-4 transition-all"
                />
              </div>

              <div>
                <label htmlFor="specialty" className="text-[12px] font-bold text-ink mb-1.5 block">
                  Your specialty / trade
                </label>
                <input
                  id="specialty"
                  placeholder="e.g. Textile exports"
                  className="w-full h-[46px] px-4 rounded-[8px] border border-line focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-[14px] placeholder:text-ink-4 transition-all"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-[12px] font-bold text-ink mb-1.5 block">
                  Phone (with code)
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 ..."
                  className="w-full h-[46px] px-4 rounded-[8px] border border-line focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-[14px] placeholder:text-ink-4 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-[12px] font-bold text-ink mb-1.5 block">
                  Anything else?
                </label>
                <textarea
                  id="message"
                  placeholder="Optional context"
                  className="w-full h-[100px] p-4 rounded-[8px] border border-line focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-[14px] placeholder:text-ink-4 resize-none transition-all"
                />
              </div>

              <div className="mt-1">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-1.5 h-[46px] rounded-pill bg-brand text-white font-semibold text-[14.5px] hover:bg-brand-2 transition-colors shadow-sm"
                >
                  Submit request <span className="font-serif ml-0.5">&rarr;</span>
                </button>
                <p className="text-[12px] text-ink-4 mt-4 text-center">Replied within 24 hours</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
