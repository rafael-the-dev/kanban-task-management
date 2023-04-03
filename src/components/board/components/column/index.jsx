import * as React from "react";
import classNames from "classnames";
import Typography from "@mui/material/Typography";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDrop } from "react-dnd";

import classes from "./styles.module.css";
import { AppContext } from "src/context/AppContext";
import { getAuthorizationHeader } from "src/helpers/queries";
import { ItemTypes } from "./components/task/assets/js/config";
import { dropHandler, submitHandler } from "src/helpers/dnd";

import AddTask from "./components/add-column-task";
import Menu from "./components/column-menu";
import Task from "./components/task";

const ColumnContainer = ({ id, name, tasks }) => {
    const { board, fetchBoards, setBoard, taskRef } = React.useContext(AppContext);

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.COLUMN_TASK,
            drop: async (item) => {
                /**
                 * taskRef returns details of current task hovered
                 */
                const targetTask = id === item.columnId ? taskRef.current : null;
                taskRef.current = null;
                dropHandler({ columnId: id, draggedItem: item, id: targetTask?.taskId, setBoard });
                await submitHandler({ board, columnId: id, draggedItem: item, fetchBoards, id: targetTask?.taskId });
            }
        }),
    [ board, fetchBoards, id, taskRef ]);

    const taskFinishedChangeHandler = (task) => async (e) => {
        const { description, dueDate, subTasks, title } = task;

        const body = JSON.stringify(
            {
                ...( description ? { description } : {}),
                ...(dueDate ? { dueDate } : {}),
                finished: e.target.checked,
                ...(subTasks ? { subTasks: subTasks.map(({ id, value }) => ({ id, name: value })) } : {}),
                title,
            }
        );

        const options = {
            ...getAuthorizationHeader(),
            body, 
            method: "PUT"
        }

        const url = `/api/boards/${board.id}/columns/${id}/tasks/${task.id}`;

        try {
            const { status } = await fetch(url, options);

            if(status >= 300 || status < 200) throw new Error();

            await fetchBoards();
        }
        catch(e) {
            console.error(e);
        }
    };
        
    return (
        <li 
            className={classNames(classes.container, `border border-solid border-stone-300 mr-4 py-2 rounded-lg`)}
            ref={drop}>
            <div className="flex items-center justify-between px-3">
                <Typography
                    className={classNames("text-stone-600")}
                    component="h2">
                    { name } ({ tasks.length })
                </Typography>
                <Menu columnId={id} />
            </div>
            <ul className={classNames(classes.tasksContainer, "flex flex-col items-stretch mt-4 overflow-y-auto pb-4 px-3")}>
                {
                    tasks.map(task => (
                        <Task 
                            { ...task }
                            header={
                                <header>
                                    <Task.Title>{ task?.title }</Task.Title>
                                </header>
                            }
                            body={
                                <div>
                                    <Task.Description>{ task?.description }</Task.Description>
                                </div>
                            }
                            footer={
                                <footer className="flex mt-4 items-center justify-between w-full">
                                    <Task.DueDate date={task?.dueDate} />
                                    <Task.Checkbox 
                                        onChange={taskFinishedChangeHandler(task)} 
                                        value={task.finished}
                                    />
                                </footer>
                            }
                            columnId={id}
                            key={task?.id}

                        />
                    ))
                }
                <AddTask columnId={id} />
            </ul>
        </li>
    );
};

export default ColumnContainer;