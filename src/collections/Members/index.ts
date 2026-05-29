import { CollectionConfig } from "payload";
import { syncMemberCounts, syncMemberCountsOnDelete } from "../../hooks/syncMemberCounts";
import { revalidateRelatedChapter } from "../../hooks/revalidateRelatedChapter";
import { withSoftDelete } from "../../utils/softDelete";

export const Members: CollectionConfig = withSoftDelete({
  slug: "members",
  admin: {
    useAsTitle: "name",
    group: "Chapter Data",
    defaultColumns: ["name", "chapter", "photo", "isDeleted", "specialty"],
    components: {
      beforeList: ["@/components/admin/ChapterFilterBar"],
    },
  },
  hooks: {
    afterChange: [syncMemberCounts, revalidateRelatedChapter],
    afterDelete: [syncMemberCountsOnDelete],
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
          name: "photo_source",
          type: "select",
          label: "Image Source",
          defaultValue: "upload",
          options: [
            { label: "Upload File", value: "upload" },
            { label: "Direct URL", value: "url" },
          ],
          admin: {
            width: "25%",
          },
        },
        {
          name: "photo",
          type: "upload",
          relationTo: "members-media",
          label: "Member Photo (Upload)",
          admin: {
            width: "75%",
            description: "Upload a file to Supabase.",
            condition: (data) => data.photo_source === "upload" || !data.photo_source,
            components: {
              Cell: "@/components/admin/ImageCell",
            },
          },
        },
        {
          name: "photoURL",
          type: "text",
          label: "Member Photo (Direct URL)",
          admin: {
            width: "40%",
            description: "Or paste a direct URL here.",
            condition: (data) => data.photo_source === "url",
            components: {
              Cell: "@/components/admin/ImageCell",
            },
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
      required: false,
      index: true,
    },
  ],
});
