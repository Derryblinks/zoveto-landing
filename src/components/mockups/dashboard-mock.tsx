import { CalendarDays, LayoutGrid, Pill, PawPrint, TrendingUp, Users } from "lucide-react";
import { LogoMark } from "@/components/ui/logo";
import { StatusTag } from "@/components/ui/status-tag";
import { cn } from "@/lib/cn";
import { Donut } from "./donut";

const NAV = [
  { label: "Overview", icon: LayoutGrid, active: true },
  { label: "Appointments", icon: CalendarDays },
  { label: "Clients", icon: Users },
  { label: "Animals", icon: PawPrint },
  { label: "Medicines", icon: Pill },
  { label: "Finance", icon: TrendingUp },
] as const;

const STATS = [
  { label: "Today’s appointments", value: "8" },
  { label: "Pending requests", value: "3" },
  { label: "Follow-ups due", value: "5" },
] as const;

/** Illustration of the veterinary dashboard. Every entry is sample data and is not interactive. */
export function DashboardMock() {
  return (
    <div
      className="text-app-body mx-auto grid w-full max-w-[880px] overflow-hidden rounded-t-[18px] border-8 border-b-0 border-[#10261c] bg-white text-left text-xs leading-snug md:grid-cols-[168px_1fr]"
      aria-hidden="true"
    >
      <div className="border-app-line hidden content-start gap-1 border-r p-3 pt-4 md:grid">
        <div className="font-display text-app-ink mx-1.5 mb-3.5 flex items-center gap-2 text-base font-bold">
          <LogoMark className="size-[22px]" />
          ZOVETO
        </div>
        {NAV.map((item) => (
          <span
            key={item.label}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-medium text-[#4e6458]",
              "active" in item &&
                item.active &&
                "text-app-ink bg-[#eaf8d2] shadow-[inset_3px_0_0_#087a3b]",
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </span>
        ))}
      </div>

      <div className="bg-app-bg grid gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <b className="font-display text-app-ink text-lg">Good morning, Doctor</b>
          <span className="border-app-line text-app-muted hidden max-w-60 flex-1 rounded-full border bg-white px-3.5 py-1.5 sm:block">
            Search clients or animals
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "border-app-line rounded-xl border bg-white px-3.5 py-3",
                index === 2 && "hidden sm:block",
              )}
            >
              <small className="text-app-muted block">{stat.label}</small>
              <b className="font-display text-app-ink text-2xl">{stat.value}</b>
            </div>
          ))}
        </div>

        <div className="grid gap-2.5 md:grid-cols-[0.8fr_1.2fr]">
          <div className="border-app-line hidden rounded-xl border bg-white p-3.5 md:block">
            <h4 className="text-app-ink mb-2 text-sm">Animals by species</h4>
            <Donut />
          </div>
          <div className="border-app-line rounded-xl border bg-white p-3.5">
            <h4 className="text-app-ink mb-2 text-sm">Today</h4>
            {[
              ["Cattle vaccination", "Confirmed", "ok"],
              ["Goat deworming", "Pending", "warn"],
              ["Dog consultation", "New", "info"],
            ].map(([label, tag, tone]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-2 border-t border-[#edf3ef] py-1.5 first:border-t-0"
              >
                <span className="text-app-ink font-medium">{label}</span>
                <StatusTag tone={tone as "ok" | "warn" | "info"}>{tag as string}</StatusTag>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
