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

export default function SuperiorsPage() {
  return (
    <main>
      <HeroSection
        chapterNumber="Chapter 02"
        title={
          <span className="italic text-brand font-serif">
            Elevating Business through Superior Connections.
          </span>
        }
        subtitle="Where the elite of Surat's industry meet to collaborate and grow."
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
