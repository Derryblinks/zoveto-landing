import { CalendarDays, PawPrint, Pill } from "lucide-react";
import { cn } from "@/lib/cn";

const ACTIONS = [
  { label: "Book a farm visit", icon: CalendarDays, primary: true },
  { label: "My animals", icon: PawPrint },
  { label: "Order medicine", icon: Pill },
] as const;

/** Illustration of the farmer's phone app: few, large touch targets. */
export function PhoneMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-app-body border-app-frame w-[200px] rounded-t-[30px] border-[7px] border-b-0 bg-white p-3 pt-3 text-left",
        className,
      )}
      aria-hidden="true"
    >
      <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-[#dfe8e5]" />
      <h4 className="text-app-ink mb-2.5 text-base">Find a vet</h4>
      {ACTIONS.map((action) => (
        <div
          key={action.label}
          className={cn(
            "text-app-ink mb-2 flex items-center gap-2.5 rounded-xl p-3 text-[13px] font-semibold",
            "primary" in action && action.primary
              ? "bg-[#ddf1eb] shadow-[0_0_0_2px_rgb(22_124_106/0.35)]"
              : "bg-[#f1f6f5]",
          )}
        >
          <action.icon className="size-[18px]" />
          {action.label}
        </div>
      ))}
    </div>
  );
}
