import { CollectionConfig } from "payload";

export const GalleryMedia: CollectionConfig = {
  slug: "gallery-media",
  upload: true,
  admin: {
    group: "Media Content",
    hidden: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: false,
      defaultValue: "Gallery Image",
    },
  ],
};
