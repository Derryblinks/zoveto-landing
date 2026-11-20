import type { LucideIcon } from "lucide-react";
import type { Role } from "@/config/site";

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export interface Audience {
  role: Role;
  title: string;
  description: string;
  cta: string;
  icon: LucideIcon;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ToolColumn {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
  planned?: boolean;
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
