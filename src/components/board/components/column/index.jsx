import * as React from "react";
import classNames from "classnames";

import classes from "./styles.module.css";

import Typography from "@mui/material/Typography";

const ColumnContainer = ({ name, tasks }) => {

    return (
        <li className={classNames(classes.container, `border border-solid border-stone-300 px-3 py-2 rounded-lg`)}>
            <div>
                <Typography
                    className={classNames("text-stone-600")}
                    component="h2">
                    { name } ({ tasks.length })
                </Typography>
            </div>
        </li>
    );
};

export default ColumnContainer;