"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { PricingPlan, PricingSectionProps } from "@/lib/types";
import { ArrowRight } from "lucide-react";

const formatPrice = (num: number) => {
  if (num >= 1000) {
    return `₹${(num / 1000).toFixed(0)}k`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
};

const PricingSection = ({ plans: cmsPlans }: PricingSectionProps) => {
  // Find the popular plan name to set as initial state
  const initialSelected = useMemo(() => {
    if (!cmsPlans || cmsPlans.length === 0) return "";
    const popular = cmsPlans.find((p) => p.isPopular);
    return popular ? popular.name : cmsPlans[0].name;
  }, [cmsPlans]);

  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [selectedCard, setSelectedCard] = useState<string>(initialSelected);

  const tiers = useMemo(() => {
    if (!cmsPlans) return [];

    // Sort by annual price to ensure consistent order
    const sortedPlans = [...cmsPlans].sort(
      (a, b) => Number(a.annualPrice ?? 0) - Number(b.annualPrice ?? 0)
    );

    return sortedPlans.map((p) => {
      const mPrice = Number(p.monthlyPrice ?? 0);
      const aPrice = Number(p.annualPrice ?? 0);

      const savings = mPrice && aPrice ? mPrice * 12 - aPrice : 0;
      const savingsText = savings > 0 ? ` · saves ₹${savings.toLocaleString("en-IN")}` : "";

      return {
        name: p.name,
        price: {
          monthly: formatPrice(mPrice),
          annual: formatPrice(aPrice),
        },
        interval: {
          monthly: "/ month",
          annual: `/ year${savingsText}`,
        },
        features: Array.isArray(p.features)
          ? p.features.map((f) => (typeof f === "string" ? f : f.text)).filter((f) => !!f)
          : [],
        cta: "Apply to join",
        popular: p.isPopular,
      };
    });
  }, [cmsPlans]);

  if (!cmsPlans || cmsPlans.length === 0) return null;

  return (
    <section id="membership" className="bg-paper">
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
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-pill bg-paper-2 border border-line">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4.5 py-2 rounded-pill capitalize transition-colors duration-200 ${
                billing === "monthly"
                  ? "bg-brand text-white"
                  : "bg-transparent text-ink-2 hover:text-ink"
              }`}
            >
              <Typography
                as="span"
                variant="body-sm"
                className={billing === "monthly" ? "text-white" : "text-ink-2"}
              >
                monthly
              </Typography>
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`text-[13px] px-4.5 py-2 rounded-pill font-semibold capitalize transition-colors duration-200 ${
                billing === "annual"
                  ? "bg-brand text-white"
                  : "bg-transparent text-ink-2 hover:text-ink"
              }`}
            >
              annual
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          {tiers.map((tier) => {
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
                  {tier.features.map((feature: string, idx: number) => (
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
                  href="#StepsSection"
                  onClick={(e) => e.stopPropagation()}
                  className={`py-3.25 px-5.5 rounded-pill inline-flex items-center justify-center gap-2 mt-2.5 transition-colors duration-300 ${
                    isDark
                      ? "bg-white text-brand-deep hover:b-paper-2"
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
                  <span className=" ml-0.5">
                    <ArrowRight size={15} />
                  </span>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
