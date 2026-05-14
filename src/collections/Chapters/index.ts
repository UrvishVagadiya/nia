import { CollectionConfig } from "payload";
import formatSlug from "../../hooks/formatSlug";
import { revalidateChapter } from "../../hooks/revalidateChapter";

export const Chapters: CollectionConfig = {
  slug: "chapters",
  admin: {
    useAsTitle: "name",
    group: "Chapter Data",
    defaultColumns: ["name", "slug", "chapterNumber"],
  },
  hooks: {
    afterChange: [revalidateChapter],
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
                  hooks: {
                    beforeValidate: [formatSlug("name")],
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
                {
                  name: "venue",
                  type: "text",
                  required: false,
                  admin: {
                    width: "33%",
                    placeholder: "Hyatt Regency, Athwa Lines",
                  },
                },
                {
                  name: "email",
                  type: "email",
                  required: false,
                  admin: {
                    width: "33%",
                    placeholder: "chapter@niasurat.com",
                    description: "Emails for this chapter will be sent to this address.",
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
                      required: false,
                      admin: { width: "50%" },
                    },
                    {
                      name: "subtitle",
                      type: "textarea",
                      required: false,
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
                      type: "upload",
                      relationTo: "media",
                      label: "Main Hero Image",
                      required: false,
                      admin: {
                        width: "50%",
                        description: "Select an image from the Media collection.",
                      },
                    },
                    {
                      name: "leaderImage",
                      type: "upload",
                      relationTo: "media",
                      label: "Leader Secondary Image",
                      required: false,
                      admin: {
                        width: "50%",
                        description: "Select a secondary image from the Media collection.",
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
