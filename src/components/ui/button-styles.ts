import { cn } from "@/lib/cn";

/*
 * Each variant sets its own border colour. The shared base must not set one: classes are joined
 * without merging, so a base `border-transparent` would sit in the stylesheet after (and beat)
 * a variant's `border-ink/20`, and outline buttons would lose their border.
 */
const variants = {
  mint: "border-transparent bg-mint text-deep hover:bg-[#a6e4d2]",
  "outline-light": "border-white/30 text-white hover:bg-white/10",
  primary: "border-transparent bg-accent text-white hover:brightness-110 dark:text-deep",
  outline: "border-ink/25 text-ink hover:bg-surface",
  dark: "border-transparent bg-deep text-white hover:bg-deep-2",
} as const;

const sizes = {
  md: "px-6 py-3 text-[15px]",
  sm: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

/** Shared look for buttons and link-buttons, so both stay visually identical. */
export const buttonClasses = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) =>
  cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-full border font-semibold whitespace-nowrap transition duration-200 focus-visible:outline-offset-2 active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className,
  );
