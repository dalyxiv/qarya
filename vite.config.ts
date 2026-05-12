import { defineConfig } from '@tanstack/start/config'

export default defineConfig({
  server: {
    preset: 'github-pages',
    prerender: {
      // Tells the builder to generate a static index.html for the home page
      routes: ['/'], 
      // Automatically finds and generates static pages for any other linked routes
      crawlLinks: true 
    }
  },
  vite: {
    base: '/qarya/'
  }
})
