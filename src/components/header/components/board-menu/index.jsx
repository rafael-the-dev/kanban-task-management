import  * as React from "react";
import classNames from "classnames";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import EditIcon from '@mui/icons-material/Edit';
import MoreIcon from "@mui/icons-material/MoreVert";

import classes from "./styles.module.css";

import { AppContext } from "src/context";

import EditBoard from "src/components/shared/create-board";
import DeleteButton from "./components/delete-button";
import Popover from "src/components/popover";

const BoardOptions = () => {
    const { board } = React.useContext(AppContext);

    const onClickRef = React.useRef(null);
    const onCloseRef = React.useRef(null);
    const onOpenBoardDialog = React.useRef(null);

    const clickHandler = (e) => onClickRef.current?.(e);
    const closeHandler = () => onCloseRef.current?.();
    const openBoardDialogHandler = () => onOpenBoardDialog.current?.();

    if(!board) return <></>;

    return (
        <>
            <IconButton
                className="p-1"
                onClick={clickHandler}>
                <MoreIcon />
            </IconButton>
            <EditBoard 
                id={board.id}
                onOpen={onOpenBoardDialog}
            />
            <Popover
                paperClassName={classNames(classes.paper)}
                onClickRef={onClickRef}
                onCloseRef={onCloseRef}>
                <ul>
                    <li>
                        <Button 
                            className="capitalize justify-start pl-2 text-primary-600 w-full hover:bg-primary-600 hover:text-white"
                            onClick={openBoardDialogHandler}
                            startIcon={<EditIcon />}>
                            Edit board
                        </Button>
                    </li>
                    <DeleteButton 
                        onClose={closeHandler}
                    />
                </ul>
            </Popover>
        </>
    );
};

export default BoardOptions;