"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PRICING_TIERS } from "@/components/constant/PricingSection.data";
import Typography from "../ui/typography";

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [selectedCard, setSelectedCard] = useState<string>("Member");

  return (
    <section className="bg-paper">
      <div className="section-container section-padding">
        {/* Header */}
        <div className="text-center flex flex-col items-center mb-14 max-w-180 mx-auto">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-brand-soft mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <Typography variant="eyebrow" color="brand-2">
              Membership
            </Typography>
          </div>
          <Typography as="h2" variant="h2" color="brand-deep">
            Three ways to be in the room.
          </Typography>
          <Typography variant="body-md" color="ink-3" className="mt-4.5 max-w-155">
            Try a chapter for free, then commit when you know it&apos;s a fit. Annual dues pay for
            themselves in a single referral.
          </Typography>
        </div>

        {/* Toggle */}
        <div className="flex justify-center items-center gap-4 mb-[40px]">
          <span
            className={`text-[13px] font-semibold ${billing === "monthly" ? "text-brand-deep" : "text-ink-4"}`}
          >
            <Typography
              as="span"
              variant="body-sm"
              className={billing === "monthly" ? "text-white" : "text-ink-2"}
            >
              monthly
            </Typography>
          </span>
          <Switch
            checked={billing === "annual"}
            onCheckedChange={(checked) => setBilling(checked ? "annual" : "monthly")}
            suppressHydrationWarning
          />
          <span
            className={`text-[13px] font-semibold ${billing === "annual" ? "text-brand-deep" : "text-ink-4"}`}
          >
            Annual
          </span>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const isDark = selectedCard === tier.name;
            return (
              <Card
                key={tier.name}
                onClick={() => setSelectedCard(tier.name)}
                suppressHydrationWarning
                className={`cursor-pointer transition-all duration-300 relative rounded-[18px] p-8 flex flex-col gap-4 border ${
                  isDark
                    ? "bg-brand-deep text-white border-brand-deep lg:-translate-y-3 shadow-[0_20px_40px_-20px_rgba(14,58,92,0.4)]"
                    : "bg-white text-ink border-line shadow-none hover:border-brand/30"
                }`}
              >
                {tier.popular && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 bg-brand text-white rounded-pill text-[10.5px] font-bold tracking-[0.06em] uppercase">
                    Most Popular
                  </span>
                )}

                <div className="flex items-baseline gap-2">
                  <Typography
                    as="span"
                    variant="stat"
                    className={`transition-colors duration-300 ${isDark ? "text-white" : "text-brand-deep"}`}
                  >
                    {tier.price[billing]}
                  </Typography>
                  <Typography
                    as="span"
                    variant="caption"
                    className={`transition-colors duration-300 ${isDark ? "text-white/65" : "text-ink-4"}`}
                  >
                    {tier.interval[billing]}
                  </Typography>
                </div>

                <Typography
                  as="div"
                  variant="h4"
                  className={`transition-colors duration-300 ${isDark ? "text-white" : "text-brand-deep"}`}
                >
                  {tier.name}
                </Typography>

                <ul className="list-none p-0 m-0 flex flex-col gap-2.5 flex-1">
                  {tier.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2.5 transition-colors duration-300 ${isDark ? "text-white/85" : "text-ink-2"}`}
                    >
                      <span
                        className={`w-4.5 h-4.5 rounded-full grid place-items-center shrink-0 mt-0.5 transition-colors duration-300 ${isDark ? "bg-brand text-white" : "bg-brand-soft text-brand-2"}`}
                      >
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2 6.5L4.5 9L10 3.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <Typography
                        variant="body-sm"
                        className={isDark ? "text-white/85" : "text-ink-2"}
                      >
                        {feature}
                      </Typography>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#apply"
                  onClick={(e) => e.stopPropagation()}
                  className={`py-3.25 px-5.5 rounded-pill inline-flex items-center justify-center gap-2 mt-2.5 transition-colors duration-300 ${
                    isDark
                      ? "bg-white text-brand-deep hover:bg-paper-2"
                      : "bg-brand text-white hover:bg-brand-2"
                  }`}
                >
                  <Typography
                    as="span"
                    variant="body-sm"
                    className={isDark ? "text-brand-deep" : "text-white"}
                  >
                    {tier.cta}
                  </Typography>
                  <span className=" ml-0.5">→</span>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
