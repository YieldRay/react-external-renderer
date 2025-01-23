import { fn } from "@storybook/test";
import { Button, Dialog, DialogHeading, DialogDismiss } from "@ariakit/react";
import { createExternalRenderer } from "@/index";

const { render, Renderer } = createExternalRenderer();

export const ActionsData = {
    onClick: fn(),
};

export default {
    title: "Ariakit",
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        ...ActionsData,
    },
};

export const Default = {
    /**
     * https://ariakit.org/components/dialog
     */
    render: function Ariakit() {
        const open = () => {
            const { rerender } = render(
                ({ open }) => {
                    return (
                        <Dialog
                            open={open}
                            onClose={() => rerender({ open: false })}
                            className="fixed inset-[0.75rem] z-50 m-auto flex h-fit max-h-[calc(100vh-1.5rem)] flex-col gap-4 overflow-auto rounded-xl bg-white p-4 text-black shadow-[0_25px_50px_-12px_rgb(0_0_0/0.25)] dark:border dark:border-[hsl(204,4%,24%)] dark:bg-[hsl(204,4%,16%)] dark:text-white sm:top-[10vh] sm:bottom-[10vh] sm:mt-0 sm:max-h-[80vh] sm:w-[420px] sm:rounded-2xl sm:p-6"
                        >
                            <DialogHeading className="m-0 text-xl leading-7 font-semibold">
                                Success
                            </DialogHeading>
                            <p className="description">
                                Your payment has been successfully processed. We have emailed your
                                receipt.
                            </p>
                            <div>
                                <DialogDismiss className="flex h-10 select-none items-center justify-center gap-1 whitespace-nowrap rounded-lg border-none bg-white px-4 text-black text-base leading-6 font-medium shadow-[inset_0_0_0_1px_rgb(0_0_0/13%),inset_0_2px_0_rgb(255_255_255/20%),inset_0_-1px_0_rgb(0_0_0/10%),0_1px_1px_rgb(0_0_0/10%)] outline-2 outline-offset-2 outline-[hsl(204,100%,40%)] hover:shadow-[inset_0_0_0_1px_rgb(0_0_0/33%)] dark:bg-[rgb(255,255,255,0.05)] dark:text-white dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/10%),inset_0_-1px_0_1px_rgb(0_0_0/25%),inset_0_1px_0_rgb(255_255_255/5%)] dark:hover:shadow-[inset_0_0_0_1px_rgb(255_255_255/25%)] disabled:opacity-50 active:pt-[0.125rem] active:shadow-[inset_0_0_0_1px_rgb(0_0_0/13%),inset_0_2px_0_rgb(0_0_0/13%)] sm:gap-2">
                                    OK
                                </DialogDismiss>
                            </div>
                        </Dialog>
                    );
                },
                { open: true }
            );
        };
        return (
            <>
                <Renderer />
                <Button
                    onClick={open}
                    className="flex h-10 select-none items-center justify-center gap-1 whitespace-nowrap rounded-lg border-none bg-white px-4 text-black text-base leading-6 font-medium shadow-[inset_0_0_0_1px_rgb(0_0_0/13%),inset_0_2px_0_rgb(255_255_255/20%),inset_0_-1px_0_rgb(0_0_0/10%),0_1px_1px_rgb(0_0_0/10%)] outline-2 outline-offset-2 outline-[hsl(204,100%,40%)] hover:shadow-[inset_0_0_0_1px_rgb(0_0_0/33%)] dark:bg-[rgb(255,255,255,0.05)] dark:text-white dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/10%),inset_0_-1px_0_1px_rgb(0_0_0/25%),inset_0_1px_0_rgb(255_255_255/5%)] dark:hover:shadow-[inset_0_0_0_1px_rgb(255_255_255/25%)] disabled:opacity-50 active:pt-[0.125rem] active:shadow-[inset_0_0_0_1px_rgb(0_0_0/13%),inset_0_2px_0_rgb(0_0_0/13%)] sm:gap-2"
                    aria-disabled="false"
                >
                    Show modal
                </Button>
            </>
        );
    },
};
