import { CollectionConfig } from "payload";
import { syncMemberCounts, syncMemberCountsOnDelete } from "../../hooks/syncMemberCounts";

export const Members: CollectionConfig = {
  slug: "members",
  admin: {
    useAsTitle: "name",
    group: "Chapter Data",
    defaultColumns: ["name", "chapter", "photo", "specialty"],
    components: {
      beforeList: ["@/components/admin/ChapterFilterBar"],
    },
  },
  hooks: {
    afterChange: [syncMemberCounts],
    afterDelete: [syncMemberCountsOnDelete],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "specialty", type: "text", required: true },
    { name: "company", type: "text", required: true },
    { name: "convention", type: "text" },
    { name: "oneliner", type: "textarea" },
    {
      type: "row",
      fields: [
        {
          name: "photo",
          type: "upload",
          relationTo: "members-media",
          label: "Member Photo (Upload)",
          admin: {
            width: "50%",
            description: "Upload a file to Supabase. This is preferred for optimization.",
          },
        },
        {
          name: "photoURL",
          type: "text",
          label: "Member Photo (Direct URL)",
          admin: {
            width: "50%",
            description: "Or paste a direct Supabase/Unsplash URL here.",
          },
        },
      ],
    },
    { name: "location", type: "text" },
    { name: "joined", type: "text" },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: true,
    },
  ],
};
