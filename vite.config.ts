import { defineConfig } from "vite";
import { TanStackStartVite } from "@tanstack/start/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    TanStackStartVite({
      server: {
        // Tells the Nitro backend to format for GitHub Pages
        preset: "github-pages", 
        prerender: {
          // Forces the builder to actually generate your index.html
          routes: ["/"],
          crawlLinks: true,
        },
      },
    }),
    tsconfigPaths(),
  ],
  // Ensures assets load correctly on your github.io/qarya/ subpath
  base: "/qarya/", 
});
