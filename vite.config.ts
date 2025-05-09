import { defineConfig } from "vite";

export default defineConfig(async () => {
  const tsConfigPaths = (await import("vite-tsconfig-paths")).default;

  return {
    plugins: [tsConfigPaths()],
  };
});
