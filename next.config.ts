import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["ddpnyfrddiyolkdzsqnx.storage.supabase.co", "unsplash.com", "images.unsplash.com"],
  },
};

export default withPayload(nextConfig);
