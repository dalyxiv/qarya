import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Add this block to force Vite to bundle node_modules
  vite: {
    ssr: {
      noExternal: true, 
    },
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
