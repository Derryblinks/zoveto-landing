import { cn } from "@/lib/cn";
import type { Tone } from "@/content";

const tones: Record<Tone, string> = {
  ok: "bg-[#ddf1eb] text-[#0d5c4d]",
  warn: "bg-[#fbefd2] text-[#8a5a0b]",
  info: "bg-[#dceafa] text-[#1b5c99]",
  danger: "bg-[#fce3e0] text-[#9a1f15]",
};

/** Small coloured status label used inside product previews. */
export function StatusTag({ tone, children }: { tone: Tone; children: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        tones[tone],
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
