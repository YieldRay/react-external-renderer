import { ThemeProvider, BaseStyles } from "@primer/react";
import { Button } from "@primer/react";
import { Dialog } from "@primer/react/experimental";

import { fn } from "@storybook/test";
import { createExternalRenderer } from "react-external-renderer";

const { render, Renderer } = createExternalRenderer();

export const ActionsData = {
    onClick: fn(),
};

export default {
    title: "Primer",
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        ...ActionsData,
    },
};

export const Default = {
    /**
     * https://primer.style/components/dialog/react/draft
     */
    render: function Primer() {
        const open = () => {
            const { rerender } = render(
                ({ isOpen }) => {
                    const close = () => rerender({ isOpen: false });
                    return (
                        isOpen && (
                            <Dialog
                                title="My Dialog"
                                onClose={close}
                                footerButtons={[
                                    {
                                        buttonType: "danger",
                                        content: "Delete the universe",
                                        onClick: close,
                                    },
                                    {
                                        buttonType: "primary",
                                        content: "Proceed",
                                        onClick: close,
                                    },
                                ]}
                            >
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
                                tenetur enim aut corporis similique sapiente consectetur perferendis
                                amet unde, quaerat dignissimos nam sit. Iusto quibusdam tenetur
                                ipsum, alias at saepe.
                            </Dialog>
                        )
                    );
                },
                { isOpen: true }
            );
        };
        return (
            <ThemeProvider>
                <BaseStyles>
                    <Renderer />
                    <div className="min-h-[60vh]">
                        <Button onClick={open}>Show Dialog</Button>
                    </div>
                </BaseStyles>
            </ThemeProvider>
        );
    },
};
