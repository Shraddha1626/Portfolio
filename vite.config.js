import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' lets the built site work at a domain root or inside a GitHub Pages sub-path
export default defineConfig({ plugins: [react()], base: './' })
