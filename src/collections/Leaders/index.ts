import { CollectionConfig } from "payload";

export const Leaders: CollectionConfig = {
  slug: "leaders",
  admin: {
    useAsTitle: "name",
    group: "Chapter Data",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "quote", type: "textarea" },
    {
      type: "row",
      fields: [
        {
          name: "photo",
          type: "upload",
          relationTo: "leaders-media",
          label: "Leader Photo (Upload)",
          admin: {
            width: "50%",
            description: "Upload a file to Supabase.",
          },
        },
        {
          name: "photoURL",
          type: "text",
          label: "Leader Photo (Direct URL)",
          admin: {
            width: "50%",
            description: "Or paste a direct URL here.",
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
      required: true,
      unique: true,
    },
  ],
};
