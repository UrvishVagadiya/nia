import { CollectionConfig } from "payload";
import { withSoftDelete } from "../../utils/softDelete";

export const FAQs: CollectionConfig = withSoftDelete({
  slug: "faqs",
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "chapter", "isDeleted", "order"],
    group: "Chapter Content",
    description: "Manage frequently asked questions for each chapter.",
    components: {
      beforeList: ["@/components/admin/ChapterFilterBar"],
    },
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
});
