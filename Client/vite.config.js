import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/master/', // 👈 match the repo name!
  plugins: [react()],
})
