import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import express from './express-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), express('../server')],
  server: {
    open: false,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
  root: "src/client",
  resolve: {
    alias: {
      "@assets": "/src/client/assets",
      "@shared": "/src/shared",
    }
  }
})
