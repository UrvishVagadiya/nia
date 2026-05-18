import { CollectionConfig } from "payload";

export const MembersMedia: CollectionConfig = {
  slug: "members-media",
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
      defaultValue: "Member Photo",
    },
  ],
};
