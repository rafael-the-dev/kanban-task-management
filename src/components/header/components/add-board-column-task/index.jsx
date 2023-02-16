import * as React from "react";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";

import { AppContext } from "src/context";

import CreateTask from "src/components/shared/create-column-task";

const CreateTaskButtonsContainer = () => {
    const { board } = React.useContext(AppContext);

    const onOpen = React.useRef(null);

    const clickHandler = () => onOpen.current?.();

    if(!board) return <></>;

    return (
        <>
            <Hidden smUp>
                <IconButton
                    className="bg-primary-600 p-1 text-white hover:bg-primary-700"
                    onClick={clickHandler}>
                    <AddIcon />
                </IconButton>
            </Hidden>
            <Hidden smDown>
                <Button
                    className="bg-primary-600 capitalize px-3 rounded-full text-white hover:bg-primary-700"
                    onClick={clickHandler}
                    startIcon={<AddIcon />}>
                    Add new task
                </Button>
            </Hidden>
            <CreateTask onOpen={onOpen} />
        </>
    );
};

export default CreateTaskButtonsContainer;