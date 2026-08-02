import { Button, Modal } from "@heroui/react";
import { fn } from "storybook/test";
import { createExternalRenderer } from "react-external-renderer";

const { render, Renderer } = createExternalRenderer();

export const ActionsData = {
    onClick: fn(),
};

export default {
    title: "HeroUI",
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        ...ActionsData,
    },
};

export const Default = {
    /**
     * https://www.heroui.com/docs/components/modal
     */
    render: function HeroUI() {
        const open = () => {
            const { rerender } = render(
                ({ isOpen }) => {
                    return (
                        <Modal isOpen={isOpen} onOpenChange={(isOpen) => rerender({ isOpen })}>
                                <Modal.Backdrop>
                                    <Modal.Container>
                                    <Modal.Dialog className="sm:max-w-[360px]">
                                        <Modal.CloseTrigger />
                                        <Modal.Header>
                                        <Modal.Heading>Welcome to HeroUI</Modal.Heading>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <p>
                                            A beautiful, fast, and modern React UI library for building accessible and
                                            customizable web applications with ease.
                                        </p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button className="w-full" slot="close">
                                            Continue
                                        </Button>
                                        </Modal.Footer>
                                    </Modal.Dialog>
                                    </Modal.Container>
                                </Modal.Backdrop>
                        </Modal>
                    );
                },
                { isOpen: true }
            );
        };

        return (
            <>
                <Renderer />
                <Button onPress={open}>Open Modal</Button>
            </>
        );
    },
};
