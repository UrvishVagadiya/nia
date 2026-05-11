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

export default function PioneersPage() {
  return (
    <main>
      <HeroSection
        chapterNumber="Chapter 03"
        title={
          <span className="italic text-brand font-serif">
            Pioneering the Future of Surat’s Business.
          </span>
        }
        subtitle="A mission-driven group of entrepreneurs leading with innovation."
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
