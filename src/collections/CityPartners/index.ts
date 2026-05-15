import { CollectionConfig } from "payload";

export const CityPartners: CollectionConfig = {
  slug: "city-partners",
  admin: {
    useAsTitle: "city",
    defaultColumns: ["city", "title", "published"],
    group: "Chapter Content",
    description: "Manage city-level partner messages (e.g. Surat partners).",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "city",
      type: "text",
      required: true,
      defaultValue: "Surat",
      admin: {
        description: "The city this message belongs to.",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        placeholder: "The right room doesn't just open doors.",
      },
    },
    {
      name: "subtitle",
      type: "text",
      admin: {
        description: "Appears in italics after the title.",
        placeholder: "It changes how you move inside them.",
      },
    },
    {
      name: "messageParagraphs",
      type: "array",
      required: true,
      fields: [
        {
          name: "text",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      name: "partners",
      type: "array",
      minRows: 1,
      maxRows: 2,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "role",
          type: "text",
          defaultValue: "City Partner",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "location",
          type: "text",
          defaultValue: "NIA Surat",
        },
      ],
    },
    {
      name: "closingText",
      type: "textarea",
      admin: {
        description: "Text appearing right before the signature.",
      },
    },
    {
      name: "signatureLine",
      type: "text",
      admin: {
        placeholder: "e.g. Sreyansh Jain & Anup",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  defaultSort: "order",
};
