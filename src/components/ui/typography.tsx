import { ReactNode, ElementType } from "react";

type TypographyVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body-xl"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "caption";

type TypographyColor =
  | "shade-900"
  | "shade-800"
  | "shade-700"
  | "shade-600"
  | "shade-500"
  | "shade-400"
  | "shade-300"
  | "shade-200"
  | "shade-100"
  | "royal-blue"
  | "sunshine-yellow"
  | "sweet-red"
  | "sky-blue"
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
  color = "shade-900",
  className = "",
  as: Component = "p",
}: TypographyProps) {
  const variantStyles: Record<TypographyVariant, string> = {
    // Large Hero Text
    display: "text-[40px] sm:text-[52px] lg:text-[72px] font-bold leading-[1.05]",

    // Headings
    h1: "text-[32px] sm:text-[40px] lg:text-[56px] font-bold leading-[1.1]",
    h2: "text-[28px] sm:text-[34px] lg:text-[44px] font-bold leading-[1.15]",
    h3: "text-[24px] sm:text-[28px] lg:text-[36px] font-semibold leading-[1.2]",
    h4: "text-[20px] sm:text-[22px] lg:text-[30px] font-semibold leading-[1.3]",
    h5: "text-[18px] sm:text-[20px] lg:text-[24px] font-medium leading-[1.35]",
    h6: "text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-[1.4]",

    // Body
    "body-xl": "text-[20px] sm:text-[22px] lg:text-[24px] font-normal leading-[1.6]",
    "body-lg": "text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[1.6]",
    "body-md": "text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[1.7]",
    "body-sm": "text-[14px] sm:text-[15px] lg:text-[16px] font-normal leading-[1.6]",

    caption: "text-[12px] sm:text-[13px] lg:text-[14px] font-normal leading-[1.5]",
  };

  const colorStyles: Record<TypographyColor, string> = {
    "shade-900": "text-shade-900",
    "shade-800": "text-shade-800",
    "shade-700": "text-shade-700",
    "shade-600": "text-shade-600",
    "shade-500": "text-shade-500",
    "shade-400": "text-shade-400",
    "shade-300": "text-shade-300",
    "shade-200": "text-shade-200",
    "shade-100": "text-shade-100",
    "royal-blue": "text-royal-blue",
    "sunshine-yellow": "text-sunshine-yellow",
    "sweet-red": "text-sweet-red",
    "sky-blue": "text-sky-blue",
    white: "text-white",
  };

  return (
    <Component className={`${variantStyles[variant]} ${colorStyles[color]} ${className}`}>
      {children}
    </Component>
  );
}
