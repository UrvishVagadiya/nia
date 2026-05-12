import { Chapter, Leader, Member, PricingPlan } from "./types";
import { getPayload } from "payload";
import config from "@/payload.config";

type ChapterSummaryDoc = {
  id: string | number;
  name: string;
  slug: string;
  venue?: string;
};

type MediaDoc = {
  url?: string;
};
type TestimonialDocShape = Record<string, string | number | undefined>;
type ChapterDoc = {
  id: string | number;
  name: string;
  slug: string;
  chapterNumber: string;
  venue?: string;
  hero?: {
    mainImage?: string | MediaDoc;
    mainImage_url?: string;
    leaderImage?: string | MediaDoc;
    leaderImage_url?: string;
    title?: string;
    subtitle?: string;
    caption?: string;
    bullets?: { text: string }[];
  };
  stats?: { label: string; value: string }[];
};

// Get all chapters with only name/slug/venue (for Navbar + forms)
export const getAllChapters = async (): Promise<Pick<Chapter, "name" | "slug" | "venue">[]> => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "chapters",
    limit: 100,
  });
  const docs = result.docs as ChapterSummaryDoc[];
  return docs.map((doc) => ({ name: doc.name, slug: doc.slug, venue: doc.venue }));
};

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
    payload.find({
      collection: "leaders",
      where: { chapter: { equals: chapter.id } },
      limit: 100,
    }),
    payload.find({
      collection: "members",
      where: { chapter: { equals: chapter.id } },
      limit: 100,
    }),
    payload.find({
      collection: "pricing-plans",
      where: { chapter: { equals: chapter.id } },
      limit: 100,
    }),
    payload.find({
      collection: "events",
      where: { chapter: { equals: chapter.id } },
      limit: 100,
    }),
    payload.find({
      collection: "testimonials",
      where: {
        or: [{ chapter: { equals: chapter.id } }, { isGlobal: { equals: true } }],
      },
      limit: 100,
    }),
    payload.find({
      collection: "gallery",
      where: { chapter: { equals: chapter.id } },
      sort: "order",
      limit: 100,
    }),
  ]);

  const chapterData = result.docs[0] as ChapterDoc;
  const eventDocs = events.docs as Record<string, string | number | undefined>[];
  const testimonialDocs = testimonials.docs as (TestimonialDocShape & {
    photo?: string | MediaDoc;
  })[];
  const galleryDocs = gallery.docs as { image?: string | MediaDoc; url?: string }[];

  const getImageUrl = (img: string | MediaDoc | undefined | null): string => {
    if (!img) return "";
    if (typeof img === "string") return img;
    return img.url || "";
  };

  return {
    id: chapterData.id,
    name: chapterData.name,
    slug: chapterData.slug,
    chapterNumber: chapterData.chapterNumber,
    venue: chapterData.venue,
    hero: {
      title: chapterData.hero?.title || "",
      subtitle: chapterData.hero?.subtitle || "",
      caption: chapterData.hero?.caption || "",
      bullets: chapterData.hero?.bullets || [],
      mainImage: getImageUrl(chapterData.hero?.mainImage),
      leaderImage: getImageUrl(chapterData.hero?.leaderImage),
    },
    stats: Array.isArray(chapterData.stats) ? chapterData.stats : [],
    leader: (leader.docs[0] as Leader) || null,
    members: (members.docs as Member[]) || [],
    pricing: (pricing.docs as PricingPlan[]) || [],
    events: Array.isArray(eventDocs)
      ? eventDocs.map((e) => ({
          day: String(e.day || ""),
          date: String(e.date || ""),
          topic: String(e.topic || ""),
          venue: String(e.venue || ""),
          rsvps: Number(e.rsvps || 0),
        }))
      : [],
    testimonials: Array.isArray(testimonialDocs)
      ? testimonialDocs.map((t) => ({
          quote: String(t.quote || ""),
          who: String(t.who || ""),
          role: String(t.role || ""),
          photo: getImageUrl(t.photo),
        }))
      : [],
    gallery: Array.isArray(galleryDocs)
      ? galleryDocs.map((g) => getImageUrl(g.image) || g.url || "")
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
