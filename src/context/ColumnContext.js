import * as React from "react";

import { AppContext } from "./AppContext";
import { useLoading } from "src/hooks/useLoading";

export const ColumnContext = React.createContext();
ColumnContext.displayName = "ColumnContext";

const initial = { error: false, value: "" };

export const ColumnContextProvider = ({ children, columnId, taskId }) => {
    const { board } = React.useContext(AppContext);
    
    //get selected column from board's columns list
    const column = React.useMemo(() => {
        if(!columnId) return null;// return null if column id was not provided

        const selectedColumn = board.columns.find(column => column.id === columnId);

        // throw an error if column was not found
        if(!selectedColumn) throw new Error("Invalid column id");

        return selectedColumn;
    }, [ board, columnId ])

    // return column task if column and task ids were provided, and null otherwise
    const task = React.useMemo(() => {
        if(!taskId || !column) return null;

        const selectedTask = column.tasks.find(currentTask => currentTask.id === taskId);

        // throw an error if it was not found
        if(!selectedTask) throw new Error("Invalid task id");

        return selectedTask;
    }, [ column, taskId ]);

    // return task's description if it was selected for editing
    const [ description, setDescription ] = React.useState(() => {
        console.log(task)
        if(task) return { ...initial, value: task.description };

        return initial;
    });

    // return task's title if it was selected for editing
    const [ name, setName ] = React.useState(() => {
        if(task) return { ...initial, value: task.title };

        return initial;
    });

    const [ subTasks, setSubTasks ] = React.useState(() => {
        if(task) return task.subTasks.map(({ description, id }) => ({
            error: false,
            id,
            value: description
        }));

        return [];
    });

    const [ taskColumn, setTaskColumn ] = React.useState("");

    const boardColumnId = React.useRef(columnId);

    const { loading, setLoading } = useLoading();

    return (
        <ColumnContext.Provider
            value={{
                //component's details
                columnId, 
                taskId,

                //board, column, and task details
                boardColumnId,
                description,
                loading,
                name,
                subTasks,
                taskColumn,
                setDescription, setLoading, setName, setSubTasks, setTaskColumn
            }}>
            { children }
        </ColumnContext.Provider>
    );
};