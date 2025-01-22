import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@chromatic-com/storybook",
    ],
    core: {
        builder: "@storybook/builder-vite",
    },
    async viteFinal(config) {
        const { mergeConfig } = await import("vite");
        return mergeConfig(config, {
            optimizeDeps: {
                include: ["storybook-dark-mode"],
            },
        });
    },
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
};
export default config;
