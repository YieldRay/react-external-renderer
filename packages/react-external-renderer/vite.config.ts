import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import PKG from "./package.json";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react(), dts({ tsconfigPath: "./tsconfig.app.json" })],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    define: {
        "process.env.NODE_ENV": JSON.stringify(mode),
    },
    build: {
        target: "es2021",
        sourcemap: true,
        lib: {
            name: PKG.name,
            formats: ["es"],
            fileName: (_format, entryName) => `${entryName}.js`,
            entry: "./src/index.ts",
        },
        rollupOptions: {
            external: ["react", "react-dom"],
        },
    },
}));
