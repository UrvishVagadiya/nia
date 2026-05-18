import { CollectionConfig } from "payload";

export const LeadersMedia: CollectionConfig = {
  slug: "leaders-media",
  upload: true,
  admin: {
    group: "Media Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: false,
      defaultValue: "Leader Photo",
    },
  ],
};
