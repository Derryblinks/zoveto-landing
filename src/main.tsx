import "@fontsource-variable/inter";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app/app";
import { initTheme } from "@/lib/theme";
import "@/styles/index.css";

// Normally already applied by the script in index.html, so there is no flash. This covers the rest.
initTheme();

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found.");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
