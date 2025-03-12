import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@heroui/theme/dist/components/(button|modal).js",
    ],
    // Toggle dark-mode based on .dark class or data-mode="dark"
    darkMode: ["class", '[data-mode="dark"]'],
    theme: {
        extend: {},
    },
    plugins: [heroui()],
};
