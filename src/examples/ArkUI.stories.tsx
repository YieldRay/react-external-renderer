import { fn } from "@storybook/test";
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { createExternalRenderer } from "@/index";

const { render, Renderer } = createExternalRenderer();

export const ActionsData = {
    onClick: fn(),
};

export default {
    title: "ArkUI",
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        ...ActionsData,
    },
};

export const Default = {
    /**
     * https://ark-ui.com/react/docs/components/dialog
     */
    render: function ArkUI() {
        const open = () => {
            const { rerender } = render(
                ({ open }) => {
                    return (
                        <Dialog.Root open={open} onOpenChange={() => rerender({ open: false })}>
                            <Portal>
                                {/* Backdrop */}
                                <Dialog.Backdrop className="fixed inset-0 bg-black/30" />

                                {/* Dialog Positioner */}
                                <Dialog.Positioner className="fixed inset-0 flex items-center justify-center">
                                    {/* Dialog Content */}
                                    <Dialog.Content className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                                        {/* Dialog Title */}
                                        <Dialog.Title className="text-lg font-medium text-gray-900">
                                            Dialog Title
                                        </Dialog.Title>

                                        {/* Dialog Description */}
                                        <Dialog.Description className="mt-2 text-sm text-gray-600">
                                            Dialog Description
                                        </Dialog.Description>

                                        {/* Close Button */}
                                        <div className="mt-4 flex justify-end">
                                            <Dialog.CloseTrigger className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                Close
                                            </Dialog.CloseTrigger>
                                        </div>
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Portal>
                        </Dialog.Root>
                    );
                },
                { open: true }
            );
        };
        return (
            <>
                <Renderer />
                <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={open}
                >
                    Open Dialog
                </button>
            </>
        );
    },
};
