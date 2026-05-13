import type { Testimonial, SlotConfig } from "@/lib/types";
import { pic } from "./Portraits.image";

export const TESTIMONIALS: Testimonial[] = [
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
  {
    quote:
      "Being part of NIA has given me a new perspective on how to grow my business through structured networking and accountability.",
    who: "Rohan Choksi",
    role: "Choksi & Co \u00B7 Retail",
    photo: pic("m", 0),
  },
  {
    quote:
      "The quality of conversations here is on a different level. It's not just about work; it's about building a legacy together.",
    who: "Priya Nanavati",
    role: "Nanavati Legal \u00B7 Law",
    photo: pic("f", 1),
  },
  {
    quote:
      "I found my most reliable supply chain partners within this group. The trust factor is already established.",
    who: "Vivek Patel",
    role: "Patel Logistics \u00B7 Supply Chain",
    photo: pic("m", 1),
  },
  {
    quote:
      "NIA Innovators is where I go for real advice. These aren't just colleagues; they are my unofficial board of directors.",
    who: "Nirali Kothari",
    role: "Kothari Interiors \u00B7 Design",
    photo: pic("f", 3),
  },
];

export const SLOT_CONFIGS: SlotConfig[] = [
  { size: 44, opacity: 0.55, translateY: 15, borderWidth: 3, isCenter: false },
  { size: 52, opacity: 0.65, translateY: 10, borderWidth: 3, isCenter: false },
  { size: 60, opacity: 0.75, translateY: 5, borderWidth: 3, isCenter: false },
  { size: 84, opacity: 1, translateY: 0, borderWidth: 4, isCenter: true },
  { size: 60, opacity: 0.75, translateY: 5, borderWidth: 3, isCenter: false },
  { size: 52, opacity: 0.65, translateY: 10, borderWidth: 3, isCenter: false },
  { size: 44, opacity: 0.55, translateY: 15, borderWidth: 3, isCenter: false },
];
