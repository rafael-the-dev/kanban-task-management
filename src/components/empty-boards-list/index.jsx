import * as React from "react";
import classNames from "classnames"
import Typography from "@mui/material/Typography"

import Button from "../shared/button";
import CreateBoard from "../shared/create-board";

const EmptyBoardsList = () => {
    const onOpen = React.useRef(null);

    const clickHandler = () => onOpen.current?.();

    return (
        <div className="flex flex-col h-full xl:h-screen items-center justify-center ">
            <Typography
                component="h2"
                className={classNames("font-bold mb-4 text-xl")}>
                No boards available
            </Typography>
            <Button
                color="primary"
                onClick={clickHandler}>
                Create new board
            </Button>
            <CreateBoard onOpen={onOpen} />
        </div>
    );
};

export default EmptyBoardsList;