import { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
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
      defaultValue: "NIA Media Asset",
    },
  ],
};
