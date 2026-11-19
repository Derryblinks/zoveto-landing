import type { Plan } from "./types";

/**
 * Prices are deliberately absent: plans are configured by administrators and announced at launch.
 * Pharmacy fees are not decided yet, so no card promises pharmacies a price or that they are free.
 * What the free vet plan includes is set by the business, so that card names no specific features.
 */
export const plans: Plan[] = [
  {
    name: "Farmers and animal keepers",
    note: "Free to register",
    points: [
      "Farm and animal profiles",
      "Find vets and book visits",
      "Booking updates and reminders",
    ],
    cta: { label: "Get started" },
  },
  {
    name: "Vet: Free membership",
    note: "No monthly charge",
    points: [
      "A professional profile, listed once verified",
      "Basic platform functions",
      "Full list of free features announced at launch",
    ],
    cta: { label: "Join free", role: "vet" },
  },
  {
    name: "Vet: Paid monthly plans",
    note: "Names and prices announced at launch",
    points: [
      "Extended limits and practice tools",
      "Payment options announced at launch",
      "Receipts and renewal reminders",
    ],
    cta: { label: "Join as a vet", role: "vet" },
    highlighted: true,
  },
];
