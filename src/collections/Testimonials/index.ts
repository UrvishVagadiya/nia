import { CollectionConfig } from "payload";
import { withSoftDelete } from "../../utils/softDelete";
import { revalidateRelatedChapter } from "../../hooks/revalidateRelatedChapter";

export const Testimonials: CollectionConfig = withSoftDelete({
  slug: "testimonials",
  admin: {
    useAsTitle: "who",
    group: "Social Proof",
    defaultColumns: ["status", "who", "role", "member", "leader", "quote"],
    components: {
      beforeList: ["@/components/admin/ChapterFilterBar"],
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Automatically sync name and role if member or leader is selected
        if (data.testimonialType === "member" && data.member) {
          const member = await req.payload.findByID({
            collection: "members",
            id: data.member,
            depth: 0,
          });
          if (member) {
            data.who = member.name;
            data.role =
              member.company && member.specialty
                ? `${member.company} - ${member.specialty}`
                : member.company || member.specialty || "";
          }
        } else if (data.testimonialType === "leader" && data.leader) {
          const leader = await req.payload.findByID({
            collection: "leaders",
            id: data.leader,
            depth: 0,
          });
          if (leader) {
            data.who = leader.name;
            data.role = leader.role;
          }
        }
        return data;
      },
    ],
    afterChange: [revalidateRelatedChapter],
  },
  fields: [
    {
      name: "testimonialType",
      type: "select",
      label: "Testimonial From",
      defaultValue: "external",
      options: [
        { label: "Member", value: "member" },
        { label: "Leader", value: "leader" },
        { label: "Other", value: "external" },
      ],
      admin: {
        width: "100%",
      },
    },
    {
      name: "member",
      type: "relationship",
      relationTo: "members",
      label: "Linked Member",
      admin: {
        condition: (data) => data.testimonialType === "member",
      },
    },
    {
      name: "leader",
      type: "relationship",
      relationTo: "leaders",
      label: "Linked Leader",
      admin: {
        condition: (data) => data.testimonialType === "leader",
      },
    },
    {
      type: "row",
      admin: {
        condition: (data) => data.testimonialType === "external",
      },
      fields: [
        {
          name: "who",
          type: "text",
          label: "Name",
          admin: {
            width: "50%",
          },
        },
        {
          name: "role",
          type: "text",
          label: "Role / Designation",
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "quote",
      type: "textarea",
      required: true,
      label: "Testimonial Quote",
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "testimonials-media",
      label: "Photo (Manual Override)",
      admin: {
        condition: (data) => data.testimonialType === "external",
        description: "Only needed if not using a linked member/leader, or to override their photo.",
      },
    },
    {
      name: "photoUrl",
      type: "text",
      label: "Photo URL (External Override)",
      admin: {
        condition: (data) => data.testimonialType === "external",
        description: "Direct URL to an image (e.g. Unsplash). Takes precedence if provided.",
        components: {
          Cell: "@/components/admin/ImageCell",
        },
      },
    },
    {
      name: "isGlobal",
      type: "checkbox",
      label: "Show on all chapters",
      defaultValue: false,
    },
    {
      name: "chapter",
      type: "relationship",
      relationTo: "chapters",
      index: true,
      admin: {
        condition: (data) => !data.isGlobal,
      },
    },
  ],
});
