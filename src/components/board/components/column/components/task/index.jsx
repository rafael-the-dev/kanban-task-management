import * as React from "react";
import Button from "@mui/material/Button";
import classNames from "classnames";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import classes from "./styles.module.css";

const TaskContainer = ({ description, title }) => {

    return (
        <li
            className="mb-4 last:mb-0">
            <Button className="bg-white justify-start normal-case px-4 py-3 rounded-lg text-left w-full first-letter:capitalize hover:bg-primary-100">
                <Paper 
                    className="bg-transparent flex flex-col items-stretch"
                    elevation={0}>
                    <div>
                        <Typography
                            component="h3"
                            className={classNames(classes.title, "font-semibold overflow-hidden text-ellipsis")}>
                            { title }
                        </Typography>
                    </div>
                    <div>
                        <Typography
                            component="p"
                            className={classNames(classes.description, `font-normal mt-2 text-sm leading-6
                                overflow-hidden text-ellipsis`)}>
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