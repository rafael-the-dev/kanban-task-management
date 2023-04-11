import  * as React from "react";
import classNames from "classnames";
import IconButton from "@mui/material/IconButton";

import MoreIcon from "@mui/icons-material/MoreVert";

import classes from "./styles.module.css";

import { AppContext } from "src/context";

import EditBoard from "src/components/shared/create-board";
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
                paperClassName={classNames(classes.paper, `dark:bg-dark-700`)}
                onClickRef={onClickRef}
                onCloseRef={onCloseRef}>
                <div className="flex flex-col items-stretch">
                    <Popover.EditButton 
                        onClick={openBoardDialogHandler}>
                        Edit board
                    </Popover.EditButton>
                    <Popover.DeleteButton 
                        onClose={closeHandler}
                        url={`/api/boards/${board.id}`}>
                        Delete board
                    </Popover.DeleteButton>
                </div>
            </Popover>
        </>
    );
};

export default BoardOptions;