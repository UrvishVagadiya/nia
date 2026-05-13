import { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "quote",
    group: "Social Proof",
    defaultColumns: ["quote", "testimonialType", "member", "leader"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "testimonialType",
      type: "select",
      label: "Testimonial From",
      defaultValue: "external",
      options: [
        { label: "Member", value: "member" },
        { label: "Leader", value: "leader" },
        { label: "Other", value: "external" },
      ],
      admin: {},
    },
    {
      name: "member",
      type: "relationship",
      relationTo: "members",
      label: "Linked Member",
      admin: {
        condition: (data) => data.testimonialType === "member",
      },
    },
    {
      name: "leader",
      type: "relationship",
      relationTo: "leaders",
      label: "Linked Leader",
      admin: {
        condition: (data) => data.testimonialType === "leader",
      },
    },
    {
      type: "row",
      admin: {
        condition: (data) => data.testimonialType === "external",
      },
      fields: [
        {
          name: "who",
          type: "text",
          label: "Name",
          admin: { width: "50%" },
        },
        {
          name: "role",
          type: "text",
          label: "Role / Designation",
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "quote",
      type: "textarea",
      required: true,
      label: "Testimonial Quote",
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "testimonials-media",
      label: "Photo (Manual Override)",
      admin: {
        condition: (data) => data.testimonialType === "external",
        description: "Only needed if not using a linked member/leader, or to override their photo.",
      },
    },
    {
      name: "photoUrl",
      type: "text",
      label: "Photo URL (External Override)",
      admin: {
        condition: (data) => data.testimonialType === "external",
        description: "Direct URL to an image (e.g. Unsplash). Takes precedence if provided.",
      },
    },
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
