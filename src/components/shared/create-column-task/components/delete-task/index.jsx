import * as React from 'react';
import Button from "@mui/material/Button";
import classNames from "classnames";
import DialogActions from "@mui/material/DialogActions";
import DialogDescription from "@mui/material/DialogContent";

import classes from "./styles.module.css";
import { useLoading } from "src/hooks/useLoading";
import { AppContext } from "src/context/AppContext"
import { ColumnContext } from "src/context/ColumnContext";
import { getAuthorizationHeader } from "src/helpers/queries"

import Dialog from "src/components/dialog";

const DeleteTask = ({ className }) => {
    const { board } = React.useContext(AppContext);
    const { columnId, taskId } = React.useContext(ColumnContext);

    const { loading, setLoading } = useLoading();

    const onClose = React.useRef(null);
    const onOpen = React.useRef(null);

    const closeHandler = React.useCallback(() => onClose.current?.(), []);
    const openHandler = React.useCallback(() => onOpen.current?.(), []);

    const deleteHandler = React.useCallback(async () => {
        setLoading(true);

        const options = {
            ...getAuthorizationHeader(),
            method: "DELETE"
        };

        try {
            const res = await fetch(`/api/boards/${board.id}/columns/${columnId}/tasks/${taskId}`, options);
            const { status } = res;

            if(status === 200) {
                closeHandler();
            }

            const data = await res.json();
            throw new Error(data.messae);
        }
        catch(e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }, [ board, columnId, closeHandler, setLoading, taskId ]);

    return (
        <>
            <Button
                className={classNames(className, `border-red-600 text-red-600 
                    hover:bg-red-600 hover:border-red-600 hover:text-white`)}
                onClick={openHandler}
                variant="outlined">
                Delete
            </Button>
            <Dialog
                classes={{ paper: classes.paper }}
                onClose={onClose}
                onOpen={onOpen}>
                <DialogDescription>
                    Are you sure you want to delete this task?
                </DialogDescription>
                <DialogActions>
                    <Button
                        className="border-primary-600 text-primary-600 capitalize mr-3 hover:bg-primary-600
                            hover:border-primary-600 hover:text-white"
                        onClick={closeHandler}
                        variant="outlined">
                        Cancel
                    </Button>
                    <Button
                        className={classNames(className, `bg-red-600 border-red-600 capitalize text-white 
                            hover:bg-red-800`)}
                        onClick={deleteHandler}
                        variant="contained">
                        { loading ? "Loading..." : "Delete" }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteTask;