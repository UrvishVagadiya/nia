import { CollectionConfig } from "payload";
import { withSoftDelete } from "../../utils/softDelete";
import { revalidateRelatedChapter } from "../../hooks/revalidateRelatedChapter";

export const Leaders: CollectionConfig = withSoftDelete({
  slug: "leaders",
  admin: {
    useAsTitle: "name",
    group: "Chapter Data",
    defaultColumns: ["name", "role", "chapter", "isDeleted"],
  },
  hooks: {
    afterChange: [revalidateRelatedChapter],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "quote", type: "textarea" },
    {
      name: "photo_source",
      type: "radio",
      label: "Image Source",
      defaultValue: "upload",
      options: [
        { label: "Upload File", value: "upload" },
        { label: "Direct URL", value: "url" },
      ],
      admin: {
        position: "sidebar",
        description: "How will you provide the photo?",
      },
    },
    {
      type: "group",
      label: "Leader Photo",
      fields: [
        {
          name: "photo",
          type: "upload",
          relationTo: "leaders-media",
          label: false,
          admin: {
            condition: (data) => data.photo_source === "upload" || !data.photo_source,
            description: "Upload a file or select from the media library.",
          },
        },
        {
          name: "photoURL",
          type: "text",
          label: "Direct Image URL",
          admin: {
            condition: (data) => data.photo_source === "url",
            description: "Enter a direct link to an image (e.g., Unsplash).",
            placeholder: "https://example.com/photo.jpg",
          },
        },
      ],
    },
    { name: "specialty", type: "text" },
    { name: "tenure", type: "text" },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: false,
      unique: true,
    },
  ],
});
