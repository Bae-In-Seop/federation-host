import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/federation-host/",
    plugins: [
      react(),
      federation({
        name: "host",
        remotes: {
          playground: {
            type: "module",
            name: "playground",
            entry: env.VITE_PLAYGROUND_URL,
          },
          flowbuilder: {
            type: "module",
            name: "flowbuilder",
            entry: env.VITE_FLOWBUILDER_URL,
          },
          vue_playground: {
            type: "module",
            name: "vue_playground",
            entry: env.VITE_VUE_PLAYGROUND_URL,
          },
          assistant_demo: {
            type: "module",
            name: "assistant_demo",
            entry: env.VITE_ASSISTANT_DEMO_URL,
          },
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: "^19.0.0",
          },
          "react-dom": {
            singleton: true,
            requiredVersion: "^19.0.0",
          },
          zustand: {
            singleton: true,
          },
        },
      }),
    ],
    build: {
      target: "esnext",
    },
    server: {
      port: 5000,
      strictPort: true,
    },
    preview: {
      port: 5000,
      strictPort: true,
    },
  };
});
