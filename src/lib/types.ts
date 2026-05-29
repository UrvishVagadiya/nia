import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";

export interface Media {
  id: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export type Member = {
  id: string;
  name: string;
  convention: string;
  company: string;
  specialty: string;
  oneliner: string;
  photo?: string | Media;
  location?: string;
  joined?: string;
};

export type PricingPlan = {
  id?: string;
  name: string;
  monthlyPrice?: number | string;
  annualPrice?: number | string;
  isPopular?: boolean;
  features: string[] | { text: string }[];
  chapter?: string | number;
};

export type Testimonial = {
  quote: string;
  who: string;
  role: string;
  photo: string | Media;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ValueProp = {
  title: string;
  body: string;
  tint: string;
  icon: string;
};

export type BlogPost = {
  title: string;
  preview: string;
  date: string;
  category: string;
  images: string[];
};

export type Update = {
  id: string;
  title: string;
  slug: string;
  preview: string;
  category: string;
  images: string[];
  publishedDate: string;
};

export type CityPartnerMessage = {
  city: string;
  title: string;
  subtitle?: string;
  messageParagraphs: { text: string }[];
  partners: {
    name: string;
    role: string;
    image: string;
    location: string;
  }[];
  closingText: string;
  signatureLine: string;
};

export type FooterColumn = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export interface SlotConfig {
  size: number;
  opacity: number;
  translateY: number;
  borderWidth: number;
  isCenter: boolean;
}

export interface ScheduleItem {
  day: string;
  date: string;
  startTime?: string;
  endTime?: string;
  topic: string;
  venue?: string;
  rsvps: number;
}

export interface HeroProps {
  chapterNumber: string;
  chapterName: string;
  subtitle: string;
  caption?: string;
  bullets?: string[];
  mainImage?: string | Media;
  leaderImage?: string | Media;
  nextEvent?: ScheduleItem;
}

export interface NavbarProps {
  chapters: { name: string; slug: string }[];
  currentChapterSlug?: string;
  host: string;
}

export interface Chapter {
  id: string | number;
  name: string;
  slug: string;
  chapterNumber: string;
  venue?: string;
  mail?: string;
  hero: {
    title: string;
    subtitle: string;
    caption?: string;
    bullets?: { text: string }[];
    mainImage?: string | Media;
    leaderImage?: string | Media;
  };
  stats: { label: string; value: string }[];
  leader?: Leader;
  members: Member[];
  pricing: PricingPlan[];
  events: ScheduleItem[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  updates: Update[];
  cityPartner?: CityPartnerMessage;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  quote: string;
  photo?: string | Media;
  specialty?: string;
  tenure?: string;
  chapter_id: string | number;
}

export interface LeaderProps {
  leader?: Leader | null;
  chapter?: Chapter | null;
}

export interface ChapterSummary {
  id: string | number;
  name: string;
  slug: string;
  venue?: string;
}

export interface PayloadListResponse<T> {
  docs: T[];
}

// Carousel Types
export type CarouselApi = UseEmblaCarouselType[1];
export type UseCarouselParameters = Parameters<typeof useEmblaCarousel>[0];

export interface CarouselProps {
  opts?: UseCarouselParameters;
  plugins?: Parameters<typeof useEmblaCarousel>[1];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  className?: string;
  children?: React.ReactNode;
}

export type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

// Section Component Props
export interface PricingSectionProps {
  plans: PricingPlan[];
}

export interface MembersSectionProps {
  members?: Member[];
}

export interface ScheduleSectionProps {
  chapterSlug?: string;
  events?: ScheduleItem[];
  chapterVenue?: string;
}

export interface StepsSectionProps {
  chapterId?: string | number;
  chapterSlug?: string;
  chapterName?: string;
  venue?: string;
}

export interface VisitorFormValues {
  name: string;
  email: string;
  specialty: string;
  phone: string;
  notes: string;
  chapterId: string | number;
  chapterName: string;
  chapterSlug: string;
  venue: string;
  meetingDay: string;
  meetingDate: string;
  meetingTopic: string;
}

export interface StatBandProps {
  stats?: { label: string; value: string }[];
}

export interface UpdatesSectionProps {
  updates: Update[];
}

export interface CityPartnerSectionProps {
  data?: CityPartnerMessage;
}
