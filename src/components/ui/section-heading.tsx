import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { reveal } from "@/lib/reveal";

interface SectionHeadingProps {
  id: string;
  /** Short label that says what this section is, in plain words. */
  kicker?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  /** Use on dark backgrounds. */
  onDark?: boolean;
  className?: string;
}

/** Kicker, title and intro paragraph shared by every section. The id links the heading to its section. */
export function SectionHeading({
  id,
  kicker,
  title,
  description,
  align = "center",
  onDark,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn(align === "center" && "text-center", className)} {...reveal()}>
      {kicker ? (
        <p
          className={cn(
            "kicker mb-3 text-[13px] font-semibold tracking-wider uppercase",
            align === "center" && "kicker-center",
            onDark ? "text-mint" : "text-accent",
          )}
        >
          {kicker}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-[clamp(1.9rem,3.8vw,2.9rem)] leading-[1.1]",
          onDark && "text-white",
          align === "center" && "mx-auto max-w-[22ch]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-[58ch] text-lg",
            align === "center" && "mx-auto",
            onDark && "text-on-deep-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
