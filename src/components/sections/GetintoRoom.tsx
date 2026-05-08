"use client";

import Image from "next/image";
import Typography from "@/components/ui/typography";

export default function GetintoRoom() {
  return (
    <section className="bg-paper-2">
      <div className="max-w-[1280px] mx-auto px-[32px] py-[88px]">
        <div className="bg-paper rounded-[24px] p-[clamp(32px,4vw,56px)] border border-line">
          {/* Header */}
          <div className="text-center flex flex-col items-center mb-[56px] max-w-[720px] mx-auto">
            <Typography as="h2" variant="h2" color="brand-deep">
              Get into the room in 3 simple steps.
            </Typography>
            <Typography variant="body-md" color="ink-3" className="max-w-[620px]">
              From reaching out to sitting at the table — three steps, two weeks, no friction.
            </Typography>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-[56px] items-center">
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
              <div className="absolute bottom-[16px] left-[16px] px-[14px] py-[8px] rounded-pill bg-white/95 backdrop-blur-[8px] shadow-sm">
                <Typography as="div" variant="caption" color="brand-deep">
                  Hyatt Regency · Surat
                </Typography>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="flex flex-col relative">
              {/* Connecting Line */}
              <div className="absolute left-[22px] top-[22px] bottom-[22px] w-[1px] bg-line-2 z-0"></div>

              <div className="grid grid-cols-[46px_1fr] gap-[20px] pb-[28px] relative">
                <div className="w-[46px] h-[46px] rounded-full bg-white border-2 border-brand text-brand flex items-center justify-center text-[13px] font-[700] relative z-10 shrink-0">
                  01
                </div>
                <div>
                  <Typography
                    as="div"
                    variant="body-md"
                    color="brand-deep"
                    className="mb-[6px] font-bold"
                  >
                    Step 1: Request a visitor pass
                  </Typography>
                  <Typography variant="body-sm" color="ink-3">
                    Tell us your name, your specialty, and a phone number. Sreyansh will personally
                    check seat availability for your category.
                  </Typography>
                </div>
              </div>

              <div className="grid grid-cols-[46px_1fr] gap-[20px] pb-[28px] relative">
                <div className="w-[46px] h-[46px] rounded-full bg-white border-2 border-brand text-brand flex items-center justify-center text-[13px] font-[700] relative z-10 shrink-0">
                  02
                </div>
                <div>
                  <Typography
                    as="div"
                    variant="body-md"
                    color="brand-deep"
                    className="mb-[6px] font-bold"
                  >
                    Step 2: Sit in for a Tuesday
                  </Typography>
                  <Typography variant="body-sm" color="ink-3">
                    Attend a full 90-minute meeting. Watch the format, meet the room, get a feel for
                    whether the chapter is a fit for you.
                  </Typography>
                </div>
              </div>

              <div className="grid grid-cols-[46px_1fr] gap-[20px] pb-0 relative">
                <div className="w-[46px] h-[46px] rounded-full bg-white border-2 border-brand text-brand flex items-center justify-center text-[13px] font-[700] relative z-10 shrink-0">
                  03
                </div>
                <div>
                  <Typography
                    as="div"
                    variant="body-md"
                    color="brand-deep"
                    className="mb-[6px] font-bold"
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
