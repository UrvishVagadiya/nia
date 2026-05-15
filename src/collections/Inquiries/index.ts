import { CollectionConfig } from "payload";
import { sendInquiryEmail } from "./hooks/sendInquiryEmail";
import { withSoftDelete } from "../../utils/softDelete";

export const Inquiries: CollectionConfig = withSoftDelete({
  slug: "inquiries",
  admin: {
    useAsTitle: "name",
    group: "Visitor Data",
    defaultColumns: ["name", "email", "chapter", "createdAt", "status"],
  },
  access: {
    create: () => true,
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
      required: false,
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
});
