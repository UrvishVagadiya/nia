import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getChapterBySlug } from "@/lib/payload";
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

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate dynamic SEO metadata based on the chapter data from Supabase
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);

  if (!chapter) {
    return {
      title: "Chapter Not Found | NIA Surat",
    };
  }

  return {
    title: `${chapter.name} Chapter | NIA Surat`,
    description: chapter.hero?.subtitle || `Join the ${chapter.name} chapter of NIA Surat.`,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch everything dynamically from Payload CMS (Supabase)
  const chapter = await getChapterBySlug(slug);

  // If the chapter doesn't exist in the CMS, we can either 404 or show a fallback
  // For known chapters like superiors/pioneers, it's better to show a "Coming Soon" or default state
  if (!chapter) {
    const isKnownChapter = ["superiors", "pioneers", "innovators"].includes(slug);

    if (!isKnownChapter) {
      return notFound();
    }

    // Fallback data for known chapters that aren't in the CMS yet
    return (
      <main>
        <HeroSection
          chapterNumber={slug === "superiors" ? "Chapter 02" : "Chapter 03"}
          chapterName={slug.charAt(0).toUpperCase() + slug.slice(1)}
          subtitle="This chapter is currently being set up in our CMS. Check back soon for updates!"
          bullets={[]}
        />
        <WhyJoinSection />
        <GetintoRoom />
        <StepsSection />
      </main>
    );
  }

  // Determine the next upcoming event from the chapter events (shared util)
  const nextEvent = getNextEvent(chapter.events || []);

  return (
    <main>
      <HeroSection
        chapterNumber={chapter.chapterNumber}
        chapterName={chapter.name}
        subtitle={chapter.hero?.subtitle || ""}
        caption={chapter.hero?.caption}
        bullets={chapter.hero?.bullets?.map((b) => b.text) || []}
        mainImage={chapter.hero?.mainImage}
        leaderImage={chapter.hero?.leaderImage}
        nextEvent={nextEvent}
      />

      {/* Stat Band - Mapping Supabase data to labels/values */}
      <StatBand stats={chapter.stats} />

      <WhyJoinSection />

      <GetintoRoom />

      {/* Conditional rendering for Chapter Leader */}
      {chapter.leader && <LeaderSection leader={chapter.leader} chapter={chapter} />}

      {/* Dynamic Members Directory */}
      <MembersSection members={chapter.members} />

      {/* Testimonials from chapter and global pool */}
      <TestimonialsSection testimonials={chapter.testimonials} />

      {/* Chapter-specific Schedule/Events */}
      <ScheduleSection chapterSlug={chapter.slug} />

      {/* Pricing Plans for this chapter */}
      <PricingSection plans={chapter.pricing} />

      <UpdatesSection />

      <FAQSection faqs={chapter.faqs} />

      <StepsSection
        chapterId={chapter.id}
        chapterSlug={chapter.slug}
        chapterName={chapter.name}
        venue={chapter.venue}
      />
    </main>
  );
}
