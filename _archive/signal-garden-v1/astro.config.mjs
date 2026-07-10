import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://asazhou923.github.io",
  output: "static",
  integrations: [react()],
  vite: {
    build: {
      target: "es2022",
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/three")) {
              return "three";
            }
            if (id.includes("node_modules/gsap") || id.includes("node_modules/lenis")) {
              return "motion";
            }
            if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
              return "react";
            }
          }
        }
      }
    }
  }
});
