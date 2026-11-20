import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <rect width="32" height="32" rx="8" fill="#8FD9C3" />
      <path
        d="M10.2 13.1c-1.6 0-2.7-1.5-2.7-3.1S8.4 7 9.8 7s2.7 1.5 2.7 3.1-1 3-2.3 3Zm5.3-2.6c-1.6 0-2.6-1.5-2.6-3.1s1-3.1 2.6-3.1 2.6 1.5 2.6 3.1-1 3.1-2.6 3.1Zm6.3 2.6c-1.4 0-2.4-1.4-2.4-3s1-3.1 2.5-3.1 2.5 1.5 2.5 3.1-1.1 3-2.6 3.1Zm-5.3 2.1c-3.5 0-7.3 5.3-7.3 8.3 0 2.1 1.4 3.1 3.3 2.2l2.4-1.1c1-.4 2.1-.4 3.1 0l2.4 1.1c1.9.9 3.3-.1 3.3-2.2 0-3-3.8-8.3-7.2-8.3Z"
        fill="#123B35"
      />
    </svg>
  );
}

export function Logo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-xl font-bold tracking-wide",
          inverse ? "text-white" : "text-ink",
        )}
      >
        ZOVETO
      </span>
    </span>
  );
}
