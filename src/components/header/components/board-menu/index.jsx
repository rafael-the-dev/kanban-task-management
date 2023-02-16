import  * as React from "react";
import IconButton from "@mui/material/IconButton";

import MoreIcon from "@mui/icons-material/MoreVert";

import { AppContext } from "src/context"

const BoardOptions = () => {
    const { board } = React.useContext(AppContext);

    if(!board) return <></>;

    return (
        <>
            <IconButton>
                <MoreIcon />
            </IconButton>
        </>
    );
};

export default BoardOptions;