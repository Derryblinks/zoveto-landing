import { Clock } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Marks a feature that is described but not available yet. Shown next to a card heading so
 * nobody reads a planned feature as a live one. Turn it off by removing `planned` in `src/content`.
 */
export function PlannedTag({ onDark, className }: { onDark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 align-middle text-xs font-semibold whitespace-nowrap",
        onDark ? "text-on-deep-muted border-white/30" : "text-muted border-line",
        className,
      )}
    >
      <Clock className="size-3" aria-hidden="true" />
      Planned
    </span>
  );
}
