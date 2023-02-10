import * as React from "react";
import classNames from "classnames"
import Typography from "@mui/material/Typography"

import Button from "../shared/button"

const EmptyBoardsList = () => {

    return (
        <div className="flex flex-col h-full items-center justify-center ">
            <Typography
                component="h2"
                className={classNames("font-bold mb-4 text-xl")}>
                No boards available
            </Typography>
            <Button
                color="primary">
                Create new board
            </Button>
        </div>
    );
};

export default EmptyBoardsList;