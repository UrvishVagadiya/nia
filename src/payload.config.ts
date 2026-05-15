import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { s3Storage } from "@payloadcms/storage-s3";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

import { Chapters } from "@/collections/Chapters";
import { Media } from "@/collections/Media";
import { Members } from "@/collections/Members";
import { Leaders } from "@/collections/Leaders";
import { Testimonials } from "@/collections/Testimonials";
import { PricingPlans } from "@/collections/PricingPlans";
import { Events } from "@/collections/Events";
import { Gallery } from "@/collections/Gallery";
import { MembersMedia } from "@/collections/Members/MembersMedia";
import { LeadersMedia } from "@/collections/Leaders/LeadersMedia";
import { TestimonialsMedia } from "@/collections/Testimonials/TestimonialsMedia";
import { GalleryMedia } from "@/collections/Gallery/GalleryMedia";
import { Inquiries } from "@/collections/Inquiries";
import { FAQs } from "@/collections/FAQs";
import { Updates } from "@/collections/Updates";
import { CityPartners } from "@/collections/CityPartners";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"].filter(Boolean),
  routes: {
    api: "/api",
  },
  collections: [
    Media,
    MembersMedia,
    LeadersMedia,
    TestimonialsMedia,
    GalleryMedia,
    Chapters,
    Leaders,
    Members,
    PricingPlans,
    Testimonials,
    Events,
    Gallery,
    Inquiries,
    FAQs,
    Updates,
    CityPartners,
    {
      slug: "users",
      auth: true,
      admin: {
        useAsTitle: "email",
      },
      access: {
        read: ({ req: { user } }) => !!user,
      },
      fields: [],
    },
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM_ADDRESS || "admin@niasurat.com",
    defaultFromName: "NIA Surat",
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: true,
      tls: {
        rejectUnauthorized: false,
      },
    },
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename }) => {
            return `https://${process.env.SUPABASE_PROJECT_ID}.storage.supabase.co/storage/v1/object/public/${process.env.S3_BUCKET_HEROES || "heroes"}/${filename}`;
          },
        },
      },
      bucket: process.env.S3_BUCKET_HEROES || "heroes",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "us-east-1",
        endpoint: process.env.S3_ENDPOINT || "",
        forcePathStyle: true,
      },
    }),
    s3Storage({
      collections: {
        "members-media": {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename }) => {
            return `https://${process.env.SUPABASE_PROJECT_ID}.storage.supabase.co/storage/v1/object/public/${process.env.S3_BUCKET_MEMBERS || "members"}/${filename}`;
          },
        },
      },
      bucket: process.env.S3_BUCKET_MEMBERS || "members",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "us-east-1",
        endpoint: process.env.S3_ENDPOINT || "",
        forcePathStyle: true,
      },
    }),
    s3Storage({
      collections: {
        "leaders-media": {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename }) => {
            return `https://${process.env.SUPABASE_PROJECT_ID}.storage.supabase.co/storage/v1/object/public/${process.env.S3_BUCKET_LEADERS || "leaders"}/${filename}`;
          },
        },
      },
      bucket: process.env.S3_BUCKET_LEADERS || "leaders",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "us-east-1",
        endpoint: process.env.S3_ENDPOINT || "",
        forcePathStyle: true,
      },
    }),
    s3Storage({
      collections: {
        "testimonials-media": {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename }) => {
            return `https://${process.env.SUPABASE_PROJECT_ID}.storage.supabase.co/storage/v1/object/public/${process.env.S3_BUCKET_TESTIMONIALS || "testimonials"}/${filename}`;
          },
        },
      },
      bucket: process.env.S3_BUCKET_TESTIMONIALS || "testimonials",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "us-east-1",
        endpoint: process.env.S3_ENDPOINT || "",
        forcePathStyle: true,
      },
    }),
    s3Storage({
      collections: {
        "gallery-media": {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename }) => {
            return `https://${process.env.SUPABASE_PROJECT_ID}.storage.supabase.co/storage/v1/object/public/${process.env.S3_BUCKET_GALLERY || "gallery"}/${filename}`;
          },
        },
      },
      bucket: process.env.S3_BUCKET_GALLERY || "gallery",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "ap-southeast-1",
        endpoint: process.env.S3_ENDPOINT || "",
        forcePathStyle: true,
      },
    }),
  ],
});
