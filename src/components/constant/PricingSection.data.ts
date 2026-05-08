export const PRICING_TIERS = [
  {
    name: "Visitor",
    price: {
      monthly: "₹0",
      annual: "₹0",
    },
    interval: {
      monthly: "Per session",
      annual: "Per session",
    },
    features: [
      "Attend up to 2 chapter meetings",
      "Full participation in 60-sec updates",
      "Personal intro by chapter leader",
      "Networking over chai post-meeting",
      "Decide if NIA fits before applying",
    ],
    cta: "Book a visit",
    popular: false,
  },
  {
    name: "Member",
    price: {
      monthly: "₹6k",
      annual: "₹65k",
    },
    interval: {
      monthly: "Per month",
      annual: "Per year · saves ₹7k",
    },
    features: [
      "Exclusive seat in your specialty",
      "Weekly chapter meeting (52/year)",
      "1-on-1s with all members",
      "Member directory & private channel",
      "Quarterly cross-chapter mixers",
      "Six-month ROI commitment",
    ],
    cta: "Apply for membership",
    popular: true,
  },
  {
    name: "Founding Member",
    price: {
      monthly: "₹8k",
      annual: "₹85k",
    },
    interval: {
      monthly: "Per month",
      annual: "Per year · cap of 5",
    },
    features: [
      "Everything in Member",
      "Voice in chapter governance",
      "Co-host one quarterly meet",
      "Priority on cross-chapter intros",
      "Speaking slots at NIA Surat events",
      "Recognised in all chapter materials",
    ],
    cta: "Speak to Sreyansh",
    popular: false,
  },
];
