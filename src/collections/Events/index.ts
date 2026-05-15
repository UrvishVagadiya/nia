import { CollectionConfig } from "payload";
// Trigger re-save to fix stale config error
import {
  softDeleteFields,
  softDeleteAccess,
  onSoftDelete,
  beforeChangeSoftDelete,
  afterSoftDelete,
} from "../../utils/softDelete";
import { revalidateRelatedChapter } from "../../hooks/revalidateRelatedChapter";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "topic",
    group: "Chapter Data",
    defaultColumns: ["topic", "date", "chapter", "status"],
  },
  hooks: {
    beforeOperation: [onSoftDelete("events")],
    beforeChange: [beforeChangeSoftDelete],
    afterChange: [revalidateRelatedChapter],
    afterOperation: [afterSoftDelete],
  },
  access: {
    read: softDeleteAccess,
  },
  fields: [
    ...softDeleteFields,
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: false,
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
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "timeOnly",
        },
      },
    },
    {
      name: "endTime",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "timeOnly",
        },
      },
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
