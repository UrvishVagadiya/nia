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
  title: "Pioneers Chapter | NIA Surat",
};

export default async function PioneersPage() {
  const chapter = await getChapterBySlug("pioneers");

  return (
    <main>
      <HeroSection
        chapterNumber={chapter?.chapterNumber || "Chapter 03"}
        chapterName={chapter?.name || "Pioneers"}
        subtitle={
          chapter?.hero?.subtitle ||
          "A mission-driven group of entrepreneurs leading with innovation."
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
      <ScheduleSection chapterSlug={chapter?.slug || "pioneers"} />
      <PricingSection plans={chapter?.pricing || []} />
      <UpdatesSection />
      <FAQSection />
      <StepsSection
        chapterSlug={chapter?.slug || "pioneers"}
        chapterName={chapter?.name || "Pioneers"}
        venue={chapter?.venue}
      />
    </main>
  );
}
