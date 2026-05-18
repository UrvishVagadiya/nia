import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getChapterBySlug, getAllChapters } from "@/lib/payload";
import { getNextEvent } from "@/hooks/getNextEvent";
import {
  HeroSection,
  StatBand,
  WhyJoinSection,
  StepsSection,
  LeaderSection,
  MembersSection,
  TestimonialsSection,
  ScheduleSection,
  PricingSection,
  UpdatesSection,
  FAQSection,
  GetintoRoom,
} from "@/components/sections";
import CityPartnerSection from "@/components/sections/CityPartnerSection";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const subdomain = headersList.get("x-subdomain");

  const chapters = await getAllChapters();
  if (!subdomain) {
    if (chapters && chapters.length > 0) {
      const firstChapterSlug = chapters[0].slug;
      const isLocal = host.includes("localhost");
      const protocol = isLocal ? "http" : "https";
      const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "nia-surat.propelius.tech";

      const redirectUrl = isLocal
        ? `${protocol}://${firstChapterSlug}.localhost:3000`
        : `${protocol}://${firstChapterSlug}.${rootDomain}`;

      redirect(redirectUrl);
    }
  }

  const chapterSlug = subdomain || chapters[0]?.slug || "innovators";

  // Fetch the chapter data from Payload CMS
  const chapter = await getChapterBySlug(chapterSlug);

  // If chapter not found, return 404
  if (!chapter) {
    notFound();
  }

  // Determine the next upcoming event from the chapter events (shared util)
  const nextEvent = getNextEvent(chapter.events || []);

  return (
    <main className="overflow-hidden alternating-sections">
      <HeroSection
        chapterNumber={chapter.chapterNumber || ""}
        chapterName={chapter.name}
        subtitle={chapter.hero?.subtitle || ""}
        caption={chapter.hero?.caption || ""}
        bullets={chapter.hero?.bullets?.map((b) => b.text) || []}
        mainImage={chapter.hero?.mainImage}
        leaderImage={chapter.hero?.leaderImage}
        nextEvent={nextEvent}
      />

      <StatBand stats={chapter.stats} />

      <CityPartnerSection data={chapter.cityPartner} />

      <WhyJoinSection />

      <GetintoRoom />

      <LeaderSection leader={chapter.leader} chapter={chapter} />

      <MembersSection members={chapter.members} />

      <TestimonialsSection testimonials={chapter.testimonials} />

      <ScheduleSection
        key={chapterSlug}
        chapterSlug={chapterSlug}
        events={chapter.events || []}
        chapterVenue={chapter.venue || ""}
      />

      <PricingSection plans={chapter.pricing || []} />

      <UpdatesSection updates={chapter.updates} />

      <FAQSection faqs={chapter.faqs} />

      <StepsSection
        chapterId={chapter.id}
        chapterSlug={chapterSlug}
        chapterName={chapter.name}
        venue={chapter.venue}
      />
    </main>
  );
}
