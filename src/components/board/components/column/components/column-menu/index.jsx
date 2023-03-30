import  * as React from "react";
import classNames from "classnames";
import IconButton from "@mui/material/IconButton";

import MoreIcon from "@mui/icons-material/MoreHoriz";

import classes from "./styles.module.css";

import { AppContext } from "src/context";

import Popover from "src/components/popover";

const ColumnMenu = ({ columnId }) => {
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
            <Popover
                paperClassName={classNames(classes.paper)}
                onClickRef={onClickRef}
                onCloseRef={onCloseRef}>
                <div className="flex flex-col items-stretch">
                    <Popover.DeleteButton 
                        onClose={closeHandler}
                        url={`/api/boards/${board.id}/columns/${columnId}`}>
                        Delete column
                    </Popover.DeleteButton>
                </div>
            </Popover>
        </>
    );
};

export default ColumnMenu;