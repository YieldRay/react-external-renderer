import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react()],
    define: {
        "process.env.NODE_ENV": JSON.stringify(mode),
    },
}));
