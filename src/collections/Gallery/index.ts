import { CollectionConfig } from "payload";
import { withSoftDelete } from "../../utils/softDelete";
import { revalidateRelatedChapter } from "../../hooks/revalidateRelatedChapter";

export const Gallery: CollectionConfig = withSoftDelete({
  slug: "gallery",
  admin: {
    group: "Media Content",
    defaultColumns: ["image", "chapter", "order", "status"],
  },
  hooks: {
    afterChange: [revalidateRelatedChapter],
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
  ],
});
