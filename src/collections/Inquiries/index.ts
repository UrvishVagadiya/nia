import { CollectionConfig } from "payload";
import { sendInquiryEmail } from "./hooks/sendInquiryEmail";
import { rateLimitInquiry } from "./hooks/rateLimitInquiry";
import { withSoftDelete } from "../../utils/softDelete";

export const Inquiries: CollectionConfig = withSoftDelete({
  slug: "inquiries",
  admin: {
    useAsTitle: "name",
    group: "Visitor Data",
    defaultColumns: ["name", "email", "chapter", "createdAt", "isDeleted"],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    beforeChange: [rateLimitInquiry],
    afterChange: [sendInquiryEmail],
  },
  fields: [
    {
      name: "ip",
      type: "text",
      admin: {
        hidden: true,
      },
    },
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
