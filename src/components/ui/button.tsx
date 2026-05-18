import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        primary:
          "bg-brand text-white rounded-pill text-[15px] font-[600] hover:bg-brand-2 h-auto pl-[22px] pr-[14px] py-[8px] min-h-[48px] gap-[10px]",
        "primary-light":
          "bg-white text-brand-deep rounded-pill text-[15px] font-[600] hover:bg-paper-2 h-auto pl-[22px] pr-[14px] py-[8px] min-h-[48px] gap-[10px]",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-transparent border border-line text-ink rounded-pill text-[15px] font-[600] hover:bg-paper-2 h-auto px-[22px] py-[14px] min-h-[48px]",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        "filter-active":
          "bg-brand-deep text-white shadow-md rounded-pill px-5 py-2 font-semibold text-[13px] h-auto border-none",
        "filter-inactive":
          "bg-white text-ink-3 hover:text-ink shadow-sm hover:shadow-md rounded-pill px-5 py-2 font-semibold text-[13px] h-auto border-none",
        "toggle-active":
          "bg-brand text-white rounded-pill px-4.5 py-2 font-semibold capitalize text-[13px] h-auto border-none",
        "toggle-inactive":
          "bg-transparent text-ink-2 hover:text-ink rounded-pill px-4.5 py-2 font-semibold capitalize text-[13px] h-auto border-none",
        "schedule-active":
          "bg-white border border-brand shadow-sm ring-1 ring-brand/20 rounded-md py-3 px-3.5 text-left flex flex-col items-start h-auto w-full",
        "schedule-inactive":
          "bg-white border border-line hover:border-brand/40 rounded-md py-3 px-3.5 text-left flex flex-col items-start h-auto w-full",
        "arrow-primary":
          "w-9 h-9 rounded-full bg-brand text-white hover:bg-brand-2 shadow-[0_6px_16px_-4px_rgba(46,157,219,0.4)] p-0 min-h-0 border-none",
        "arrow-dark":
          "w-10 h-10 rounded-full bg-brand-deep text-white hover:bg-brand-deep/90 shadow-md p-0 min-h-0 border-none",
        "arrow-light":
          "w-10 h-10 rounded-full bg-white border border-line text-brand-deep hover:bg-paper p-0 min-h-0",
        "dot-active": "w-6 h-2 bg-brand rounded-[4px] p-0 min-h-0 min-w-0 border-none",
        "dot-inactive":
          "w-2 h-2 bg-line-2 hover:bg-ink-4 rounded-[4px] p-0 min-h-0 min-w-0 border-none",
        avatar: "rounded-full overflow-hidden p-0 border-none min-h-0 min-w-0",
        none: "",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size,
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  const finalSize =
    size === undefined
      ? (variant && ["primary", "primary-light", "secondary", "none"].includes(variant)) ||
        (variant &&
          typeof variant === "string" &&
          (variant.startsWith("arrow") ||
            variant.startsWith("dot") ||
            variant.startsWith("filter") ||
            variant.startsWith("toggle") ||
            variant.startsWith("schedule") ||
            variant === "avatar"))
        ? null
        : "default"
      : size;

  return (
    <ButtonPrimitive
      data-slot="button"
      suppressHydrationWarning
      className={cn(buttonVariants({ variant, size: finalSize, className }))}
      {...props}
    >
      {variant === "primary" ? (
        <>
          <span>{children}</span>
          <ArrowRight size={16} className="ml-0.5 " />
        </>
      ) : variant === "primary-light" ? (
        <>
          <span>{children}</span>
          <ArrowRight size={16} className="ml-0.5 text-brand-deep" />
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
