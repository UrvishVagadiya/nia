"use client";

import Image from "next/image";
import Typography from "@/components/ui/typography";

const CityPartnerSection = () => {
  return (
    <section id="cityPartner" className="bg-paper border-b border-line/70 overflow-hidden">
      {/* --- Content Grid Section --- */}
      <div className="section-container section-padding">
        <div className="flex flex-col items-center text-center justify-center mx-auto pb-10 md:pb-16">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-brand-soft w-fit mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              Message from city partners
            </Typography>
          </div>

          <Typography as="h2" variant="h1" color="brand-deep" className="mx-auto">
            The right room doesn&apos;t just open doors.
            <br />
            <span className="heading-italic-brand">It changes how you move inside them.</span>
          </Typography>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-10 lg:gap-14 items-center">
          {/* Left Column: Visuals */}
          <div className="relative">
            {/* Decorative Blurs */}
            <div className="absolute -left-6 top-8 h-36 w-36 rounded-full bg-brand-soft/70 blur-3xl" />
            <div className="absolute -right-3 -bottom-5 h-28 w-28 rounded-full bg-paper-2 blur-2xl" />

            <div className="relative grid grid-cols-1 sm:grid-cols-[1.08fr_0.92fr] gap-4 items-stretch">
              {/* Partner One (Sreyansh) */}
              <div className="relative min-h-80 sm:min-h-115 overflow-hidden rounded-3xl border border-line bg-paper shadow-card">
                <Image
                  src="https://images.unsplash.com/flagged/photo-1577973371814-78b04a45ce5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDI5fHx8ZW58MHx8fHx8"
                  alt="Sreyansh Jain portrait"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-brand-deep via-brand-deep/70 to-transparent px-5.5 pt-14 pb-5.5 text-white">
                  <Typography as="div" variant="eyebrow" color="white" className="mb-1.5">
                    City Partner
                  </Typography>
                  <Typography as="h3" variant="h3" color="white" className="serif">
                    Sreyansh Jain
                  </Typography>
                  <Typography variant="body-sm" color="white" className="mt-1 text-white/80">
                    NIA Surat
                  </Typography>
                </div>
              </div>

              {/* Partner Two & Badge Column */}
              <div className="flex flex-col gap-4 justify-between">
                <div className="relative flex-1 overflow-hidden rounded-3xl border border-line bg-paper shadow-card min-h-80 sm:min-h-55">
                  <Image
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&crop=faces"
                    alt="Anup portrait"
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 px-4.5 pb-4.5">
                    <Typography as="div" variant="eyebrow" color="white" className="mb-1">
                      City Partner
                    </Typography>
                    <Typography as="h4" variant="h4" color="white">
                      Anup
                    </Typography>
                  </div>
                </div>

                {/* Sub-Badge */}
                <div className="rounded-lg border border-brand-soft bg-brand-soft/55 p-4.5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-full bg-white text-brand-deep shadow-sm shrink-0">
                      <span className="h-4 w-4 rounded-full border border-brand/30 bg-brand-soft" />
                    </span>
                    <div>
                      <Typography variant="body-sm" color="brand-deep" className="font-semibold!">
                        Message from the partners
                      </Typography>
                      <Typography variant="caption" color="brand-2" className="mt-1 uppercase">
                        NIA Surat
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="flex flex-col gap-2 lg:pl-4 text-left">
            <div className="space-y-4 max-w-160 mx-auto lg:mx-0">
              <Typography variant="body-md" color="ink-2">
                At NIA Surat, we believe networking is far more than referrals and meetings. The
                right room, with the right mindset and people, has the power to shape your vision,
                elevate your standards, and transform both personal and business growth.
              </Typography>

              <Typography variant="body-md" color="ink-2">
                Our vision with NIA Surat is to build a community of growth-driven individuals who
                uplift each other, share opportunities, discuss challenges openly, and grow
                together. A space where collaboration feels natural, relationships are genuine, and
                conversations go beyond business.
              </Typography>

              <Typography variant="body-md" color="ink-2">
                Through Network in Action, we are committed to creating an ecosystem that inspires
                growth, learning, leadership, and meaningful connections.
              </Typography>

              <Typography variant="body-md" color="ink-2" className="mb-5 max-w-145 mt-2">
                Thank you all the existing NIA members for being a part of this journey.
              </Typography>

              <div>
                <Typography variant="h5" color="brand-deep" className="serif-it text-[16px]">
                  Warm Regards,
                </Typography>
                <Typography variant="h5" color="brand" className="text-[15px] lg:text-[16px]">
                  Sreyansh Jain &amp; Anup
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityPartnerSection;
