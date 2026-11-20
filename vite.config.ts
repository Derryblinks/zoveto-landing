/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  server: { port: 5173, open: true },
  // Two pages: the landing page and the privacy notice at /privacy/.
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        privacy: path.resolve(__dirname, "privacy/index.html"),
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
