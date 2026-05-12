import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Superiors Chapter | NIA Surat",
};

export default async function SuperiorsPage() {
  const chapter = await getChapterBySlug("superiors");

  return (
    <main>
      <HeroSection
        chapterNumber={chapter?.chapterNumber || "Chapter 02"}
        chapterName={chapter?.name || "Superiors"}
        subtitle={
          chapter?.hero?.subtitle ||
          "Where the elite of Surat's industry meet to collaborate and grow."
        }
        bullets={chapter?.hero?.bullets?.map((b) => b.text) || []}
        mainImage={chapter?.hero?.mainImage}
        leaderImage={chapter?.hero?.leaderImage}
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
