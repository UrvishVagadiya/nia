import { ReactNode, ElementType } from "react";

type TypographyVariant =
  | "display"
  | "hero"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "caption"
  | "eyebrow"
  | "stat";

type TypographyColor =
  | "ink"
  | "ink-2"
  | "ink-3"
  | "ink-4"
  | "brand"
  | "brand-2"
  | "brand-deep"
  | "gold"
  | "white";

interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  color?: TypographyColor;
  className?: string;
  as?: ElementType;
}

export default function Typography({
  children,
  variant = "body-md",
  color = "ink",
  className = "",
  as: Component = "p",
}: TypographyProps) {
  const variantStyles: Record<TypographyVariant, string> = {
    // HERO
    display: "text-[56px] lg:text-[88px] font-bold leading-[0.95] tracking-[-0.04em]",

    hero: "text-[40px] lg:text-[72px] font-bold leading-[1] tracking-[-0.03em]",

    // HEADINGS — matched to HeroSection h1, LeaderSection h2, ScheduleSection h2, FAQSection h2
    h1: "text-[clamp(40px,5.4vw,64px)] font-bold leading-[1.05] tracking-[-0.025em]",

    h2: "text-[clamp(34px,4.4vw,52px)] font-bold leading-[1.1] tracking-[-0.025em]",

    h3: "text-[22px] lg:text-[26px] font-semibold leading-[1.2] tracking-[-0.015em]",

    h4: "text-[20px] lg:text-[28px] font-semibold leading-[1.3] tracking-[-0.01em]",

    h5: "text-[17px] lg:text-[22px] font-semibold leading-[1.35] tracking-[-0.015em]",

    // BODY — matched to body copy across HeroSection (17.5px), LeaderSection (17px), ScheduleSection (17px)
    "body-lg": "text-[17.5px] font-normal leading-[1.6]",

    "body-md": "text-[17px] font-normal leading-[1.6]",

    // matched to MembersSection oneliner (13px), stat strip values (14px), StepsSection steps (14px)
    "body-sm": "text-[14px] font-normal leading-[1.6]",

    // matched to UpdatesSection date (11.5px), MembersSection meta (11px)
    caption: "text-[11.5px] font-normal leading-[1.5]",

    // matched to ALL eyebrow pills across every section:
    // font-size: 12px, font-weight: 700, tracking: 0.06em, uppercase
    // NOTE: color intentionally NOT set here — use color prop or override via className
    // because eyebrow appears on both light (brand-soft bg) and dark (brand-deep bg) surfaces
    eyebrow: "text-[12px] font-bold leading-[1.4] tracking-[0.06em] uppercase",

    // matched to StatBand numerals
    stat: "text-[clamp(36px,4vw,48px)] font-semibold leading-none tracking-[-0.02em]",
  };

  const colorStyles: Record<TypographyColor, string> = {
    ink: "text-ink",
    "ink-2": "text-ink-2",
    "ink-3": "text-ink-3",
    "ink-4": "text-ink-4",
    brand: "text-brand",
    "brand-2": "text-brand-2",
    "brand-deep": "text-brand-deep",
    gold: "text-gold",
    white: "text-white",
  };

  return (
    <Component className={`font-sans ${variantStyles[variant]} ${colorStyles[color]} ${className}`}>
      {children}
    </Component>
  );
}
