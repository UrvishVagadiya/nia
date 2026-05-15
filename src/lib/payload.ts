import { Chapter, Member, PricingPlan } from "./types";
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
type ChapterDoc = {
  id: string | number;
  name: string;
  slug: string;
  chapterNumber: string;
  venue?: string;
  hero?: {
    mainImage?: string | MediaDoc;
    leaderImage?: string | MediaDoc;
    title?: string;
    subtitle?: string;
    caption?: string;
    bullets?: { text: string }[];
  };
  stats?: { label: string; value: string }[];
};

type LeaderDoc = {
  id: string | number;
  name: string;
  role: string;
  quote?: string;
  photo?: string | MediaDoc;
  photoURL?: string;
  specialty?: string;
  tenure?: string;
  chapter?: string | number | ChapterSummaryDoc;
};

type MemberDoc = {
  id: string | number;
  name: string;
  specialty: string;
  company: string;
  convention?: string;
  oneliner?: string;
  photo?: string | MediaDoc;
  photoURL?: string;
  location?: string;
  joined?: string;
  chapter?: string | number | ChapterSummaryDoc;
};

type TestimonialDoc = {
  id: string | number;
  quote: string;
  testimonialType: "member" | "leader" | "external";
  member?: string | number | MemberDoc;
  leader?: string | number | LeaderDoc;
  who?: string;
  role?: string;
  photo?: string | MediaDoc;
  photoURL?: string;
  photoUrl?: string;
  isGlobal?: boolean;
  chapter?: string | number | ChapterSummaryDoc;
};

type EventDoc = {
  id: string | number;
  day: string;
  date: string;
  startTime?: string;
  endTime?: string;
  topic: string;
  venue?: string;
  rsvps?: number;
};

type GalleryDoc = {
  id: string | number;
  image?: string | MediaDoc;
  url?: string;
};

// Get all chapters with only name/slug/venue (for Navbar + forms)
export const getAllChapters = async (): Promise<Pick<Chapter, "name" | "slug" | "venue">[]> => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "chapters",
    where: {
      isDeleted: {
        not_equals: true,
      },
    },
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
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          isDeleted: {
            not_equals: true,
          },
        },
      ],
    },
  });

  if (result.docs.length === 0) return null;

  const chapter = result.docs[0];

  // Fetch related data that isn't directly in Chapters collection fields
  // (Assuming we have relationships set up or we fetch by chapter ID)
  const [leader, members, pricing, events, testimonials, gallery] = await Promise.all([
    payload.find({
      collection: "leaders",
      where: {
        and: [{ chapter: { equals: chapter.id } }, { isDeleted: { not_equals: true } }],
      },
      limit: 100,
      depth: 2,
    }),
    payload.find({
      collection: "members",
      where: {
        and: [{ chapter: { equals: chapter.id } }, { isDeleted: { not_equals: true } }],
      },
      limit: 100,
      depth: 2,
    }),
    payload.find({
      collection: "pricing-plans",
      where: {
        and: [{ chapter: { equals: chapter.id } }, { isDeleted: { not_equals: true } }],
      },
      limit: 100,
      depth: 2,
    }),
    payload.find({
      collection: "events",
      where: {
        and: [{ chapter: { equals: chapter.id } }, { isDeleted: { not_equals: true } }],
      },
      limit: 100,
      depth: 2,
    }),
    payload.find({
      collection: "testimonials",
      where: {
        and: [
          {
            or: [{ chapter: { equals: chapter.id } }, { isGlobal: { equals: true } }],
          },
          { isDeleted: { not_equals: true } },
        ],
      },
      limit: 100,
      depth: 2,
    }),
    payload.find({
      collection: "gallery",
      where: {
        and: [{ chapter: { equals: chapter.id } }, { isDeleted: { not_equals: true } }],
      },
      sort: "order",
      limit: 100,
      depth: 2,
    }),
  ]);

  const chapterData = result.docs[0] as unknown as ChapterDoc;
  const eventDocs = events.docs as unknown as EventDoc[];
  const testimonialDocs = testimonials.docs as unknown as TestimonialDoc[];
  const galleryDocs = gallery.docs as unknown as GalleryDoc[];

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
    leader: leader.docs[0]
      ? {
          ...(leader.docs[0] as unknown as LeaderDoc),
          id: String(leader.docs[0].id),
          photo:
            (leader.docs[0] as unknown as LeaderDoc).photoURL ||
            getImageUrl((leader.docs[0] as unknown as LeaderDoc).photo),
          chapter_id: chapterData.id,
          quote: String((leader.docs[0] as unknown as LeaderDoc).quote || ""),
        }
      : undefined,
    members: (members.docs as unknown as MemberDoc[]).map((m) => ({
      ...m,
      id: String(m.id),
      photo: m.photoURL || getImageUrl(m.photo),
    })) as Member[],
    pricing:
      (pricing.docs as unknown as PricingPlan[]).map((p) => ({
        ...p,
        features: Array.isArray(p.features)
          ? p.features.map((f) => (typeof f === "string" ? f : f.text))
          : [],
      })) || [],
    events: Array.isArray(eventDocs)
      ? eventDocs.map((e) => ({
          day: String(e.day || ""),
          date: String(e.date || ""),
          startTime: e.startTime ? String(e.startTime) : undefined,
          endTime: e.endTime ? String(e.endTime) : undefined,
          topic: String(e.topic || ""),
          venue: String(e.venue || ""),
          rsvps: Number(e.rsvps || 0),
        }))
      : [],
    testimonials: Array.isArray(testimonialDocs)
      ? testimonialDocs.map((t) => {
          const type = t.testimonialType || "external";
          let who = String(t.who || "");
          let role = String(t.role || "");
          let photo = t.photoURL || t.photoUrl || getImageUrl(t.photo);

          if (type === "member" && t.member && typeof t.member === "object") {
            const m = t.member as MemberDoc;
            who = m.name || who;
            role = m.specialty || role;
            photo = photo || m.photoURL || getImageUrl(m.photo);
          } else if (type === "leader" && t.leader && typeof t.leader === "object") {
            const l = t.leader as LeaderDoc;
            who = l.name || who;
            role = l.role || role;
            photo = photo || l.photoURL || getImageUrl(l.photo);
          }

          return {
            quote: String(t.quote || ""),
            who,
            role,
            photo,
          };
        })
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
      and: [
        {
          isGlobal: {
            equals: true,
          },
        },
        {
          isDeleted: {
            not_equals: true,
          },
        },
      ],
    },
    limit: 10,
  });
  return result.docs;
};
