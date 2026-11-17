import { FileText, Lock, ShieldCheck, Smartphone, WifiOff } from "lucide-react";
import type { TrustPoint } from "./types";

export const hero = {
  badge: { highlight: "Made in Ghana", text: "For animal owners, vets and pharmacies" },
  title: "Veterinary care, connected across Ghana.",
  description:
    "Find a verified vet, book a farm visit, keep animal health records and source medicines. One platform for farmers, animal keepers, veterinary professionals and pharmacies.",
  note: "Free to join for every role.",
} as const;

export const trustPoints: TrustPoint[] = [
  { label: "Verified professionals", icon: ShieldCheck },
  { label: "Works offline in the field", icon: WifiOff },
  { label: "Mobile Money payments", icon: Smartphone },
  { label: "Private by role", icon: Lock },
  { label: "No AI diagnosis", icon: FileText },
];
