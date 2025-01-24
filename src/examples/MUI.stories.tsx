import { fn } from "@storybook/test";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { createExternalRenderer } from "@/index";

const { render, Renderer, Debug } = createExternalRenderer();

export const ActionsData = {
    onClick: fn(),
};

export default {
    title: "MUI",
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        ...ActionsData,
    },
};

export const Default = {
    /**
     * https://mui.com/material-ui/react-dialog/
     */
    render: function MUI() {
        const showModal = () => {
            const { rerender, remove } = render(
                ({ open }) => {
                    const handleClose = () => rerender({ open: false });
                    return (
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            onTransitionExited={remove}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Use Google's location service?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Let Google help apps determine location. This means sending
                                    anonymous location data to Google, even when no apps are
                                    running.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={handleClose} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    );
                },
                { open: true }
            );
        };
        return (
            <>
                <Debug />
                <Renderer />
                <Button variant="outlined" onClick={showModal}>
                    Open alert dialog
                </Button>
            </>
        );
    },
};
