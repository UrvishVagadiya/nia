import { CollectionConfig } from "payload";

export const PricingPlans: CollectionConfig = {
  slug: "pricing-plans",
  admin: {
    useAsTitle: "name",
    group: "Financials",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      type: "row",
      fields: [
        {
          name: "monthlyPrice",
          type: "text",
          required: true,
          admin: { width: "50%", placeholder: "e.g. 65000 or Free" },
        },
        {
          name: "annualPrice",
          type: "number",
          required: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "isPopular",
      type: "checkbox",
      label: "Mark as Most Popular",
      defaultValue: false,
    },
    {
      name: "features",
      type: "array",
      fields: [{ name: "text", type: "text" }],
    },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: true,
    },
  ],
};
