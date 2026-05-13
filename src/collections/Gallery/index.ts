import { CollectionConfig } from "payload";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  admin: {
    group: "Media Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "order", type: "number" },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: true,
    },
  ],
};
