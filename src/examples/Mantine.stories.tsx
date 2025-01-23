import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Dialog, Group, Button, TextInput, Text } from "@mantine/core";

import { fn } from "@storybook/test";
import { createExternalRenderer } from "@/index";

const { render, Renderer } = createExternalRenderer();

export const ActionsData = {
    onClick: fn(),
};

export default {
    title: "Mantine",
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        ...ActionsData,
    },
};

export const Default = {
    /**
     * https://mantine.dev/core/dialog/
     */
    render: function Mantine() {
        const open = () => {
            const { rerender } = render(
                ({ opened }) => {
                    const close = () => rerender({ opened: false });
                    return (
                        <Dialog
                            opened={opened}
                            withCloseButton
                            onClose={close}
                            size="lg"
                            radius="md"
                        >
                            <Text size="sm" mb="xs" fw={500}>
                                Subscribe to email newsletter
                            </Text>

                            <Group align="flex-end">
                                <TextInput
                                    placeholder="hello@gluesticker.com"
                                    style={{ flex: 1 }}
                                />
                                <Button onClick={close}>Subscribe</Button>
                            </Group>
                        </Dialog>
                    );
                },
                { opened: true }
            );
        };

        return (
            <MantineProvider>
                <Renderer />
                <Group justify="center">
                    <Button onClick={open}>Toggle dialog</Button>
                </Group>
            </MantineProvider>
        );
    },
};
