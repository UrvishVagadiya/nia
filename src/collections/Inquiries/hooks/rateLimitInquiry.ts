import { CollectionBeforeChangeHook } from "payload";

export const rateLimitInquiry: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  if (operation !== "create") return data;

  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  data.ip = ip;

  // Enforce a strict 60-second limit per IP or Email address
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

  const existing = await req.payload.find({
    collection: "inquiries",
    where: {
      and: [
        {
          or: [{ email: { equals: data.email } }, { ip: { equals: ip } }],
        },
        {
          createdAt: {
            greater_than: oneMinuteAgo.toISOString(),
          },
        },
      ],
    },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    throw new Error("Too many requests. Please try again in 1 minute.");
  }

  return data;
};
