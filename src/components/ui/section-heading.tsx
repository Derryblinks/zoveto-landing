import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id: string;
  kicker?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  /** Use on dark backgrounds. */
  onDark?: boolean;
}

/** Kicker, title and intro paragraph shared by every section. The id links the heading to its section. */
export function SectionHeading({
  id,
  kicker,
  title,
  description,
  align = "center",
  onDark,
}: SectionHeadingProps) {
  return (
    <header className={cn(align === "center" && "text-center")}>
      {kicker ? (
        <span
          className={cn(
            "mb-4 inline-block rounded-full border px-3.5 py-1 text-[13px] font-semibold",
            onDark ? "text-lime border-white/25" : "border-line bg-surface text-accent",
          )}
        >
          {kicker}
        </span>
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
