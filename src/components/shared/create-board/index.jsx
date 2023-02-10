import * as React from "react";
import classNames from "classnames";

import classes from "./styles.module.css";

import Dialog from "src/components/dialog";
import DialogHeader from "src/components/dialog/components/dialog-header";
import TextField from "src/components/default-input";

const CreateBoardContainer = ({ onOpen }) => {
    const [ name, setName ] = React.useState({ error: false, value: "" });

    const onClose = React.useRef(null);

    const closeHandler = React.useCallback(() => onClose.current?.(), []);

    const changeHandler = React.useCallback(({ target: { value }}) => {
        setName(
            {
                error: !Boolean(value.trim()),
                value
            }
        );
    }, []);

    const nameInputMemo = React.useMemo(() => (
        <TextField 
            { ...name }
            className="capitalize"
            fullWidth
            label="Board name"
            onChange={changeHandler}
        />
    ), [ name, changeHandler ])

    return (
        <Dialog
            classes={{ paper: classNames(classes.paper, `m-0`) }}
            onClose={onClose}
            onOpen={onOpen}>
            <DialogHeader
                classes={{ root: classNames("capitalize pl-3")}}
                onClose={closeHandler}>
                Add new board
            </DialogHeader>
            <form className="px-5">
                { nameInputMemo }
            </form>
        </Dialog>
    );
};

export default CreateBoardContainer;