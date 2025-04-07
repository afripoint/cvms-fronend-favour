import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true }), // Analyze your bundle
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // React core in one chunk
          "vendor-react": ["react", "react-dom"],

          // Routing in separate chunk
          "vendor-router": ["react-router-dom"],

          // Redux in separate chunk
          "vendor-redux": ["@reduxjs/toolkit", "react-redux"],

          // Icons - combine all icon libraries
          "vendor-icons": ["@heroicons/react", "lucide-react", "react-icons"],

          // HTTP client
          "vendor-http": ["axios"],

          // File processing libraries - these are often large
          "vendor-file-processing": ["xlsx", "papaparse"],

          // UI utilities
          "vendor-ui-utils": [
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
            "tailwindcss-animate",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  // Improve development experience
  server: {
    open: true,
    hmr: true,
    proxy: {
      "/api": "http://89.117.37.128",
    },
    cors: {
      origin: "http://89.117.37.128",
    },
  },
  // Add these for better performance
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@reduxjs/toolkit",
      "react-redux",
    ],
  },
});
