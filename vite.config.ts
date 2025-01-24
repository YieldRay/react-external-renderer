import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import PKG from "./package.json";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react()],
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
            external: ["framer-motion", "styled-components"],
        },
    },
}));
