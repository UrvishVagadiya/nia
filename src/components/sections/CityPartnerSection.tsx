"use client";

import Image from "next/image";
import Typography from "@/components/ui/typography";
import { CityPartnerSectionProps } from "@/lib/types";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/reveal";

const CityPartnerSection = ({ data }: CityPartnerSectionProps) => {
  if (!data) return null;

  const partner1 = data.partners[0];
  const partner2 = data.partners[1];

  return (
    <section id="cityPartner" className="border-b border-line/70 overflow-hidden">
      {/* --- Content Grid Section --- */}
      <div className="section-container section-padding">
        <ScrollReveal className="flex flex-col items-center text-center justify-center mx-auto pb-10 md:pb-16">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-brand-soft w-fit mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              Message from city partners
            </Typography>
          </div>

          <Typography as="h2" variant="h1" color="brand-deep" className="mx-auto max-w-293">
            {data.title}
            {data.subtitle && <span className="heading-italic-brand"> {data.subtitle}</span>}
          </Typography>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-10 lg:gap-14 items-center">
          {/* Left Column: Visuals */}
          <ScrollReveal duration={0.9} className="relative">
            {/* Decorative Blurs */}
            <div className="absolute -left-6 top-8 h-36 w-36 rounded-full bg-brand-soft/70 blur-3xl" />
            <div className="absolute -right-3 -bottom-5 h-28 w-28 rounded-full bg-paper-2 blur-2xl" />

            <div className="relative grid grid-cols-1 sm:grid-cols-[1.08fr_0.92fr] gap-4 items-stretch">
              {/* Partner One */}
              {partner1 && (
                <div className="relative min-h-80 sm:min-h-115 overflow-hidden rounded-3xl border border-line bg-paper shadow-card">
                  <Image
                    src={partner1.image}
                    alt={`${partner1.name} portrait`}
                    fill
                    loading="eager"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-brand-deep via-brand-deep/70 to-transparent px-5.5 pt-14 pb-5.5 text-white">
                    <Typography as="div" variant="eyebrow" color="white" className="mb-1.5">
                      {partner1.role}
                    </Typography>
                    <Typography as="h3" variant="h3" color="white" className="serif">
                      {partner1.name}
                    </Typography>
                    <Typography variant="body-sm" color="white" className="mt-1 text-white/80">
                      {partner1.location}
                    </Typography>
                  </div>
                </div>
              )}

              {/* Partner Two & Badge Column */}
              <div className="flex flex-col gap-4 justify-between">
                {partner2 ? (
                  <div className="relative flex-1 overflow-hidden rounded-3xl border border-line bg-paper shadow-card min-h-80 sm:min-h-55">
                    <Image
                      src={partner2.image}
                      alt={`${partner2.name} portrait`}
                      fill
                      priority
                      loading="eager"
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 px-4.5 pb-4.5">
                      <Typography as="div" variant="eyebrow" color="white" className="mb-1">
                        {partner2.role}
                      </Typography>
                      <Typography as="h4" variant="h4" color="white">
                        {partner2.name}
                      </Typography>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1" />
                )}

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
                        {data.city ? `NIA ${data.city}` : "NIA Surat"}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Narrative Content */}
          <StaggerContainer staggerDelay={0.12} className="flex flex-col gap-2 lg:pl-4 text-left">
            <div className="space-y-4 max-w-160 mx-auto lg:mx-0 text-justify">
              {data.messageParagraphs.map((paragraph, idx) => (
                <StaggerItem key={idx} direction="up" distance={30}>
                  <Typography variant="body-md" color="ink-2" className="whitespace-pre-wrap">
                    {paragraph.text}
                  </Typography>
                </StaggerItem>
              ))}

              {data.closingText && (
                <StaggerItem direction="up" distance={30}>
                  <Typography
                    variant="body-md"
                    color="ink-2"
                    className="mb-5 max-w-145 mt-2 whitespace-pre-wrap"
                  >
                    {data.closingText}
                  </Typography>
                </StaggerItem>
              )}

              <StaggerItem direction="up" distance={30}>
                <div>
                  <Typography variant="h5" color="brand-deep" className="serif-it text-[16px]">
                    Warm Regards,
                  </Typography>
                  <Typography variant="h5" color="brand" className="text-[15px] lg:text-[16px]">
                    {data.signatureLine}
                  </Typography>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default CityPartnerSection;
