export type Member = {
  id: string;
  name: string;
  convention: string;
  company: string;
  specialty: string;
  oneliner: string;
  photo: string;
  location?: string;
  joined?: string;
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
  images: string[];
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
  title: React.ReactNode;
  subtitle: string;
  mainImage?: string;
  leaderImage?: string;
}
