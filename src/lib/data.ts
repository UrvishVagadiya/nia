// ─── NIA Surat — Canonical Data ──────────────────────────────────────────────
// All chapter content pre-populated. Do not paraphrase or rewrite.

export type Chapter = {
  id: string;
  name: string;
  short: string;
  number: string;
  tagline: string;
  founded: string;
  members: number;
  meetingDay: string;
  meetingTime: string;
  venue: string;
  leader: {
    name: string;
    title: string;
    specialty: string;
    tenure: string;
    bio: string;
    photo: string;
  };
  nextMeeting: {
    date: string;
    topic: string;
    rsvps: number;
  };
};

export type Member = {
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

// ─── Photo helpers ───────────────────────────────────────────────────────────

const PORTRAITS = {
  m: [
    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=faces",
  ],
  f: [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&crop=faces",
  ],
};

const pic = (kind: "m" | "f", idx: number) => PORTRAITS[kind][idx % PORTRAITS[kind].length];

// ─── Images ──────────────────────────────────────────────────────────────────

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&h=1100&fit=crop";
export const MEETING_IMAGE =
  "https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=700&fit=crop";
export const VENUE_IMAGE =
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&h=600&fit=crop";

// ─── Chapters ────────────────────────────────────────────────────────────────

export const CHAPTERS: Record<string, Chapter> = {
  innovators: {
    id: "innovators",
    name: "NIA Innovators",
    short: "Innovators",
    number: "01",
    tagline: "Surat\u2019s room of trusted professionals.",
    founded: "2023",
    members: 25,
    meetingDay: "Every Wednesday",
    meetingTime: "9:30 \u2014 11:00 AM",
    venue: "Hyatt Regency, Athwa Lines",
    leader: {
      name: "Sreyansh Jain",
      title: "Group Leader \u00B7 Community Builder",
      specialty: "Diamond Trading",
      tenure: "Since 2023",
      bio: "Third-generation diamond trader and a believer that trust compounds faster than capital. Sreyansh founded the Innovators chapter to give Surat\u2019s professionals a room where referrals come from genuine relationships, not transactions.",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop&crop=faces",
    },
    nextMeeting: {
      date: "Wed, May 13",
      topic: "Family Business Succession \u2014 Open Floor",
      rsvps: 22,
    },
  },
  superiors: {
    id: "superiors",
    name: "NIA Superiors",
    short: "Superiors",
    number: "02",
    tagline:
      "Senior business owners and category leaders, building a referral economy of their own.",
    founded: "2023",
    members: 24,
    meetingDay: "Every Tuesday",
    meetingTime: "9:30 \u2014 11:00 AM",
    venue: "Marriott, Vesu",
    leader: {
      name: "Sreyansh Jain",
      title: "Group Leader \u00B7 Community Builder",
      specialty: "Diamond Trading",
      tenure: "Since 2023",
      bio: "Sreyansh leads all three Surat chapters. The Superiors chapter is where the city\u2019s seasoned operators meet weekly \u2014 the kind of room where a single warm introduction can change a quarter.",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop&crop=faces",
    },
    nextMeeting: {
      date: "Tue, May 12",
      topic: "Q2 Goal-Setting Roundtable",
      rsvps: 21,
    },
  },
  pioneers: {
    id: "pioneers",
    name: "NIA Pioneers",
    short: "Pioneers",
    number: "03",
    tagline:
      "Surat\u2019s newest chapter \u2014 established professionals planting the next decade of relationships.",
    founded: "2024",
    members: 23,
    meetingDay: "Every Thursday",
    meetingTime: "9:30 \u2014 11:00 AM",
    venue: "Le Meridien, Piplod",
    leader: {
      name: "Sreyansh Jain",
      title: "Group Leader \u00B7 Community Builder",
      specialty: "Diamond Trading",
      tenure: "Since 2024",
      bio: "Pioneers brings together specialists who are early in their NIA journey but seasoned in their craft. Sreyansh personally vets every category to keep the room high-trust and non-overlapping.",
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop&crop=faces",
    },
    nextMeeting: {
      date: "Thu, May 14",
      topic: "Member Spotlight \u2014 Textile Exports",
      rsvps: 19,
    },
  },
};

export const CHAPTER_IDS = Object.keys(CHAPTERS);

// ─── Members ─────────────────────────────────────────────────────────────────

export const MEMBERS_BY_CHAPTER: Record<string, Member[]> = {
  innovators: [
    {
      name: "Abhishek Saboo",
      convention: "Jacquards Weaver",
      company: "Saboo Textiles",
      specialty: "Textiles",
      oneliner:
        "Premium jacquard weaving for fashion houses across India. Three-generation family loom now exporting to Milan and...",
      photo: pic("m", 0),
      location: "Pandesara, Surat",
      joined: "Since 2002",
    },
    {
      name: "Hetal Mehta",
      convention: "Numbers Whisperer",
      company: "Mehta & Associates",
      specialty: "Chartered Accountancy",
      oneliner:
        "Tax & advisory for family businesses navigating succession, GST, and cross-border textile exports.",
      photo: pic("f", 0),
      location: "Athwa, Surat",
      joined: "Since 2009",
    },
    {
      name: "Rohan Choksi",
      convention: "Stone Reader",
      company: "Choksi Diamonds",
      specialty: "Diamond Trading",
      oneliner:
        "Solitaires sourced from Antwerp & Mumbai. Specialises in 1ct+ certified diamonds for bridal jewellers.",
      photo: pic("m", 1),
      location: "Varachha, Surat",
      joined: "Since 2014",
    },
    {
      name: "Priya Nanavati",
      convention: "Frame Maker",
      company: "Studio Nanavati",
      specialty: "Photography",
      oneliner:
        "Wedding & brand photography. Documentary style, six-figure portfolio of Gujarat's family-run brands.",
      photo: pic("f", 1),
      location: "Vesu, Surat",
      joined: "Since 2016",
    },
    {
      name: "Karan Desai",
      convention: "Code Carpenter",
      company: "Desai Tech Labs",
      specialty: "IT & Software",
      oneliner: "Custom ERP for textile manufacturers.",
      photo: pic("m", 2),
      location: "Piplod, Surat",
      joined: "Since 2018",
    },
    {
      name: "Anjali Shah",
      convention: "Light Architect",
      company: "Shah Designs",
      specialty: "Architecture",
      oneliner: "Residential architecture across Gujarat.",
      photo: pic("f", 2),
      location: "Adajan, Surat",
      joined: "Since 2021",
    },
    {
      name: "Vivek Patel",
      convention: "Money Mover",
      company: "Patel Wealth",
      specialty: "Wealth Management",
      oneliner: "Portfolio advisory for HNIs.",
      photo: pic("m", 3),
      location: "Pandesara, Surat",
      joined: "Since 2002",
    },
    {
      name: "Nirali Kothari",
      convention: "Gold Seeker",
      company: "Kothari Jewellers",
      specialty: "Jewellery",
      oneliner: "Bridal sets, four generations in.",
      photo: pic("f", 3),
      location: "Athwa, Surat",
      joined: "Since 2009",
    },
  ],
  superiors: [
    {
      name: "Rajiv Ambani",
      convention: "Fabric Father",
      company: "Ambani Mills",
      specialty: "Textiles",
      oneliner: "Industrial-scale weaving and finishing.",
      photo: pic("m", 6),
      location: "Varachha, Surat",
      joined: "Since 2014",
    },
    {
      name: "Meena Kapadia",
      convention: "Number Sage",
      company: "Kapadia & Co.",
      specialty: "Chartered Accountancy",
      oneliner: "Audit and advisory, 30+ years.",
      photo: pic("f", 0),
      location: "Vesu, Surat",
      joined: "Since 2016",
    },
    {
      name: "Sanjay Zaveri",
      convention: "Diamond Don",
      company: "Zaveri Brothers",
      specialty: "Diamond Trading",
      oneliner: "Wholesale, polished and rough.",
      photo: pic("m", 7),
      location: "Piplod, Surat",
      joined: "Since 2018",
    },
    {
      name: "Falguni Modi",
      convention: "Brand Builder",
      company: "Modi Group",
      specialty: "Photography",
      oneliner: "Full-service brand & growth.",
      photo: pic("f", 1),
      location: "Adajan, Surat",
      joined: "Since 2021",
    },
    {
      name: "Yash Vora",
      convention: "Steel Setter",
      company: "Vora Steels",
      specialty: "IT & Software",
      oneliner: "Structural steel for infrastructure.",
      photo: pic("m", 8),
      location: "Pandesara, Surat",
      joined: "Since 2002",
    },
    {
      name: "Aarti Bhansali",
      convention: "Bone Setter",
      company: "Bhansali Ortho",
      specialty: "Architecture",
      oneliner: "Joint replacement specialist.",
      photo: pic("f", 2),
      location: "Athwa, Surat",
      joined: "Since 2009",
    },
    {
      name: "Pranav Surana",
      convention: "Land Lord",
      company: "Surana Realty",
      specialty: "Wealth Management",
      oneliner: "Premium residential developments.",
      photo: pic("m", 9),
      location: "Varachha, Surat",
      joined: "Since 2014",
    },
    {
      name: "Komal Jariwala",
      convention: "Thread Master",
      company: "Jariwala Embroidery",
      specialty: "Jewellery",
      oneliner: "Hand & machine embroidery, exports.",
      photo: pic("f", 3),
      location: "Vesu, Surat",
      joined: "Since 2016",
    },
  ],
  pioneers: [
    {
      name: "Tarang Kanjani",
      convention: "Pixel Pusher",
      company: "Kanjani Studios",
      specialty: "Textiles",
      oneliner: "Identity systems for new ventures.",
      photo: pic("m", 0),
      location: "Piplod, Surat",
      joined: "Since 2018",
    },
    {
      name: "Niyati Desai",
      convention: "Space Solver",
      company: "Desai Arch",
      specialty: "Chartered Accountancy",
      oneliner: "Commercial office interiors.",
      photo: pic("f", 4),
      location: "Adajan, Surat",
      joined: "Since 2021",
    },
    {
      name: "Ravi Teja",
      convention: "Code Crafter",
      company: "Teja Tech",
      specialty: "Diamond Trading",
      oneliner: "Mobile app development for D2C.",
      photo: pic("m", 1),
      location: "Pandesara, Surat",
      joined: "Since 2002",
    },
    {
      name: "Mona Singh",
      convention: "Event Weaver",
      company: "Singh Events",
      specialty: "Photography",
      oneliner: "Corporate offsites and conferences.",
      photo: pic("f", 5),
      location: "Athwa, Surat",
      joined: "Since 2009",
    },
    {
      name: "Kiran Patel",
      convention: "Tax Tracker",
      company: "Patel & Patel",
      specialty: "IT & Software",
      oneliner: "GST and corporate tax compliance.",
      photo: pic("m", 2),
      location: "Varachha, Surat",
      joined: "Since 2014",
    },
    {
      name: "Dhruv Shah",
      convention: "Bean Brewer",
      company: "Shah Roasters",
      specialty: "Architecture",
      oneliner: "Specialty coffee roasting.",
      photo: pic("m", 3),
      location: "Vesu, Surat",
      joined: "Since 2016",
    },
    {
      name: "Anita Jain",
      convention: "Mind Mender",
      company: "Jain Therapy",
      specialty: "Wealth Management",
      oneliner: "Corporate wellness programs.",
      photo: pic("f", 6),
      location: "Piplod, Surat",
      joined: "Since 2018",
    },
    {
      name: "Vikram Joshi",
      convention: "Print Pro",
      company: "Joshi Printers",
      specialty: "Jewellery",
      oneliner: "High-end packaging solutions.",
      photo: pic("m", 4),
      location: "Adajan, Surat",
      joined: "Since 2021",
    },
  ],
};

// ─── Testimonials ────────────────────────────────────────────────────────────

export const TESTIMONIALS_BY_CHAPTER: Record<string, Testimonial[]> = {
  innovators: [
    {
      quote:
        "I\u2019ve closed three textile-export deals through warm intros from this room in eight months. NIA Innovators is the highest-leverage hour of my week.",
      who: "Hetal Mehta",
      role: "Mehta & Associates \u00B7 CA",
      photo: pic("f", 0),
    },
    {
      quote:
        "What surprised me wasn\u2019t the referrals \u2014 it was the bench of 24 advisors I now have on speed-dial across every category.",
      who: "Karan Desai",
      role: "Desai Tech Labs \u00B7 IT",
      photo: pic("m", 2),
    },
    {
      quote:
        "The vetting is real. Sreyansh keeps the room high-trust, and that\u2019s what makes the referrals actually convert.",
      who: "Anjali Shah",
      role: "Shah Designs \u00B7 Architecture",
      photo: pic("f", 2),
    },
  ],
  superiors: [
    {
      quote:
        "I joined Superiors at year 28 of my practice and still left every meeting with one new thing to act on. That\u2019s rare.",
      who: "Meena Kapadia",
      role: "Kapadia & Co. \u00B7 CA",
      photo: pic("f", 0),
    },
    {
      quote:
        "The relationships compound. Year one was referrals, year two has been partnerships and joint ventures.",
      who: "Rajiv Ambani",
      role: "Ambani Mills \u00B7 Textiles",
      photo: pic("m", 6),
    },
    {
      quote:
        "Every member here is a category leader. The peer-level conversations alone are worth the dues.",
      who: "Falguni Modi",
      role: "Modi Group \u00B7 Marketing",
      photo: pic("f", 1),
    },
  ],
  pioneers: [
    {
      quote:
        "Pioneers is where I built my professional network from the ground up in Surat. Six months in and my pipeline is healthier than it\u2019s been in years.",
      who: "Akshay Sojitra",
      role: "Sojitra Solar \u00B7 Energy",
      photo: pic("m", 1),
    },
    {
      quote:
        "Every member here is the only one in their category. That single rule makes the whole thing work.",
      who: "Pooja Vasa",
      role: "Vasa Content \u00B7 Marketing",
      photo: pic("f", 0),
    },
    {
      quote:
        "The room punches above its weight. Specialists who actually deliver, not name-droppers.",
      who: "Mihir Surti",
      role: "Surti Tax Co. \u00B7 Tax",
      photo: pic("m", 2),
    },
  ],
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const FAQ: FAQItem[] = [
  {
    q: "How does NIA differ from other networking groups in Surat?",
    a: "NIA is built around weekly meetings, exclusive category seats, and a guaranteed-ROI structure \u2014 meaning if you don\u2019t see returns in your first six months, the chapter works directly with you to fix it. Each chapter is capped at one professional per specialty, so there\u2019s no internal competition.",
  },
  {
    q: "What\u2019s the time commitment?",
    a: "One 90-minute meeting a week, plus optional 1-on-1s with fellow members. Most members spend 3\u20134 hours a week on chapter activity in total.",
  },
  {
    q: "How is membership decided?",
    a: "Each application is reviewed by the Group Leader. We prioritise candidates whose category is open in the chapter and who can commit to weekly attendance. A trial visit is encouraged before applying.",
  },
  {
    q: "Can I attend a meeting before applying?",
    a: "Yes. Reach out via the contact form below and we\u2019ll arrange a visitor pass for the next session.",
  },
  {
    q: "What is the membership fee?",
    a: "Annual membership covers chapter dues and venue costs. Specifics are shared after a trial visit so we can walk you through what\u2019s included.",
  },
];

// ─── Value Props (Why join) ──────────────────────────────────────────────────

export const VALUE_PROPS: ValueProp[] = [
  {
    title: "Experienced Professionals",
    body: "Senior business owners, family-business leaders and category specialists — vetted, not just admitted.",
    tint: "tint-lavender",
    icon: "Users",
  },
  {
    title: "Satisfaction Guarantee",
    body: "If your first six months don't return real business, the chapter works directly with you to course-correct.",
    tint: "tint-blush",
    icon: "ShieldCheck",
  },
  {
    title: "Affordable Rates",
    body: "Annual dues that pay for themselves in a single referral. Transparent, predictable, no upsells.",
    tint: "tint-mint",
    icon: "IndianRupee",
  },
  {
    title: "Reliable & Trustworthy",
    body: "One seat per category. No internal competition, ever. Sreyansh personally protects the room.",
    tint: "tint-butter",
    icon: "Award",
  },
];

// ─── Blog posts (placeholder) ────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
  {
    category: "Playbook",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
    date: "Apr 28, 2026",
    title: "The 60-second pitch \u2014 what works in our room.",
    preview: "The four-line structure for the weekly pitch that consistently produces referrals.",
    link: "#",
  },
  {
    category: "Chapter Notes",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
    date: "Apr 14, 2026",
    title: "Q1 2026 \u2014 \u20B93.8 Cr exchanged, 312 referrals, 4 new seats.",
    preview: "Quarterly transparency note from across all three Surat chapters.",
    link: "#",
  },
  {
    category: "Leader",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80",
    date: "Mar 30, 2026",
    title: "Why Sreyansh started NIA Surat \u2014 and what he's learned.",
    preview: "A long conversation with our Community Builder about trust and the room.",
    link: "#",
  },
];

// ─── Schedule (next 4 meetings per chapter — static v1, editable JSON) ───────

export const SCHEDULE_BY_CHAPTER: Record<
  string,
  { day: string; date: string; topic: string; rsvps: number }[]
> = {
  innovators: [
    { day: "Wed", date: "May 13", topic: "Family Business Succession", rsvps: 22 },
    { day: "Wed", date: "May 20", topic: "Open Referral Floor", rsvps: 18 },
    { day: "Wed", date: "May 27", topic: "Guest Speaker: Export Finance", rsvps: 20 },
    { day: "Wed", date: "Jun 3", topic: "Quarterly Review & Planning", rsvps: 24 },
  ],
  superiors: [
    { day: "Tue", date: "May 12", topic: "Q2 Goal-Setting Roundtable", rsvps: 21 },
    { day: "Tue", date: "May 19", topic: "Open Referral Floor", rsvps: 19 },
    { day: "Tue", date: "May 26", topic: "Guest Speaker: Wealth Tax", rsvps: 20 },
    { day: "Tue", date: "Jun 2", topic: "Quarterly Review & Planning", rsvps: 23 },
  ],
  pioneers: [
    { day: "Thu", date: "May 14", topic: "Member Spotlight: Textile Exports", rsvps: 19 },
    { day: "Thu", date: "May 21", topic: "Open Referral Floor", rsvps: 16 },
    { day: "Thu", date: "May 28", topic: "Guest Speaker: Digital Branding", rsvps: 18 },
    { day: "Thu", date: "Jun 4", topic: "Quarterly Review & Planning", rsvps: 21 },
  ],
};

// ─── Footer Data ─────────────────────────────────────────────────────────────

export const FOOTER_DATA: FooterColumn[] = [
  {
    title: "Chapters",
    links: [
      { label: "Innovators", href: "#" },
      { label: "Superiors", href: "#" },
      { label: "Pioneers", href: "#" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "Schedule a visit", href: "#about" },
      { label: "Find a meeting", href: "#schedule" },
      { label: "Membership", href: "#apply" },
      { label: "FAQ", href: "#apply" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@niasurat.com", href: "mailto:hello@niasurat.com" },
      { label: "+91 98 25 0X XXXX", href: "tel:+919825000000" },
      { label: "Athwa lines, Surat", href: "#" },
    ],
  },
];
