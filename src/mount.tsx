import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { initTheme } from "@/lib/theme";
import "@/styles/index.css";

/** Starts a page: loads fonts and styles, applies the saved theme and renders into #root. */
export function mount(page: ReactNode) {
  // Normally already applied by the script in the page's HTML, so there is no flash. This covers the rest.
  initTheme();

  const root = document.getElementById("root");
  if (!root) throw new Error("Root element #root not found.");

  createRoot(root).render(<StrictMode>{page}</StrictMode>);
}
