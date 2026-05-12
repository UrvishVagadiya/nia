import { CollectionConfig } from "payload";

export const Members: CollectionConfig = {
  slug: "members",
  admin: {
    useAsTitle: "name",
    group: "Chapter Data",
    defaultColumns: ["name", "chapter", "photo_url", "specialty"],
    components: {
      beforeList: ["@/components/admin/ChapterFilterBar"],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "specialty", type: "text", required: true },
    { name: "company", type: "text", required: true },
    { name: "convention", type: "text" },
    { name: "oneliner", type: "textarea" },
    { name: "photo_url", type: "text", label: "Photo URL" },
    { name: "location", type: "text" },
    { name: "joined", type: "text" },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: true,
    },
  ],
};

export const Leaders: CollectionConfig = {
  slug: "leaders",
  admin: {
    useAsTitle: "name",
    group: "Chapter Data",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "quote", type: "textarea" },
    {
      name: "photo_url",
      type: "text",
      label: "Photo URL",
      admin: {
        description: "Paste a URL for the leader photo.",
      },
    },
    { name: "specialty", type: "text" },
    { name: "tenure", type: "text" },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: true,
      unique: true,
    },
  ],
};

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "who",
    group: "Social Proof",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "who", type: "text", required: true },
    { name: "role", type: "text" },
    { name: "quote", type: "textarea", required: true },
    { name: "photo", type: "text", label: "Photo URL" },
    {
      name: "isGlobal",
      type: "checkbox",
      label: "Show on all chapters",
      defaultValue: false,
    },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      admin: {
        condition: (data) => !data.isGlobal,
      },
    },
  ],
};

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

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "topic",
    group: "Schedule",
    components: {
      beforeList: ["@/components/admin/ChapterFilterBar"],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: true,
      hasMany: false,
    },
    {
      name: "day",
      type: "text",
      required: true,
    },
    {
      name: "date",
      type: "text",
      required: true,
    },
    {
      name: "topic",
      type: "text",
      required: true,
    },
    {
      name: "venue",
      type: "text",
      label: "Venue",
      required: false,
    },
    {
      name: "rsvps",
      type: "number",
      required: true,
      defaultValue: 0,
    },
  ],
};

export const Gallery: CollectionConfig = {
  slug: "gallery",
  admin: {
    group: "Media Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "order", type: "number" },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: true,
    },
  ],
};
