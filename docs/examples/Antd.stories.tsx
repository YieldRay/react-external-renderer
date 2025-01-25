import { fn } from "@storybook/test";
import { Button, Modal } from "antd";
import { useState } from "react";
import { createExternalRenderer } from "@/index";

const { render, Renderer, Debug } = createExternalRenderer();

export const ActionsData = {
    onClick: fn(),
};

export default {
    title: "Antd",
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        ...ActionsData,
    },
};

export const Default = {
    /**
     * https://ant-design.antgroup.com/components/modal-cn
     */
    render: function Antd() {
        const showModal = () => {
            const { rerender, remove } = render(
                ({ isModalOpen }) => {
                    const close = () => rerender({ isModalOpen: false });
                    return (
                        <Modal
                            title="Basic Modal"
                            open={isModalOpen}
                            onOk={close}
                            onCancel={close}
                            afterClose={remove}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                    );
                },
                { isModalOpen: true }
            );
        };

        const [state, setState] = useState("");
        return (
            <>
                <Debug />
                <Renderer />
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                <input value={state} onChange={(e) => setState(e.target.value)} />
            </>
        );
    },
};
