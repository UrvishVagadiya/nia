export type Member = {
  id: string;
  name: string;
  convention: string;
  company: string;
  specialty: string;
  oneliner: string;
  photo?: string; // URL or static import
  photo_url?: string;
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
  photo: string;
};

export type FAQItem = {
  q: string;
  a: string;
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
  image: string;
  link?: string;
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
  topic: string;
  rsvps: number;
}

export interface HeroProps {
  chapterNumber: string;
  chapterName: string;
  subtitle: string;
  caption?: string;
  bullets?: string[];
  mainImage?: string;
  leaderImage?: string;
}

export interface Chapter {
  id: string | number;
  name: string;
  slug: string;
  chapterNumber: string;
  hero: {
    title: string;
    subtitle: string;
    caption?: string;
    bullets?: { text: string }[];
    mainImage?: string;
    leaderImage?: string;
  };
  stats: { label: string; value: string }[];
  leader?: Leader;
  members: Member[];
  pricing: PricingPlan[];
  events: ScheduleItem[];
  testimonials: Testimonial[];
  gallery: string[];
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  quote: string;
  photo_url?: string;
  specialty?: string;
  tenure?: string;
  chapter_id: string | number;
}

export interface LeaderProps {
  leader?: Leader | null;
  chapter?: Chapter | null;
}
