import { CollectionConfig } from "payload";
import formatSlug from "../../hooks/formatSlug";
import { revalidateChapter } from "../../hooks/revalidateChapter";
import { deleteChapterDependencies } from "../../utils/deleteChapterDependencies";
import { withSoftDelete } from "../../utils/softDelete";

export const Chapters: CollectionConfig = withSoftDelete(
  {
    slug: "chapters",
    admin: {
      useAsTitle: "name",
      group: "Chapter Data",
      defaultColumns: ["name", "slug", "chapterNumber", "status"],
    },
    hooks: {
      afterChange: [revalidateChapter],
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
                    admin: {
                      width: "33%",
                      autoComplete: "off",
                    },
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
                      placeholder: "01",
                    },
                    validate: (val: string | string[] | null | undefined) => {
                      if (!val) return "Chapter number is required";
                      if (Array.isArray(val)) return "Please enter a single number";
                      if (!/^\d+$/.test(val)) return "Please enter numbers only (e.g. 01, 02)";
                      return true;
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
                    name: "mail",
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
  },
  deleteChapterDependencies
);
