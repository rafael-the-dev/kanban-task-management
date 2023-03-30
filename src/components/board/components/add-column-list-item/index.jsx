import  * as React from "react";
import Button from "@mui/material/Button";
import classNames from "classnames";

import AddIcon from '@mui/icons-material/Add';

import classes from "./styles.module.css";

import Dialog from "src/components/shared/create-column-task";
import CreateTask from "src/components/shared/create-task";

const AddColumn = () => {
    const onOpen = React.useRef(null);

    const clickHandler = () => onOpen.current?.();

    return (
        <li className={classNames(classes.container, `border border-dashed border-primary-300 px-3 py-2 rounded-lg`)}>
            <Button 
                className="h-full rounded-lg w-full"
                onClick={clickHandler}>
                <AddIcon className="text-4xl" />
            </Button>
            <Dialog 
                onOpen={onOpen} 
                title="Create new column">
                <CreateTask />
            </Dialog>
        </li>
    );
};

export default AddColumn;