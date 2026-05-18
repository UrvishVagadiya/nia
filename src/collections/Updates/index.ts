import { CollectionConfig } from "payload";
import formatSlug from "../../hooks/formatSlug";
import { withSoftDelete } from "../../utils/softDelete";

export const Updates: CollectionConfig = withSoftDelete({
  slug: "updates",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedDate", "published"],
    group: "Chapter Content",
    components: {
      beforeList: ["@/components/admin/ChapterFilterBar"],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Chapter Recap", value: "Chapter Recap" },
        { label: "Member Spotlight", value: "Member Spotlight" },
        { label: "Industry Insight", value: "Industry Insight" },
        { label: "Event", value: "Event" },
      ],
      defaultValue: "Chapter Recap",
    },
    {
      name: "preview",
      type: "textarea",
      required: true,
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "images",
      type: "array",
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "publishedDate",
      type: "date",
      admin: {
        position: "sidebar",
      },
      defaultValue: () => new Date(),
    },
    {
      name: "order",
      type: "number",
      admin: {
        position: "sidebar",
      },
      defaultValue: 0,
    },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
  defaultSort: "-publishedDate",
});
