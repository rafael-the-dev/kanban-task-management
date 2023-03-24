import * as React from "react";
import classNames from "classnames";
import Typography from "@mui/material/Typography";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import classes from "./styles.module.css";

import AddTask from "./components/add-column-task";
import Task from "./components/task";

const ColumnContainer = ({ id, name, tasks }) => {

    return (
        <li className={classNames(classes.container, `border border-solid border-stone-300 mr-4 px-3 py-2 rounded-lg`)}>
            <div>
                <Typography
                    className={classNames("text-stone-600")}
                    component="h2">
                    { name } ({ tasks.length })
                </Typography>
            </div>
            <ul className="flex flex-col items-stretch mt-4">
                {
                    tasks.map(task => (
                        <Task 
                            { ...task }
                            header={
                                <header>
                                    <Task.Title>{ task.title }</Task.Title>
                                </header>
                            }
                            body={
                                <div>
                                    <Task.Description>{ task.description }</Task.Description>
                                </div>
                            }
                            footer={
                                <footer className="flex mt-4 justify-between">
                                    <Task.DueDate date={task.createdAt} />
                                </footer>
                            }
                            columnId={id}
                            key={task.id}

                        />
                    ))
                }
                <AddTask columnId={id} />
            </ul>
        </li>
    );
};

export default ColumnContainer;