"use client";

import Typography from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/components/constant/FAQSection.data";

export default function FAQSection() {
  return (
    <section className="bg-paper">
      <div className="section-container py-[88px] px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 sm:gap-16">
        {/* Left Side (Header) */}
        <div>
          <div className="inline-flex items-center gap-[10px] px-[14px] py-[6px] rounded-pill bg-brand-soft mb-4">
            <span className="w-[6px] h-[6px] rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              FAQ
            </Typography>
          </div>
          <Typography as="h2" variant="h2" color="brand-deep" className="mb-[14px]">
            Before you visit.
          </Typography>
          <Typography variant="body-sm" color="ink-3" className="max-w-[320px]">
            Have a question we haven&apos;t covered? Sreyansh personally replies within 24 hours.
          </Typography>
        </div>

        {/* Right Side (Accordion) */}
        <div className="flex flex-col">
          <Accordion defaultValue={["item-0"]}>
            {FAQ.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`border-b border-line ${index === 0 ? "border-t" : ""}`}
              >
                <AccordionTrigger className="w-full text-left py-[20px] px-1 flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer hover:no-underline [&>svg[data-slot=accordion-trigger-icon]]:hidden">
                  <Typography
                    as="span"
                    variant="body-md"
                    color="brand-deep"
                    className="text-balance font-bold"
                  >
                    {item.q}
                  </Typography>
                  <span className="w-[30px] h-[30px] rounded-full grid place-items-center shrink-0 text-[18px] leading-none font-semibold transition-all duration-200 bg-paper-2 text-brand-deep group-aria-expanded/accordion-trigger:rotate-45 group-aria-expanded/accordion-trigger:bg-brand group-aria-expanded/accordion-trigger:text-white">
                    +
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-[24px]">
                  <Typography variant="body-sm" color="ink-2" className="max-w-[720px]">
                    {item.a}
                  </Typography>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
