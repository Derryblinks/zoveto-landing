import { useSyncExternalStore } from "react";
import { getTheme, subscribeToTheme, type Theme } from "@/lib/theme";

/** The theme currently showing ("light" or "dark"). Re-renders when it changes. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribeToTheme, getTheme, () => "light");
}
