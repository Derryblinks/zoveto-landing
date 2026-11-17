import { AlertTriangle, Pill, WifiOff } from "lucide-react";
import type { Fact, ToolColumn } from "./types";

export const facts: Fact[] = [
  { value: "4", label: "role-based dashboards, each built for its own work" },
  { value: "6", label: "priority animal diseases supported for documentation" },
  { value: "0", label: "AI-made diagnoses or treatment decisions" },
];

export const toolColumns: ToolColumn[] = [
  {
    title: "Offline clinical records",
    description:
      "Register clients, record consultations and view past records with no signal. Data uploads when you reconnect.",
    icon: WifiOff,
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
    points: [
      "Counts, deaths, location and samples",
      "Exportable reports",
      "Guidance to official channels",
    ],
  },
  {
    title: "Medicine and cold chain",
    description:
      "Track drugs, batches and expiry dates, with stock updated as treatments are recorded.",
    icon: Pill,
    points: [
      "Low-stock and expiry alerts",
      "Vaccine cold-chain records",
      "Purchase prices and usage",
    ],
  },
];
