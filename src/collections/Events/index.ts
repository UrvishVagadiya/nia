import { CollectionConfig } from "payload";
// Trigger re-save to fix stale config error
import { withSoftDelete } from "../../utils/softDelete";
import { revalidateRelatedChapter } from "../../hooks/revalidateRelatedChapter";

export const Events: CollectionConfig = withSoftDelete({
  slug: "events",
  admin: {
    useAsTitle: "topic",
    group: "Chapter Data",
    defaultColumns: ["topic", "date", "chapter", "status"],
  },
  hooks: {
    afterChange: [revalidateRelatedChapter],
  },
  fields: [
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      required: false,
      hasMany: false,
    },
    {
      name: "dateSelector",
      type: "ui",
      admin: {
        components: {
          Field: "@/components/admin/EventDatePicker",
        },
      },
    },
    {
      name: "day",
      type: "text",
      required: true,
      admin: {
        description: "Auto-populated by the Date Picker above",
        width: "50%",
      },
    },
    {
      name: "date",
      type: "text",
      required: true,
      admin: {
        description: "Auto-populated (e.g. Oct 24)",
        width: "50%",
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
});
