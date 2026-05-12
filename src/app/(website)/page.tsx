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

export default async function Home() {
  // Fetch the default chapter (innovators) from Payload CMS
  const chapter = await getChapterBySlug("innovators");

  // If CMS is empty or record is missing, show the static version with fallbacks
  // (All components now have fallbacks internally)

  return (
    <main className="overflow-hidden">
      <HeroSection
        chapterNumber={chapter?.chapterNumber || "Chapter 01"}
        chapterName={chapter?.name || "Innovators"}
        subtitle={chapter?.hero?.subtitle || "Surat’s room of trusted professionals."}
        caption={
          chapter?.hero.caption || "25 category leaders. One chair per specialty. No overlap."
        }
        bullets={chapter?.hero.bullets?.map((b) => b.text) || []}
        mainImage={chapter?.hero.mainImage}
        leaderImage={chapter?.hero.leaderImage}
      />

      <StatBand stats={chapter?.stats} />

      <WhyJoinSection />

      <GetintoRoom />

      <LeaderSection leader={chapter?.leader} chapter={chapter} />

      <MembersSection members={chapter?.members} />

      <TestimonialsSection testimonials={chapter?.testimonials} />

      <ScheduleSection events={chapter?.events} />

      <PricingSection plans={chapter?.pricing || []} />

      <UpdatesSection />

      <FAQSection />

      <StepsSection />
    </main>
  );
}
