import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/cn";
import { setTheme } from "@/lib/theme";

/**
 * Light and dark mode switch. The icons swap through CSS keyed on `html[data-theme]`, so the
 * picture is always right, and the label (read by screen readers) comes from the hook.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={cn(
        "theme-toggle border-line text-ink hover:bg-surface relative grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-200",
        className,
      )}
    >
      <Sun className="theme-icon theme-icon-sun absolute size-[18px]" aria-hidden="true" />
      <Moon className="theme-icon theme-icon-moon absolute size-[18px]" aria-hidden="true" />
    </button>
  );
}
