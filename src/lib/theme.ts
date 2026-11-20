export type Theme = "light" | "dark";

/** Where the visitor's explicit choice is remembered. Keep in sync with the script in index.html. */
export const THEME_KEY = "zoveto-theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";
const listeners = new Set<() => void>();

const systemTheme = (): Theme =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(DARK_QUERY).matches
    ? "dark"
    : "light";

/** The visitor's saved choice, or null if they have never picked one (or storage is blocked). */
const storedTheme = (): Theme | null => {
  try {
    const value = window.localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
};

const apply = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

/** The theme currently showing. */
export const getTheme = (): Theme => {
  const current = document.documentElement.dataset.theme;
  if (current === "light" || current === "dark") return current;
  return storedTheme() ?? systemTheme();
};

/** Applies the saved or system theme. Called once at start-up, before the first render. */
export const initTheme = () => apply(getTheme());

/** Switches theme and remembers the choice. */
export const setTheme = (theme: Theme) => {
  apply(theme);
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage can be blocked (private windows). The theme still changes for this visit.
  }
  listeners.forEach((listener) => listener());
};

/** For `useSyncExternalStore`. Also follows the system setting until the visitor makes a choice. */
export const subscribeToTheme = (listener: () => void) => {
  listeners.add(listener);

  const query = typeof window.matchMedia === "function" ? window.matchMedia(DARK_QUERY) : null;
  const onSystemChange = () => {
    if (storedTheme()) return;
    apply(systemTheme());
    listener();
  };
  query?.addEventListener?.("change", onSystemChange);

  return () => {
    listeners.delete(listener);
    query?.removeEventListener?.("change", onSystemChange);
  };
};
