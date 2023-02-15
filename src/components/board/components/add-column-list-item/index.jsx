import  * as React from "react";
import Button from "@mui/material/Button";
import classNames from "classnames";

import AddIcon from '@mui/icons-material/Add';

import classes from "./styles.module.css";

const AddColumn = () => {

    return (
        <li className={classNames(classes.container, `border border-dashed border-primary-300 px-3 py-2 rounded-lg`)}>
            <Button 
                className="h-full w-full">
                <AddIcon className="text-4xl" />
            </Button>
        </li>
    );
};

export default AddColumn;