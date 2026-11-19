import type { Plan } from "./types";

/** Prices are deliberately absent: plans are configured by administrators and announced at launch. */
export const plans: Plan[] = [
  {
    name: "Farmers, animal owners and pharmacies",
    note: "Free to register",
    points: [
      "Farm and animal records",
      "Connect with veterinary professionals",
      "Pharmacy listings are planned",
    ],
    cta: { label: "Get started" },
  },
  {
    name: "Veterinary professionals",
    note: "Free account",
    points: ["Professional profile", "Appointment requests", "Client and animal records"],
    cta: { label: "Join free", role: "vet" },
  },
  {
    name: "Optional paid plans",
    note: "Details and prices will be shared before launch",
    points: [
      "Additional practice tools",
      "Mobile Money payments are planned",
      "Clear billing and renewal details",
    ],
    cta: { label: "Join as a vet", role: "vet" },
    highlighted: true,
  },
];
