import type { PricingPlan } from "@/lib/types";
export const PRICING_TIERS: PricingPlan[] = [
  {
    name: "Visitor",
    monthlyPrice: 0,
    annualPrice: 0,
    isPopular: false,
    features: [
      "Attend up to 2 chapter meetings",
      "Full participation in 60-sec updates",
      "Personal intro by chapter leader",
      "Networking over chai post-meeting",
      "Decide if NIA fits before applying",
    ],
  },
  {
    name: "Member",
    monthlyPrice: 6000,
    annualPrice: 65000,
    isPopular: true,
    features: [
      "Exclusive seat in your specialty",
      "Weekly chapter meeting (52/year)",
      "1-on-1s with all members",
      "Member directory & private channel",
      "Quarterly cross-chapter mixers",
      "Six-month ROI commitment",
    ],
  },
  {
    name: "Founding Member",
    monthlyPrice: 8000,
    annualPrice: 85000,
    isPopular: false,
    features: [
      "Everything in Member",
      "Voice in chapter governance",
      "Co-host one quarterly meet",
      "Priority on cross-chapter intros",
      "Speaking slots at NIA Surat events",
      "Recognised in all chapter materials",
    ],
  },
];
