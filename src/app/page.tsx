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

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection
        chapterNumber="Chapter 01"
        title={
          <span className="italic text-brand font-serif">
            Surat’s room of trusted professionals.
          </span>
        }
        subtitle="72 category leaders. One chair per specialty. No overlap."
      />
      <StatBand />
      <WhyJoinSection />
      <GetintoRoom />
      <LeaderSection />
      <MembersSection />
      <TestimonialsSection />
      <ScheduleSection />
      <PricingSection />
      <UpdatesSection />
      <FAQSection />
      <StepsSection />
    </main>
  );
}
