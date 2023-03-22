import  * as React from "react";
import Button from "@mui/material/Button";
import classNames from "classnames";

import AddIcon from '@mui/icons-material/Add';

import classes from "./styles.module.css";

import CreateColumn from "src/components/shared/create-column-task";

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
            <CreateColumn onOpen={onOpen} />
        </li>
    );
};

export default AddColumn;