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
      name: "date",
      type: "date",
      required: true,

      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },

    {
      name: "startTime",
      type: "text",
      required: true,
    },

    {
      name: "endTime",
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
