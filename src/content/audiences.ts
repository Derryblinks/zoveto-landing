import type { Audience } from "./types";
import { Building2, PawPrint, Stethoscope, Tractor } from "lucide-react";

export const audiences: Audience[] = [
  {
    role: "farmer",
    title: "For farmers",
    description: "Keep herd records, request a farm visit and stay on top of upcoming care.",
    cta: "Join as a farmer",
    icon: Tractor,
  },
  {
    role: "keeper",
    title: "For animal keepers",
    description: "Keep a record for each pet and find veterinary care when you need it.",
    cta: "Join as an animal keeper",
    icon: PawPrint,
  },
  {
    role: "vet",
    title: "For veterinary professionals",
    description:
      "Organise client records, appointment requests, medicine stock and invoices. Offline access is planned.",
    cta: "Join as a vet",
    icon: Stethoscope,
  },
  {
    role: "pharmacy",
    title: "For pharmacies",
    description:
      "Share product information and keep track of stock, batches and expiry dates. The pharmacy directory is planned.",
    cta: "Register a pharmacy",
    icon: Building2,
  },
];
