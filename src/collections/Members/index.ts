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
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Member Photo",
      admin: {
        description: "Select the member's photo from the Media collection.",
      },
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
