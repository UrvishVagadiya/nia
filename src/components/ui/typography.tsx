import { ReactNode, ElementType } from "react";

type TypographyVariant =
  | "display"
  | "hero"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "body-xl"
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
    /* ───────────────── HERO ───────────────── */

    display:
      "text-[48px] sm:text-[64px] lg:text-[88px] font-bold tracking-[-0.04em] leading-[0.95]",

    hero: "text-[40px] sm:text-[52px] lg:text-[72px] font-bold tracking-[-0.03em] leading-[1]",

    /* ───────────────── HEADINGS ───────────────── */

    h1: "text-[32px] sm:text-[40px] lg:text-[56px] font-bold tracking-[-0.03em] leading-[1.08]",

    h2: "text-[28px] sm:text-[34px] lg:text-[44px] font-bold tracking-[-0.025em] leading-[1.12]",

    h3: "text-[24px] sm:text-[28px] lg:text-[36px] font-semibold leading-[1.2]",

    h4: "text-[20px] sm:text-[22px] lg:text-[28px] font-semibold leading-[1.3]",

    h5: "text-[18px] sm:text-[20px] lg:text-[24px] font-medium leading-[1.35]",

    /* ───────────────── BODY ───────────────── */

    "body-xl": "text-[20px] sm:text-[22px] lg:text-[24px] font-normal leading-[1.7]",

    "body-lg": "text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[1.7]",

    "body-md": "text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[1.75]",

    "body-sm": "text-[14px] sm:text-[15px] lg:text-[16px] font-normal leading-[1.7]",

    /* ───────────────── SMALL TEXT ───────────────── */

    caption: "text-[12px] sm:text-[13px] lg:text-[14px] font-normal leading-[1.5]",

    eyebrow: "text-[11px] font-semibold uppercase tracking-[0.18em] leading-[1.4]",

    /* ───────────────── STAT ───────────────── */

    stat: "text-[48px] sm:text-[56px] lg:text-[72px] font-bold tracking-[-0.03em] leading-none",
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
    <Component
      className={`
        font-sans
        ${variantStyles[variant]}
        ${colorStyles[color]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
