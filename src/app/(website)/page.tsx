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
  // Get subdomain from headers (set in middleware)
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const subdomain = headersList.get("x-subdomain");

  // If no subdomain is present, dynamically redirect to the first available chapter
  const chapters = await getAllChapters();
  if (!subdomain) {
    if (chapters && chapters.length > 0) {
      const firstChapterSlug = chapters[0].slug;

      // Determine the base domain for redirection
      let redirectUrl = "";
      if (host.includes("localhost")) {
        redirectUrl = `http://${firstChapterSlug}.localhost:3000`;
      } else {
        const productionDomain = "nia-surat.propelius.tech";
        redirectUrl = `https://${firstChapterSlug}.${productionDomain}`;
      }

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
    <main className="overflow-hidden">
      <CityPartnerSection />
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

      <UpdatesSection />

      <FAQSection />

      <StepsSection
        chapterId={chapter.id}
        chapterSlug={chapterSlug}
        chapterName={chapter.name}
        venue={chapter.venue}
      />
    </main>
  );
}
