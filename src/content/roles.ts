import { PawPrint, Stethoscope, Store, Tractor, type LucideIcon } from "lucide-react";
import type { Role } from "@/config/site";

/** One recognisable icon per community, used wherever a role is shown. */
export const roleIcons: Record<Role, LucideIcon> = {
  farmer: Tractor,
  keeper: PawPrint,
  vet: Stethoscope,
  pharmacy: Store,
};
