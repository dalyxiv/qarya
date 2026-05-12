import { defineConfig } from '@tanstack/start/config'

export default defineConfig({
  server: {
    preset: 'github-pages'
  },
  vite: {
    base: '/qarya/'
  }
})
