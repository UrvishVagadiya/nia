import { Testimonial, SlotConfig } from "@/lib/types";
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
