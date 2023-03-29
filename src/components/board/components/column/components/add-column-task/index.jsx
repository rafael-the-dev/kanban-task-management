import  * as React from "react";
import Button from "@mui/material/Button";
import classNames from "classnames";

import AddIcon from '@mui/icons-material/Add';

import classes from "./styles.module.css";

import CreateTask from "src/components/shared/create-column-task";

const AddColumn = ({ columnId }) => {
    const onOpen = React.useRef(null);

    const clickHandler = () => onOpen.current?.();

    return (
        <li className={classNames(classes.container, `border border-dashed border-primary-300 px-3 py-2 rounded-lg`)}>
            <Button 
                className="h-full rounded-lg w-full"
                onClick={clickHandler}>
                <AddIcon className="text-2xl" />
            </Button>
            <CreateTask
                columnId={columnId}
                onOpen={onOpen} 
                title="Add new task">
                <CreateTask.Form>
                    <CreateTask.Content>
                        <CreateTask.NameInput />
                        <CreateTask.DescriptionInput />
                        <CreateTask.DueDate />
                        <CreateTask.Columns />
                    </CreateTask.Content>
                    <div className="flex justify-end py-3 px-6">
                        <CreateTask.SubmitButton className="px-8 "  />
                    </div>
                </CreateTask.Form>
            </CreateTask>
        </li>
    );
};

export default AddColumn;