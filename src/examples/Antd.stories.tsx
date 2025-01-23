import { fn } from "@storybook/test";
import { Button, Modal } from "antd";
import { createExternalRenderer } from "@/index";

const { render, Renderer } = createExternalRenderer();

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
            const { rerender } = render(
                ({ isModalOpen }) => {
                    const close = () => rerender({ isModalOpen: false });
                    return (
                        <Modal title="Basic Modal" open={isModalOpen} onOk={close} onCancel={close}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                    );
                },
                { isModalOpen: true }
            );
        };
        return (
            <>
                <Renderer />
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
            </>
        );
    },
};
