import { Flex, Theme, Button, TextField, Text, Dialog } from "@radix-ui/themes";

import { fn } from "storybook/test";
import { createExternalRenderer } from "react-external-renderer";

const { render, Renderer } = createExternalRenderer();

export const ActionsData = {
    onClick: fn(),
};

export default {
    title: "RadixUI",
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        ...ActionsData,
    },
};

export const Default = {
    /**
     * https://www.radix-ui.com/primitives/docs/components/dialog
     */
    render: function RadixUI() {
        const open = () => {
            const { rerender } = render(
                ({ open }) => {
                    return (
                        <Dialog.Root open={open} onOpenChange={(open) => rerender({ open })}>
                            <Dialog.Content maxWidth="450px">
                                <Dialog.Title>Edit profile</Dialog.Title>
                                <Dialog.Description size="2" mb="4">
                                    Make changes to your profile.
                                </Dialog.Description>

                                <Flex direction="column" gap="3">
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Name
                                        </Text>
                                        <TextField.Root
                                            defaultValue="Freja Johnsen"
                                            placeholder="Enter your full name"
                                        />
                                    </label>
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Email
                                        </Text>
                                        <TextField.Root
                                            defaultValue="freja@example.com"
                                            placeholder="Enter your email"
                                        />
                                    </label>
                                </Flex>

                                <Flex gap="3" mt="4" justify="end">
                                    <Dialog.Close>
                                        <Button variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </Dialog.Close>
                                    <Dialog.Close>
                                        <Button>Save</Button>
                                    </Dialog.Close>
                                </Flex>
                            </Dialog.Content>
                        </Dialog.Root>
                    );
                },
                { open: true }
            );
        };

        return (
            <Theme>
                <Renderer />
                <Button
                    onClick={open}
                    className="inline-flex h-[35px] items-center justify-center rounded bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
                >
                    Edit profile
                </Button>
            </Theme>
        );
    },
};
