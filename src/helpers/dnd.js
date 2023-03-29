import Error404 from "src/models/server/errors/404Error";

const findItem = id => item => item.id === id;

const getItem = (item, message) => {
    if(typeof item === "number") {
        if(item === -1) throw new Error404(message);
    }
    else if(!item) throw new Error404(message);

    return item;
};

export const swapTasks = ({ board, defaultBoard, source, target }) => {
    /**
     * target: { columnId, taskId } 
     * source: { columnId, taskId }
     */
    const targetColumn = getItem(board.columns.find(findItem(target.columnId)), "Target column not found");

    /**
     * targetTask field is optional if the drop target is column component, required if target is task component
     */
    let targetTask = null;
    if(target.taskId) { 
        targetTask = getItem(targetColumn.tasks.findIndex(findItem(target.taskId)), "Target task not found");
    }
    
    if(target.columnId === source.columnId) {
        if(target.taskId !== source.taskId) {
            const { tasks } = targetColumn;
            const sourceTask = getItem(tasks.findIndex(findItem(source.taskId)), "Source task not found");

            // swap tasks
            let tempTask = tasks[sourceTask];
            tasks[sourceTask] = tasks[targetTask];
            tasks[targetTask] = tempTask;
        } else {
            // return current board if the target task is equal to source task to avoid unnecessary re-render
            return defaultBoard; 
        }
    } else {
        /**
         * Get the source column and source task, then 
         * Add source task to target column's tasks list
         */
        const sourceColumn = getItem(board.columns.find(findItem(source.columnId)), "Source column not found.");
        const sourceTask = getItem(sourceColumn.tasks.find(findItem(source.taskId)), "Source task not found.");

        // remove source task from source column
        sourceColumn.tasks = sourceColumn.tasks.filter(task => task.id !== source.taskId);
        targetColumn.tasks = [ sourceTask, ...targetColumn.tasks ]; 
    }
};

export const dropHandler = ({ columnId, draggedItem, id, setBoard }) => {
    setBoard(currentBoard => {
        const board = { ...currentBoard };

        const result = swapTasks({
            board,
            defaultBoard: currentBoard,
            source: { 
                columnId: draggedItem.columnId, 
                taskId: draggedItem.id 
            },
            target: {
                columnId,
                taskId: id
            }
        });

        if(result) {
            return currentBoard;
        }

        return board;

    });
};

export const submitHandler = async ({ board, columnId, draggedItem, fetchBoards, id }) => {
    try {
        const options = {
            body: JSON.stringify({
                role: "SWAP",
                source: { columnId: draggedItem.columnId, taskId: draggedItem.id }
            }),
            method: "PUT"
        };

        const res = await fetch(`/api/boards/${board.id}/columns/${columnId}/${ id ? `tasks/${id}` : '' }`, options);
        const { status } = res;

        if(status === 200) await fetchBoards();
    }
    catch(e) {
        console.error(e);
    }
};