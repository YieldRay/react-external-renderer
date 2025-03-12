import { HeroUIProvider } from "@heroui/system";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { fn } from "@storybook/test";
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
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">
                                            Modal Title
                                        </ModalHeader>
                                        <ModalBody>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit. Nullam pulvinar risus non risus hendrerit
                                                venenatis. Pellentesque sit amet hendrerit risus,
                                                sed porttitor quam.
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit. Nullam pulvinar risus non risus hendrerit
                                                venenatis. Pellentesque sit amet hendrerit risus,
                                                sed porttitor quam.
                                            </p>
                                            <p>
                                                Magna exercitation reprehenderit magna aute tempor
                                                cupidatat consequat elit dolor adipisicing. Mollit
                                                dolor eiusmod sunt ex incididunt cillum quis. Velit
                                                duis sit officia eiusmod Lorem aliqua enim laboris
                                                do dolor eiusmod. Et mollit incididunt nisi
                                                consectetur esse laborum eiusmod pariatur proident
                                                Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                            </p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button
                                                color="danger"
                                                variant="light"
                                                onPress={onClose}
                                            >
                                                Close
                                            </Button>
                                            <Button color="primary" onPress={onClose}>
                                                Action
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    );
                },
                { isOpen: true }
            );
        };

        return (
            <HeroUIProvider>
                <Renderer />
                <Button onPress={open}>Open Modal</Button>
            </HeroUIProvider>
        );
    },
};
