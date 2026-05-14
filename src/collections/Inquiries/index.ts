import { CollectionConfig } from "payload";
import { sendInquiryEmail } from "./hooks/sendInquiryEmail";

export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  admin: {
    useAsTitle: "name",
    group: "Visitor Data",
    defaultColumns: ["name", "email", "chapter", "createdAt"],
  },
  access: {
    create: () => true,
    read: () => true,
  },
  hooks: {
    afterChange: [sendInquiryEmail],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "specialty",
      type: "text",
      required: true,
    },
    {
      name: "notes",
      type: "textarea",
    },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: true,
    },
    {
      name: "meetingDetails",
      type: "group",
      fields: [
        {
          name: "day",
          type: "text",
        },
        {
          name: "date",
          type: "text",
        },
        {
          name: "topic",
          type: "text",
        },
        {
          name: "venue",
          type: "text",
        },
      ],
    },
  ],
};
