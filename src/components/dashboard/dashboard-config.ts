import {
  Activity,
  BarChart3,
  CalendarDays,
  ClipboardList,
  CreditCard,
  Heart,
  Home,
  LayoutDashboard,
  Package,
  PawPrint,
  Pill,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { DemoRole } from "@/data/demo-workspace";

export type DashboardPageId =
  | "overview"
  | "appointments"
  | "animals"
  | "clients"
  | "tasks"
  | "inventory"
  | "finances"
  | "farm"
  | "reminders"
  | "records"
  | "products"
  | "orders"
  | "reports"
  | "verifications"
  | "users"
  | "subscriptions"
  | "profile";

export interface DashboardNavItem {
  id: DashboardPageId;
  label: string;
  icon: LucideIcon;
}

export const ROLE_LABELS: Record<DemoRole, string> = {
  vet: "Veterinary professional",
  farmer: "Livestock farmer",
  keeper: "Animal keeper",
  pharmacy: "Veterinary pharmacy",
  admin: "Platform admin",
};

const overview: DashboardNavItem = {
  id: "overview",
  label: "Overview",
  icon: LayoutDashboard,
};
const profile: DashboardNavItem = { id: "profile", label: "Profile", icon: Settings };

export const DASHBOARD_NAV: Record<DemoRole, DashboardNavItem[]> = {
  vet: [
    overview,
    { id: "appointments", label: "Appointments", icon: CalendarDays },
    { id: "clients", label: "Clients", icon: Users },
    { id: "animals", label: "Animals & records", icon: PawPrint },
    { id: "tasks", label: "Tasks & follow-ups", icon: ClipboardList },
    { id: "inventory", label: "Practice inventory", icon: Pill },
    { id: "finances", label: "Finances", icon: CreditCard },
    profile,
  ],
  farmer: [
    overview,
    { id: "farm", label: "My farm", icon: Home },
    { id: "animals", label: "Animals & herds", icon: PawPrint },
    { id: "appointments", label: "Vet visits", icon: CalendarDays },
    { id: "reminders", label: "Care reminders", icon: ClipboardList },
    { id: "products", label: "Pharmacy products", icon: ShoppingBag },
    { id: "orders", label: "My product enquiries", icon: ClipboardList },
    profile,
  ],
  keeper: [
    overview,
    { id: "animals", label: "My animals", icon: PawPrint },
    { id: "appointments", label: "Appointments", icon: CalendarDays },
    { id: "records", label: "Shared health records", icon: Heart },
    { id: "reminders", label: "Care reminders", icon: ClipboardList },
    { id: "products", label: "Pharmacy products", icon: ShoppingBag },
    { id: "orders", label: "My product enquiries", icon: ClipboardList },
    profile,
  ],
  pharmacy: [
    overview,
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "orders", label: "Orders & enquiries", icon: ShoppingBag },
    { id: "reports", label: "Stock report", icon: BarChart3 },
    profile,
  ],
  admin: [
    overview,
    { id: "verifications", label: "Verifications", icon: ShieldCheck },
    { id: "users", label: "User directory", icon: Users },
    { id: "appointments", label: "Appointments", icon: CalendarDays },
    { id: "animals", label: "Animal directory", icon: PawPrint },
    { id: "clients", label: "Client directory", icon: Users },
    { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
    { id: "reports", label: "Platform reports", icon: Activity },
    profile,
  ],
};

export function dashboardHref(role: DemoRole, page: DashboardPageId = "overview") {
  return page === "overview" ? `/dashboard/${role}` : `/dashboard/${role}/${page}`;
}

export function isDashboardPage(role: DemoRole, page: string): page is DashboardPageId {
  return DASHBOARD_NAV[role].some((item) => item.id === page);
}
