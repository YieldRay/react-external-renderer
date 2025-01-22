import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

import { fn } from "@storybook/test";
import { createExternalRenderer } from "./index";

const { render, Renderer } = createExternalRenderer();

export const ActionsData = {
    onClick: fn(),
};

export default {
    title: "ReachUI",
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
    render: function ReachUI() {
        const open = () => {
            const { rerender } = render(
                ({ isOpen }) => {
                    const close = () => rerender({ isOpen: false });
                    return (
                        <Dialog style={{ color: "red" }} isOpen={isOpen} onDismiss={close}>
                            <p>My text is red because the style prop got applied to the div</p>
                            <button onClick={close}>Okay</button>
                        </Dialog>
                    );
                },
                { isOpen: true }
            );
        };
        return (
            <>
                <Renderer />
                <button onClick={open}>Show Dialog</button>
            </>
        );
    },
};
