"use client";

import { FAQ } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section className="bg-paper">
      <div className="section-container py-[88px] px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16">
        {/* Left Side (Header) */}
        <div>
          <div className="inline-flex items-center gap-[10px] px-[14px] py-[6px] rounded-pill bg-brand-soft text-brand-2 text-[12px] font-bold tracking-[0.06em] uppercase mb-4">
            <span className="w-[6px] h-[6px] rounded-full bg-brand" />
            FAQ
          </div>
          <h2 className="font-sans text-[clamp(30px,3.6vw,44px)] leading-[1.1] tracking-[-0.025em] font-bold mb-[14px] text-brand-deep">
            Before you visit.
          </h2>
          <p className="text-[16px] leading-[1.6] text-ink-3 m-0 max-w-[320px] text-pretty">
            Have a question we haven&apos;t covered? Sreyansh personally replies within 24 hours.
          </p>
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
                  <span className="text-[17px] leading-[1.4] font-bold text-brand-deep text-balance">
                    {item.q}
                  </span>
                  <span className="w-[30px] h-[30px] rounded-full grid place-items-center shrink-0 text-[18px] leading-none font-semibold transition-all duration-200 bg-paper-2 text-brand-deep group-aria-expanded/accordion-trigger:rotate-45 group-aria-expanded/accordion-trigger:bg-brand group-aria-expanded/accordion-trigger:text-white">
                    +
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-[24px]">
                  <p className="m-0 px-1 text-[15px] leading-[1.6] text-ink-2 max-w-[720px] text-pretty">
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
