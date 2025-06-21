import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: ["a3fe-79-178-123-54.ngrok-free.app", "localhost"],
  },
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
