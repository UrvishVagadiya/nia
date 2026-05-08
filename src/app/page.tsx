"use client";

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
    <main>
      <HeroSection />
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
