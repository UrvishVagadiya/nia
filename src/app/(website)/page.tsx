import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getChapterBySlug } from "@/lib/payload";
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
  const chapterSlug = headersList.get("x-subdomain") || "innovators";

  // Fetch the chapter data from Payload CMS
  const chapter = await getChapterBySlug(chapterSlug);

  // If chapter not found, return 404
  if (!chapter) {
    notFound();
  }

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
      />

      <StatBand stats={chapter.stats} />

      <WhyJoinSection />

      <GetintoRoom />

      <LeaderSection leader={chapter.leader} chapter={chapter} />

      <MembersSection members={chapter.members} />

      <TestimonialsSection testimonials={chapter.testimonials} />

      <ScheduleSection chapterSlug={chapterSlug} />

      <PricingSection plans={chapter.pricing || []} />

      <UpdatesSection />

      <FAQSection />

      <StepsSection chapterSlug={chapterSlug} chapterName={chapter.name} venue={chapter.venue} />
    </main>
  );
}
