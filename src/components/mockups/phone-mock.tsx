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
        "text-app-body w-[200px] rounded-t-[30px] border-[7px] border-b-0 border-[#10261c] bg-white p-3 pt-4 text-left shadow-[-10px_14px_30px_rgba(0,0,0,0.28)]",
        className,
      )}
      aria-hidden="true"
    >
      <h4 className="text-app-ink mb-2.5 text-base">Find a vet</h4>
      {ACTIONS.map((action) => (
        <div
          key={action.label}
          className={cn(
            "text-app-ink mb-2 flex items-center gap-2.5 rounded-xl p-3 text-[13px] font-semibold",
            "primary" in action && action.primary ? "bg-[#eaf8d2]" : "bg-[#f2f6f3]",
          )}
        >
          <action.icon className="size-[18px]" />
          {action.label}
        </div>
      ))}
    </div>
  );
}
