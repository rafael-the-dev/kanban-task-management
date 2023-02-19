import * as React from "react";
import Button from "@mui/material/Button";
import classNames from "classnames";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import classes from "./styles.module.css";

const TaskContainer = ({ description, name }) => {

    return (
        <li
            className="">
            <Button className="bg-white w-full hover:bg-primary-100">
                <Paper 
                    className="bg-transparent"
                    elevation={0}>
                    <div>
                        <Typography
                            component="h3"
                            className={classNames("overflow-hidden ")}>
                            { name }
                        </Typography>
                    </div>
                    <div>
                        <Typography
                            component="p"
                            className={classNames(classes.description, "text-xl leading-7")}>
                            { description }
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            { name }
                        </Typography>
                    </div>
                </Paper>
            </Button>
        </li>
    );
};

export default TaskContainer;