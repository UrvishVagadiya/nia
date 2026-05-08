"use client";

import Image from "next/image";
import Typography from "@/components/ui/typography";

export default function GetintoRoom() {
  return (
    <section className="bg-paper-2">
      <div className="max-w-7xl mx-auto px-8 py-22">
        <div className="bg-paper rounded-3xl p-[clamp(32px,4vw,56px)] border border-line">
          {/* Header */}
          <div className="text-center flex flex-col items-center mb-14 max-w-180 mx-auto">
            <Typography as="h2" variant="h2" color="brand-deep">
              Get into the room in 3 simple steps.
            </Typography>
            <Typography variant="body-md" color="ink-3" className="max-w-155">
              From reaching out to sitting at the table — three steps, two weeks, no friction.
            </Typography>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 items-center">
            {/* Image Box */}
            <div className="aspect-square bg-paper-3 rounded-[18px] overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=700&fit=crop"
                alt="Meeting room"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute bottom-4 left-4 px-3.5 py-2 rounded-pill bg-white/95 backdrop-blur-sm shadow-sm">
                <Typography as="div" variant="caption" color="brand-deep">
                  Hyatt Regency · Surat
                </Typography>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="flex flex-col relative">
              {/* Connecting Line */}
              <div className="absolute left-5 top-5 bottom-5 w-px bg-line-2 z-0"></div>

              <div className="grid grid-cols-[46px_1fr] gap-5 pb-7 relative">
                <div className="w-11.5 h-11.5 rounded-full bg-white border-2 border-brand text-brand flex items-center justify-center text-[13px] font-bold relative z-10 shrink-0">
                  01
                </div>
                <div>
                  <Typography
                    as="div"
                    variant="body-md"
                    color="brand-deep"
                    className="mb-1.5 font-bold"
                  >
                    Step 1: Request a visitor pass
                  </Typography>
                  <Typography variant="body-sm" color="ink-3">
                    Tell us your name, your specialty, and a phone number. Sreyansh will personally
                    check seat availability for your category.
                  </Typography>
                </div>
              </div>

              <div className="grid grid-cols-[46px_1fr] gap-5 pb-7 relative">
                <div className="w-11.5 h-11.5 rounded-full bg-white border-2 border-brand text-brand flex items-center justify-center text-[13px] font-bold relative z-10 shrink-0">
                  02
                </div>
                <div>
                  <Typography
                    as="div"
                    variant="body-md"
                    color="brand-deep"
                    className="mb-1.5 font-bold"
                  >
                    Step 2: Sit in for a Tuesday
                  </Typography>
                  <Typography variant="body-sm" color="ink-3">
                    Attend a full 90-minute meeting. Watch the format, meet the room, get a feel for
                    whether the chapter is a fit for you.
                  </Typography>
                </div>
              </div>

              <div className="grid grid-cols-[46px_1fr] gap-5 pb-0 relative">
                <div className="w-11.5 h-11.5 rounded-full bg-white border-2 border-brand text-brand flex items-center justify-center text-[13px] font-bold relative z-10 shrink-0">
                  03
                </div>
                <div>
                  <Typography
                    as="div"
                    variant="body-md"
                    color="brand-deep"
                    className="mb-1.5 font-bold"
                  >
                    Step 3: Apply for the seat
                  </Typography>
                  <Typography variant="body-sm" color="ink-3">
                    If both sides see a fit, we&apos;ll formalise membership. You&apos;ll be the
                    only voice in your category, for as long as you hold it.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
