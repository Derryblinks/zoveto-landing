import type { ReactNode } from "react";
import { reveal } from "@/lib/reveal";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div {...reveal(delay ? 1 : 0, delay)} className={className}>
      {children}
    </div>
  );
}
