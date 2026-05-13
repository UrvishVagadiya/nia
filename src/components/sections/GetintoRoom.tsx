"use client";

import Image from "next/image";
import Typography from "@/components/ui/typography";
import {
  GETINTOROOM_HEADER,
  GETINTOROOM_IMAGE,
  GETINTOROOM_STEPS,
} from "@/constant/GetintoRoom.data";

const GetintoRoom = () => {
  return (
    <section className="bg-paper-2">
      <div className="section-container section-padding">
        <div className="bg-paper rounded-3xl p-[clamp(32px,4vw,56px)] border border-line">
          {/* Header */}
          <div className="text-center flex flex-col items-center mb-14 max-w-180 mx-auto">
            <Typography as="h2" variant="h2" color="brand-deep" className="max-w-110 pb-4 ">
              {GETINTOROOM_HEADER.title}
            </Typography>
            <Typography variant="body-md" color="ink-3" className="max-w-155">
              {GETINTOROOM_HEADER.subtitle}
            </Typography>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-14 items-center">
            {/* Image Box */}
            <div className="aspect-square bg-paper-3 rounded-[18px] overflow-hidden relative">
              <Image
                src={GETINTOROOM_IMAGE.src}
                alt={GETINTOROOM_IMAGE.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute bottom-4 left-4 px-3.5 py-2 rounded-pill bg-white/95 backdrop-blur-sm shadow-sm">
                <Typography as="div" variant="caption" color="brand-deep" className="font-bold!">
                  {GETINTOROOM_IMAGE.location}
                </Typography>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="flex flex-col relative">
              {/* Connecting Line */}
              <div className="absolute left-5.75 top-5 bottom-5 w-px bg-line-2 z-0"></div>

              {GETINTOROOM_STEPS.map((step, index) => (
                <div
                  key={step.number}
                  className={`grid grid-cols-[46px_1fr] gap-5 ${index !== GETINTOROOM_STEPS.length - 1 ? "pb-7" : "pb-0"} relative`}
                >
                  <div className="w-11.5 h-11.5 rounded-full bg-white border-2 border-brand text-brand flex items-center justify-center text-[13px] font-bold relative z-10 shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <Typography
                      as="div"
                      variant="body-md"
                      color="brand-deep"
                      className="mb-1.5 font-bold!"
                    >
                      {step.title}
                    </Typography>
                    <Typography variant="body-sm" color="ink-3">
                      {step.description}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetintoRoom;
