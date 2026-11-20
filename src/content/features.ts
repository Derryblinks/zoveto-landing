import { BellRing, CalendarCheck, PawPrint, Pill, Wallet } from "lucide-react";
import type { Feature } from "./types";

export const features: Feature[] = [
  {
    title: "Book a visit",
    description: "Send a visit request and keep appointment details and replies together.",
    icon: CalendarCheck,
  },
  {
    title: "Animal health records",
    description:
      "Keep vaccinations, treatments, allergies and test results with each animal’s record.",
    icon: PawPrint,
  },
  {
    title: "Care reminders",
    description: "Set reminders for vaccinations, deworming and follow-up visits.",
    icon: BellRing,
  },
  {
    title: "Veterinary products",
    description:
      "Help pharmacies share product information and respond to enquiries. Restricted medicines require the appropriate authorisation.",
    icon: Pill,
  },
  {
    title: "Practice finances",
    description: "Keep consultation fees, invoices, payments and outstanding balances organised.",
    icon: Wallet,
  },
];
