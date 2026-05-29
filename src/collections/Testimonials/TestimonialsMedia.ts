import { CollectionConfig } from "payload";

export const TestimonialsMedia: CollectionConfig = {
  slug: "testimonials-media",
  upload: true,
  admin: {
    group: "Media Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: false,
      defaultValue: "Testimonial Photo",
    },
  ],
};
