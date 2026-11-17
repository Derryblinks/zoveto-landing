import type { Plan } from "./types";

/** Prices are deliberately absent: plans are configured by administrators and announced at launch. */
export const plans: Plan[] = [
  {
    name: "Owners and pharmacies",
    note: "Free to register",
    points: [
      "Farm and animal profiles",
      "Find vets and book visits",
      "Pharmacy catalogue and orders",
    ],
    cta: { label: "Get started" },
  },
  {
    name: "Vet: Free membership",
    note: "No monthly charge",
    points: [
      "Verified public profile",
      "Manage appointment requests",
      "Core client and animal records",
    ],
    cta: { label: "Join free", role: "vet" },
  },
  {
    name: "Vet: Paid monthly plans",
    note: "Names and prices announced at launch",
    points: [
      "Extended limits and practice tools",
      "Pay with Mobile Money and more",
      "Receipts and renewal reminders",
    ],
    cta: { label: "Join as a vet", role: "vet" },
    highlighted: true,
  },
];
