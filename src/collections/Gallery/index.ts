import { CollectionConfig } from "payload";
import {
  softDeleteFields,
  softDeleteAccess,
  onSoftDelete,
  beforeChangeSoftDelete,
  afterSoftDelete,
} from "../../utils/softDelete";
import { revalidateRelatedChapter } from "../../hooks/revalidateRelatedChapter";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  admin: {
    group: "Media Content",
    defaultColumns: ["image", "chapter", "order", "status"],
  },
  hooks: {
    beforeOperation: [onSoftDelete("gallery")],
    beforeChange: [beforeChangeSoftDelete],
    afterChange: [revalidateRelatedChapter],
    afterOperation: [afterSoftDelete],
  },
  access: {
    read: softDeleteAccess,
  },
  fields: [
    { name: "image", type: "upload", relationTo: "gallery-media", required: true },
    { name: "order", type: "number" },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: true,
    },
    ...softDeleteFields,
  ],
};
