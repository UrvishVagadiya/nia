import { CollectionConfig } from "payload";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "chapter", "order"],
    group: "Chapter Content",
    description: "Manage frequently asked questions for each chapter.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
      admin: {
        placeholder: "e.g. What is the meeting time?",
      },
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
      admin: {
        placeholder: "Provide a detailed answer here...",
      },
    },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: true,
      hasMany: false,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Set the display order (0 = first).",
      },
    },
  ],
  defaultSort: "order",
};
