import * as React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import DueDate from "./components/due-date";
import Description from "./components/description";
import Title from "./components/title";

const TaskCard = ({ body, footer, header }) => {

    return (
        <li
            className="mb-4 last:mb-0">
            <Button className="bg-white justify-start normal-case px-4 py-3 rounded-lg text-left w-full first-letter:capitalize hover:bg-primary-100">
                <Paper 
                    className="bg-transparent flex flex-col items-stretch"
                    elevation={0}>
                    { header }
                    { body }
                    { footer }
                </Paper>
            </Button>
        </li>
    );
};

TaskCard.DueDate = DueDate;
TaskCard.Description = Description;
TaskCard.Title = Title;

export default TaskCard;

/**
 * { description && <div>
                        <Typography
                            component="p"
                            className={classNames(classes.description, `font-normal mt-2 text-sm leading-6
                                overflow-hidden text-ellipsis`)}>
                            { description }
                        </Typography>
                    </div> }
                    <div>
                        <Typography>
                            { name }
                        </Typography>
                    </div>
 */