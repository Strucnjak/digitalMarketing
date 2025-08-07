import { defineConfig, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }: ConfigEnv) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],
    server: {
      ...(isDev && {
        proxy: {
          "/api": "http://localhost:3000",
        },
      }),
    },
  };
});
