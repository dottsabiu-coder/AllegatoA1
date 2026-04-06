import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, "");
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@allegato-a1/shared": path.resolve(rootDir, "../../packages/shared/src/index.ts"),
      },
    },
    server: {
      port: 5173,
      proxy: {
        "/api/pdf": {
          target: env.VITE_PDF_PROXY_TARGET || "http://127.0.0.1:8787",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/pdf/, ""),
        },
      },
    },
  };
});
