import type { LucideIcon } from "lucide-react";
import type { Role } from "@/config/site";

export type Tone = "ok" | "warn" | "info" | "danger";

/** One line inside a product preview, e.g. "Cattle vaccination" with a "Confirmed" tag. */
export interface PreviewRow {
  label: string;
  tag: { text: string; tone: Tone };
}

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export interface Audience {
  role: Role;
  title: string;
  description: string;
  cta: string;
  preview: { title: string; rows: PreviewRow[] };
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Spans two columns on wide screens. */
  wide?: boolean;
  preview: { kind: "rows"; rows: PreviewRow[] } | { kind: "meter"; label: string; percent: number };
}

export interface ToolColumn {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
}

export interface Fact {
  value: string;
  label: string;
}

export interface Plan {
  name: string;
  note: string;
  points: string[];
  cta: { label: string; role?: Role };
  highlighted?: boolean;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface TrustPoint {
  label: string;
  icon: LucideIcon;
}
