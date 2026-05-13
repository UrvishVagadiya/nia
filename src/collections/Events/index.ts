import { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "topic",
    group: "Schedule",
    components: {
      beforeList: ["@/components/admin/ChapterFilterBar"],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: true,
      hasMany: false,
    },
    {
      name: "day",
      type: "text",
      required: true,
    },
    {
      name: "date",
      type: "text",
      required: true,
    },
    {
      name: "topic",
      type: "text",
      required: true,
    },
    {
      name: "venue",
      type: "text",
      label: "Venue",
      required: false,
    },
    {
      name: "rsvps",
      type: "number",
      required: true,
      defaultValue: 0,
    },
  ],
};
