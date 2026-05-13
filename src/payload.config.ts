import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { s3Storage } from "@payloadcms/storage-s3";

import { Chapters } from "@/collections/Chapters";
import { Media } from "@/collections/Media";
import { Members } from "@/collections/Members";
import { Leaders } from "@/collections/Leaders";
import { Testimonials } from "@/collections/Testimonials";
import { PricingPlans } from "@/collections/PricingPlans";
import { Events } from "@/collections/Events";
import { Gallery } from "@/collections/Gallery";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  routes: {
    api: "/api",
  },
  collections: [
    Chapters,
    Leaders,
    Members,
    PricingPlans,
    Testimonials,
    Events,
    Gallery,
    Media,
    {
      slug: "users",
      auth: true,
      admin: {
        useAsTitle: "email",
      },
      access: {
        read: () => true,
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
  plugins: [
    /*
    s3Storage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "ap-northeast-1",
        endpoint: process.env.S3_ENDPOINT || "",
        forcePathStyle: true,
      },
    }),
    */
  ],
});
