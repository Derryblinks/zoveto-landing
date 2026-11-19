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
  { label: "Today’s appointments", value: "8", trend: "M2 15 L12 11 L22 13 L32 6 L42 8 L58 2" },
  { label: "Requests awaiting reply", value: "3", trend: "M2 4 L12 9 L22 6 L32 12 L42 10 L58 14" },
  { label: "Follow-ups due", value: "5", trend: "M2 12 L12 12 L22 7 L32 9 L42 4 L58 6" },
] as const;

const WEEK = [
  ["Mon", 46],
  ["Tue", 72],
  ["Wed", 58],
  ["Thu", 88],
  ["Fri", 64],
  ["Sat", 38],
  ["Sun", 24],
] as const;

const TODAY = [
  ["Cattle vaccination", "Confirmed", "ok"],
  ["Goat deworming", "Requested", "warn"],
  ["Dog consultation", "In Progress", "info"],
] as const;

/** A tiny static trend line. Decorative sample data. */
function Sparkline({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 60 18" className="h-[18px] w-14" fill="none" aria-hidden="true">
      <path
        d={path}
        stroke="#167c6a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Illustration of the veterinary dashboard. Every entry is sample data and is not interactive. */
export function DashboardMock() {
  return (
    <div
      className="text-app-body border-app-frame mx-auto grid w-full max-w-[880px] overflow-hidden rounded-t-[18px] border-8 border-b-0 bg-white text-left text-xs leading-snug md:grid-cols-[168px_1fr]"
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
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-medium text-[#4b5f5b]",
              "active" in item &&
                item.active &&
                "text-app-ink bg-[#ddf1eb] shadow-[inset_3px_0_0_#167c6a]",
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </span>
        ))}
      </div>

      <div className="bg-app-bg grid gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <span>
            <b className="font-display text-app-ink block text-lg">Good morning, Doctor</b>
            <small className="text-app-muted block font-medium">
              Sample data, not real records
            </small>
          </span>
          <span className="flex items-center gap-3">
            <span className="text-app-brand inline-flex items-center gap-1.5 rounded-full bg-[#ddf1eb] px-2.5 py-1 font-semibold">
              <span className="bg-app-brand size-2 rounded-full" />
              Synced
            </span>
            <span className="border-app-line text-app-muted hidden w-52 rounded-full border bg-white px-3.5 py-1.5 sm:block">
              Search clients or animals
            </span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "border-app-line flex items-end justify-between rounded-xl border bg-white px-3.5 py-3",
                index === 2 && "hidden sm:flex",
              )}
            >
              <div>
                <small className="text-app-muted block">{stat.label}</small>
                <b className="font-display text-app-ink text-2xl">{stat.value}</b>
              </div>
              <Sparkline path={stat.trend} />
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
            {TODAY.map(([label, tag, tone]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-2 border-t border-[#e6efec] py-1.5 first:border-t-0"
              >
                <span className="text-app-ink font-medium">{label}</span>
                <StatusTag tone={tone}>{tag}</StatusTag>
              </div>
            ))}
          </div>
        </div>

        <div className="border-app-line rounded-xl border bg-white p-3.5">
          <h4 className="text-app-ink mb-3 text-sm">Visits this week</h4>
          <div className="flex h-[72px] items-end gap-2.5">
            {WEEK.map(([day, percent]) => (
              <div
                key={day}
                className="bg-app-brand w-full rounded-md"
                style={{ height: `${percent}%` }}
              />
            ))}
          </div>
          <div className="text-app-muted mt-1.5 flex gap-2.5">
            {WEEK.map(([day]) => (
              <span key={day} className="w-full text-center">
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
