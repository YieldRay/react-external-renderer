import { fn } from "@storybook/test";
import { Button, Dialog, Heading, Modal } from "react-aria-components";
import { createExternalRenderer } from "./index";

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
                            style={{
                                width: "100vw",
                                height: "100vh",
                                zIndex: "100",
                                background: "#00000080",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "fixed",
                                top: "0",
                                left: "0",
                            }}
                        >
                            <Dialog>
                                <Heading slot="title">Notice</Heading>
                                <p>Click outside to close this dialog.</p>
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
                <Button onPress={open}>Open dialog</Button>
            </>
        );
    },
};
