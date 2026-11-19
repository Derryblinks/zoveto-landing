import { FileText, Lock, ShieldCheck, Smartphone, WifiOff } from "lucide-react";
import type { TrustPoint } from "./types";

export const hero = {
  /** Says what the product is, in plain words, before the headline says what it does. */
  kicker: "Veterinary platform for Ghana",
  /** One specific outcome. */
  title: "Find a verified vet and book a visit.",
  description:
    "Find verified vets and book a farm visit or clinic consultation. Animal health records and vaccination reminders are planned. Built for farmers, animal keepers, vets and pharmacies.",
  note: "Free to start for farmers, animal keepers and vets.",
} as const;

export const trustPoints: TrustPoint[] = [
  { label: "Verified professionals", icon: ShieldCheck },
  { label: "Offline vet records (planned)", icon: WifiOff },
  { label: "Simple on a phone", icon: Smartphone },
  { label: "Private by role", icon: Lock },
  { label: "No AI diagnosis", icon: FileText },
];
