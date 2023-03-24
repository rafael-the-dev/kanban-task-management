import * as React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import DueDate from "./components/due-date";
import Description from "./components/description";
import Title from "./components/title";

import TaskDialog from "src/components/shared/create-column-task";

const TaskCard = ({ body, columnId, footer, header, id }) => {
    const onOpen = React.useRef(null);

    const clickHandler = React.useCallback(() => onOpen.current?.(), []);
    
    return (
        <li
            className="mb-4 last:mb-0">
            <Button 
                className="bg-white justify-start normal-case px-4 py-3 rounded-lg text-left w-full 
                    first-letter:capitalize hover:bg-primary-100"
                onClick={clickHandler}>
                <Paper 
                    className="bg-transparent flex flex-col items-stretch"
                    elevation={0}>
                    { header }
                    { body }
                    { footer }
                </Paper>
            </Button>
            <TaskDialog
                columnId={columnId}
                onOpen={onOpen} 
                title="Edit task"
                taskId={id}>
                <TaskDialog.Form>
                    <TaskDialog.Content>
                        <TaskDialog.NameInput />
                        <TaskDialog.DescriptionInput />
                        <TaskDialog.Columns />
                    </TaskDialog.Content>
                    <TaskDialog.SubmitButton />
                </TaskDialog.Form>
            </TaskDialog>
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