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
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Leader Photo",
      admin: {
        description: "Select the leader's photo from the Media collection.",
      },
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
