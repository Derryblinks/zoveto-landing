import { AlertTriangle, Pill, WifiOff } from "lucide-react";
import type { Fact, ToolColumn } from "./types";

export const facts: Fact[] = [
  { value: "Ghana first", label: "Shaped around local animal-care needs" },
  { value: "Farm and home", label: "For livestock and companion animals" },
  { value: "People-led care", label: "Veterinary decisions stay with professionals" },
];

export const toolColumns: ToolColumn[] = [
  {
    title: "Offline clinical records",
    description:
      "Offline record-keeping is planned so veterinary professionals can work through poor connections and sync when they’re back online.",
    icon: WifiOff,
    planned: true,
    points: ["Client and animal records", "Consultation notes", "Sync when a connection returns"],
  },
  {
    title: "Disease records",
    description:
      "Record observations about priority animal diseases and prepare details for the relevant authorities.",
    icon: AlertTriangle,
    points: [
      "Cases, location and samples",
      "Deaths and other outcomes",
      "Follow official reporting requirements",
    ],
  },
  {
    title: "Medicine stock",
    description:
      "Keep track of medicines, batches and expiry dates, and note stock used for treatment.",
    icon: Pill,
    points: [
      "Low-stock and expiry reminders",
      "Vaccine storage notes",
      "Purchase prices and stock used",
    ],
  },
];
