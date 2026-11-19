import { cn } from "@/lib/cn";

const variants = {
  cream: "bg-cream text-deep hover:brightness-95",
  "outline-light": "border-white/35 text-white hover:bg-white/10",
  primary: "bg-accent text-white hover:brightness-110",
  outline: "border-line text-ink hover:bg-surface",
  dark: "bg-deep text-white hover:bg-deep-2",
} as const;

const sizes = { md: "px-6 py-3 text-[15px]", sm: "px-5 py-2.5 text-sm" } as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

/** Shared look for buttons and link-buttons, so both stay visually identical. */
export const buttonClasses = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-full border border-transparent font-semibold whitespace-nowrap transition focus-visible:outline-offset-2",
    variants[variant],
    sizes[size],
    className,
  );
