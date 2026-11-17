import { BellRing, CalendarCheck, PawPrint, Pill, Wallet } from "lucide-react";
import type { Feature } from "./types";

export const features: Feature[] = [
  {
    title: "Easy booking",
    description:
      "Choose a service, pick a free time and send your request. Vets accept, decline or suggest another time.",
    icon: CalendarCheck,
    preview: {
      kind: "rows",
      rows: [
        { label: "Request sent", tag: { text: "Pending", tone: "info" } },
        { label: "Vet replied", tag: { text: "Accepted", tone: "ok" } },
      ],
    },
  },
  {
    title: "Animal health records",
    description:
      "Vaccinations, treatments, allergies and lab results kept in one profile for each animal.",
    icon: PawPrint,
    preview: {
      kind: "rows",
      rows: [
        { label: "Vaccination", tag: { text: "Recorded", tone: "ok" } },
        { label: "Lab result", tag: { text: "Added", tone: "info" } },
      ],
    },
  },
  {
    title: "Timely reminders",
    description:
      "Vaccination, deworming and follow-up reminders reach owners and vets before deadlines pass.",
    icon: BellRing,
    preview: {
      kind: "rows",
      rows: [
        { label: "Deworming due", tag: { text: "This week", tone: "warn" } },
        { label: "Follow-up visit", tag: { text: "Scheduled", tone: "info" } },
      ],
    },
  },
  {
    title: "Pharmacy marketplace",
    description:
      "Browse veterinary products, check availability and send orders or enquiries. Restricted medicines need professional authorisation.",
    icon: Pill,
    wide: true,
    preview: { kind: "meter", label: "Stock level", percent: 72 },
  },
  {
    title: "Finance in view",
    description:
      "Consultation charges, invoices, payments, expenses and outstanding balances tracked for every client.",
    icon: Wallet,
    wide: true,
    preview: {
      kind: "rows",
      rows: [
        { label: "Invoice issued", tag: { text: "Sent", tone: "info" } },
        { label: "Payment received", tag: { text: "Paid", tone: "ok" } },
      ],
    },
  },
];
