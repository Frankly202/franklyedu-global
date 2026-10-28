import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

const securityHeaders = {
  "content-security-policy":
    "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
};

const isVercelBuild =
  Boolean(process.env["VERCEL"]) || process.env["NITRO_PRESET"]?.startsWith("vercel") === true;

export default defineConfig(({ command }) => ({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    ...(command === "build"
      ? [
          nitro({
            defaultPreset: "cloudflare-module",
            // Vercel route headers need `continue` so SSR fallback routing still runs.
            ...(isVercelBuild
              ? {
                  vercel: {
                    config: {
                      version: 3,
                      routes: [{ src: "/(.*)", headers: securityHeaders, continue: true }],
                    },
                  },
                }
              : { routeRules: { "/**": { headers: securityHeaders } } }),
          }),
        ]
      : []),
  ],
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
}));
