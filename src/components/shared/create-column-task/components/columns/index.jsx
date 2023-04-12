import * as React from "react";
import { v4 as uuidV4 } from "uuid";

import { ColumnContext } from "src/context/ColumnContext";

import AddSubTaskButton from "src/components/shared/add-list-item";
import Legend from "../sub-title";
import SubTaskInput from "src/components/shared/removeable-input";

const Columns = () => {
    const { subTasks, setSubTasks } = React.useContext(ColumnContext);

    const createSubTask = React.useCallback(() => {
        setSubTasks(subTasks => {
            return [
                ...subTasks,
                {
                    error: false,
                    id: uuidV4(),
                    value: "",
                }
            ]
        })
    }, [ setSubTasks ]);

    /*React.useEffect(() => {
        try {
            setSubTasks(columns => {
                if(columns.length === 0)  {
                    createSubTask();
                    throw new Error()
                }
    
                return columns;
            })
        } catch(e) {

        }
    }, [ createSubTask, setSubTasks ]);*/

    return (
        <fieldset>
            <Legend
                className="">
                Subtasks
            </Legend>
            <div className="mt-2">
                {
                    subTasks.map(column => (
                        <SubTaskInput 
                            { ...column }
                            list={subTasks}
                            key={column.id}
                            setList={setSubTasks}
                        />
                    ))
                }
            </div>
            <AddSubTaskButton
                onClick={createSubTask}>
                Add new subtask
            </AddSubTaskButton>
        </fieldset>
    );
};

export default Columns;