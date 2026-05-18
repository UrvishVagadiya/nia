import { Chapter, Member, PricingPlan } from "./types";
import { getPayload } from "payload";
import config from "@/payload.config";

type ChapterSummaryDoc = {
  id: string | number;
  name: string;
  slug: string;
  venue?: string;
  mail?: string;
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
  mail?: string;
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

type FAQDoc = {
  id: string | number;
  question: string;
  answer: string;
  order?: number;
};

type UpdateDoc = {
  id: string | number;
  title: string;
  slug: string;
  preview: string;
  category: string;
  images: { image: string | MediaDoc }[];
  publishedDate: string;
};

type CityPartnerDoc = {
  id: string | number;
  city: string;
  title: string;
  subtitle?: string;
  messageParagraphs: { text: string }[];
  partners: {
    name: string;
    role: string;
    image: string | MediaDoc;
    location: string;
  }[];
  closingText: string;
  signatureLine: string;
};

type GalleryDoc = {
  id: string | number;
  image?: string | MediaDoc;
  url?: string;
};

// Get all chapters with only name/slug/venue (for Navbar + forms)
const getAllChaptersUncached = async (): Promise<Pick<Chapter, "name" | "slug" | "venue">[]> => {
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
  return docs.map((doc) => ({ name: doc.name, slug: doc.slug, venue: doc.venue, mail: doc.mail }));
};

const getChapterBySlugUncached = async (slug: string): Promise<Chapter | null> => {
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
  const [leader, members, pricing, events, testimonials, gallery, faqs, updates, cityPartner] =
    await Promise.all([
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
      payload.find({
        collection: "faqs",
        where: {
          and: [{ chapter: { equals: chapter.id } }, { isDeleted: { not_equals: true } }],
        },
        sort: "order",
        limit: 100,
      }),
      payload.find({
        collection: "updates",
        where: {
          and: [
            { chapter: { equals: chapter.id } },
            { published: { equals: true } },
            { isDeleted: { not_equals: true } },
          ],
        },
        sort: "-publishedDate",
        limit: 10,
      }),
      payload.find({
        collection: "city-partners",
        where: {
          published: { equals: true },
        },
        sort: "order",
        limit: 1,
      }),
    ]);

  const chapterData = result.docs[0] as ChapterDoc;
  const eventDocs = events.docs as EventDoc[];
  const testimonialDocs = testimonials.docs as TestimonialDoc[];
  const galleryDocs = gallery.docs as GalleryDoc[];
  const faqDocs = faqs.docs as FAQDoc[];
  const updateDocs = updates.docs as UpdateDoc[];
  const cityPartnerDocs = cityPartner.docs as CityPartnerDoc[];

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
    mail: chapterData.mail,
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
          ...(leader.docs[0] as LeaderDoc),
          id: String(leader.docs[0].id),
          photo:
            (leader.docs[0] as LeaderDoc).photoURL ||
            getImageUrl((leader.docs[0] as LeaderDoc).photo),
          chapter_id: chapterData.id,
          quote: String((leader.docs[0] as LeaderDoc).quote || ""),
        }
      : undefined,
    members: (members.docs as MemberDoc[]).map((m) => ({
      ...m,
      id: String(m.id),
      photo: m.photoURL || getImageUrl(m.photo),
    })) as Member[],
    pricing:
      (pricing.docs as PricingPlan[]).map((p) => ({
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
    faqs: Array.isArray(faqDocs)
      ? faqDocs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))
      : [],
    updates: Array.isArray(updateDocs)
      ? updateDocs.map((u) => ({
          id: String(u.id),
          title: u.title,
          slug: u.slug,
          preview: u.preview,
          category: u.category,
          images: Array.isArray(u.images) ? u.images.map((img) => getImageUrl(img.image)) : [],
          publishedDate: u.publishedDate
            ? (() => {
                const d = new Date(u.publishedDate);
                return isNaN(d.getTime())
                  ? ""
                  : d.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
              })()
            : "",
        }))
      : [],
    cityPartner: cityPartnerDocs[0]
      ? {
          city: cityPartnerDocs[0].city,
          title: cityPartnerDocs[0].title,
          subtitle: cityPartnerDocs[0].subtitle,
          messageParagraphs: Array.isArray(cityPartnerDocs[0].messageParagraphs)
            ? cityPartnerDocs[0].messageParagraphs
            : [],
          partners: Array.isArray(cityPartnerDocs[0].partners)
            ? cityPartnerDocs[0].partners.map((p) => ({
                name: p.name,
                role: p.role,
                image: getImageUrl(p.image),
                location: p.location,
              }))
            : [],
          closingText: cityPartnerDocs[0].closingText,
          signatureLine: cityPartnerDocs[0].signatureLine,
        }
      : undefined,
  };
};

const getGlobalTestimonialsUncached = async () => {
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

// ==========================================
// HIGH-PERFORMANCE UNSTABLE_CACHE WRAPPERS
// ==========================================
import { unstable_cache } from "next/cache";

export const getAllChapters = unstable_cache(
  async (): Promise<Pick<Chapter, "name" | "slug" | "venue">[]> => {
    return getAllChaptersUncached();
  },
  ["all-chapters-list"],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ["chapters"],
  }
);

export const getChapterBySlug = unstable_cache(
  async (slug: string): Promise<Chapter | null> => {
    return getChapterBySlugUncached(slug);
  },
  ["chapter-page-data"],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ["chapters"],
  }
);

export const getGlobalTestimonials = unstable_cache(
  async () => {
    return getGlobalTestimonialsUncached();
  },
  ["global-testimonials-list"],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ["testimonials"],
  }
);
