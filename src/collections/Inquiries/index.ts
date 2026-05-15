import { CollectionConfig } from "payload";
import { sendInquiryEmail } from "./hooks/sendInquiryEmail";
import {
  softDeleteFields,
  softDeleteAccess,
  onSoftDelete,
  beforeChangeSoftDelete,
  afterSoftDelete,
} from "../../utils/softDelete";

export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  admin: {
    useAsTitle: "name",
    group: "Visitor Data",
    defaultColumns: ["name", "email", "chapter", "createdAt", "status"],
  },
  access: {
    create: () => true,
    read: softDeleteAccess,
  },
  hooks: {
    beforeOperation: [onSoftDelete("inquiries")],
    beforeChange: [beforeChangeSoftDelete],
    afterChange: [sendInquiryEmail],
    afterOperation: [afterSoftDelete],
  },
  fields: [
    ...softDeleteFields,
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
};
