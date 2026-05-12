import { CollectionConfig } from "payload";

export const Chapters: CollectionConfig = {
  slug: "chapters",
  admin: {
    useAsTitle: "name",
    group: "Chapter Data",
    defaultColumns: ["name", "slug", "chapterNumber"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "membersLink",
      type: "ui",
      label: "Members",
      admin: {
        components: {
          Cell: "@/components/admin/MembersLink",
        },
        position: "sidebar",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "General Configuration",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                  admin: { width: "33%" },
                },
                {
                  name: "slug",
                  type: "text",
                  required: true,
                  unique: true,
                  admin: {
                    width: "33%",
                    description: "Used in the URL (e.g. innovators, superiors)",
                  },
                },
                {
                  name: "chapterNumber",
                  type: "text",
                  required: true,
                  admin: {
                    width: "33%",
                    placeholder: "Chapter 01",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Hero Section",
          fields: [
            {
              name: "hero",
              type: "group",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      required: true,
                      admin: { width: "50%" },
                    },
                    {
                      name: "subtitle",
                      type: "textarea",
                      required: true,
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  name: "caption",
                  type: "text",
                  admin: {
                    placeholder: "e.g. 72 category leaders. One chair per specialty. No overlap.",
                  },
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "mainImage",
                      type: "text",
                      label: "Main Image (URL or Media Path)",
                      admin: {
                        width: "50%",
                        description: "Paste Unsplash URL or upload to Media and paste path here.",
                      },
                    },
                    {
                      name: "leaderImage",
                      type: "text",
                      label: "Leader Image (URL or Media Path)",
                      admin: {
                        width: "50%",
                        description: "Paste Unsplash URL or upload to Media and paste path here.",
                      },
                    },
                  ],
                },
                {
                  name: "bullets",
                  type: "array",
                  label: "Value Propositions (Bullets)",
                  fields: [
                    {
                      name: "text",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Statistics",
          fields: [
            {
              name: "stats",
              type: "array",
              label: "Chapter Stats (Stat Band)",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      admin: { width: "50%" },
                    },
                    {
                      name: "value",
                      type: "text",
                      admin: { width: "50%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
