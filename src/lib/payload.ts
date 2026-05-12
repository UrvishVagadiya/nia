// Get all chapters with only name and slug (for Navbar, etc)
export const getAllChapters = async (): Promise<Pick<Chapter, "name" | "slug">[]> => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "chapters",
    limit: 100,
  });
  // Only return name and slug for each chapter, with runtime property checks
  return result.docs
    .filter(
      (doc: unknown): doc is { name: string; slug: string } =>
        typeof doc === "object" && doc !== null && "name" in doc && "slug" in doc
    )
    .map((doc) => ({ name: doc.name, slug: doc.slug }));
};
import { Chapter, Leader, Member, PricingPlan, ScheduleItem, Testimonial } from "./types";
import { getPayload } from "payload";
import config from "@/payload.config";

export const getChapterBySlug = async (slug: string): Promise<Chapter | null> => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "chapters",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2, // Populate leader, members, etc.
  });

  if (result.docs.length === 0) return null;

  const chapter = result.docs[0];

  // Fetch related data that isn't directly in Chapters collection fields
  // (Assuming we have relationships set up or we fetch by chapter ID)
  const [leader, members, pricing, events, testimonials, gallery] = await Promise.all([
    payload.find({ collection: "leaders", where: { chapter: { equals: chapter.id } } }),
    payload.find({ collection: "members", where: { chapter: { equals: chapter.id } } }),
    payload.find({ collection: "pricing-plans", where: { chapter: { equals: chapter.id } } }),
    payload.find({ collection: "events", where: { chapter: { equals: chapter.id } } }),
    payload.find({
      collection: "testimonials",
      where: {
        or: [{ chapter: { equals: chapter.id } }, { isGlobal: { equals: true } }],
      },
    }),
    payload.find({
      collection: "gallery",
      where: { chapter: { equals: chapter.id } },
      sort: "order",
    }),
  ]);

  const chapterData = result.docs[0];
  return {
    id: chapterData.id,
    name: chapterData.name,
    slug: chapterData.slug,
    chapterNumber: chapterData.chapterNumber,
    hero: {
      ...chapterData.hero,
      mainImage: chapterData.hero.mainImage,
      leaderImage: chapterData.hero.leaderImage,
    },
    stats: Array.isArray(chapterData.stats) ? chapterData.stats : [],
    leader: (leader.docs[0] as Leader) || null,
    members: (members.docs as Member[]) || [],
    pricing: (pricing.docs as PricingPlan[]) || [],
    events: Array.isArray(events.docs)
      ? events.docs.map((e: Record<string, unknown>) => ({
          day: String(e.day),
          date: String(e.date),
          topic: String(e.topic),
          rsvps: Number(e.rsvps),
        }))
      : [],
    testimonials: Array.isArray(testimonials.docs)
      ? testimonials.docs.map((t: Record<string, unknown>) => ({
          quote: String(t.quote),
          who: String(t.who),
          role: String(t.role),
          photo: String(t.photo),
        }))
      : [],
    gallery: Array.isArray(gallery.docs)
      ? gallery.docs.map((g: Record<string, unknown>) => String(g.url || g.image || ""))
      : [],
  };
};

export const getGlobalTestimonials = async () => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "testimonials",
    where: {
      isGlobal: {
        equals: true,
      },
    },
    limit: 10,
  });
  return result.docs;
};
