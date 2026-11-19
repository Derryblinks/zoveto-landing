import { AlertTriangle, Pill, WifiOff } from "lucide-react";
import type { Fact, ToolColumn } from "./types";

export const facts: Fact[] = [
  { value: "4", label: "role-based dashboards, each built for its own work" },
  { value: "6", label: "priority animal diseases planned for documentation" },
  { value: "0", label: "AI-made diagnoses or treatment decisions" },
];

export const toolColumns: ToolColumn[] = [
  {
    title: "Offline clinical records",
    description:
      "Register clients and animals, write clinical notes and view records you have already synced, with no signal. Changes upload when you reconnect.",
    icon: WifiOff,
    planned: true,
    points: [
      "Pending Sync, Syncing, Synced, Sync Failed",
      "Nothing deleted until the server confirms",
      "Retry and audit trail",
    ],
  },
  {
    title: "Disease documentation",
    description:
      "Record suspected anthrax, rabies, African Swine Fever, Newcastle Disease, PPR and Avian Influenza.",
    icon: AlertTriangle,
    planned: true,
    points: ["Counts, deaths, location and samples", "Guidance to official channels"],
  },
  {
    title: "Medicine stock",
    description:
      "Track drugs, batches and expiry dates, with stock updated as treatments are recorded.",
    icon: Pill,
    planned: true,
    points: ["Low-stock and expiry alerts", "A record of every stock movement"],
  },
];
