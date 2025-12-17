import path from "node:path";
import { defineConfig, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }: ConfigEnv) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: "react-router-dom/server",
          replacement: path.resolve(
            __dirname,
            "src/router/react-router-dom-server.tsx"
          ),
        },
        {
          find: "react-router-dom",
          replacement: path.resolve(
            __dirname,
            "src/router/react-router-dom.tsx"
          ),
        },
        {
          find: "@tanstack/react-query",
          replacement: path.resolve(__dirname, "src/vendor/tanstack/react-query.tsx"),
        },
        {
          find: "@tanstack/react-table",
          replacement: path.resolve(__dirname, "src/vendor/tanstack/react-table.ts"),
        },
        {
          find: "date-fns",
          replacement: path.resolve(__dirname, "src/vendor/date-fns.ts"),
        },
        {
          find: "papaparse",
          replacement: path.resolve(__dirname, "src/vendor/papaparse.ts"),
        },
      ],
    },
    server: isDev
      ? {
          proxy: {
            "/api": "http://localhost:3000",
          },
        }
      : undefined,
    build: {
      outDir: "dist/client",
      manifest: true,
      ssrManifest: true,
      rollupOptions: {
        input: path.resolve(__dirname, "index.html"),
      },
    },
    ssr: {
      external: [],
    },
  };
});
