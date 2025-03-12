import { fn } from "@storybook/test";
import { Button, Dialog, Heading, Modal } from "react-aria-components";
import { createExternalRenderer } from "react-external-renderer";

const { render, Renderer } = createExternalRenderer();

export const ActionsData = {
    onClick: fn(),
};

export default {
    title: "ReactSpectrum",
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        ...ActionsData,
    },
};

export const Default = {
    /**
     * https://react-spectrum.adobe.com/react-aria/Modal.html
     */
    render: function ReactSpectrum() {
        const open = () => {
            const { rerender } = render(
                ({ isOpen }) => {
                    return (
                        <Modal
                            isDismissable
                            isOpen={isOpen}
                            onOpenChange={(isOpen) => rerender({ isOpen })}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                        >
                            <Dialog className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                                <Heading slot="title" className="text-lg font-bold mb-4">
                                    Notice
                                </Heading>
                                <p className="text-gray-700">Click outside to close this dialog.</p>
                            </Dialog>
                        </Modal>
                    );
                },
                { isOpen: true }
            );
        };
        return (
            <>
                <Renderer />
                <Button
                    onPress={open}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Open dialog
                </Button>
            </>
        );
    },
};
