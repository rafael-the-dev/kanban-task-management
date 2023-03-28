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
    /* target: { columnId, taskId } 
    *  source: { columnId, taskId }
    */
    const targetColumn = getItem(board.columns.find(findItem(target.columnId)), "Target column not found");
    const targetTask = getItem(targetColumn.tasks.findIndex(findItem(target.taskId)), "Target task not found");

    if(target.columnId === source.columnId) {
        if(target.taskId !== source.taskId) {
            const { tasks } = targetColumn;
            const sourceTask = getItem(tasks.findIndex(findItem(source.taskId)), "Source task not found");

            let tempTask = tasks[sourceTask];
            tasks[sourceTask] = tasks[targetTask];
            tasks[targetTask] = tempTask;
        } else {
            return defaultBoard;
        }
    } else {
        const sourceColumn = getItem(board.columns.find(findItem(source.columnId)), "Source column not found.");
        const sourceTask = getItem(sourceColumn.tasks.find(findItem(source.taskId)), "Source task not found.");

        sourceColumn.tasks = sourceColumn.tasks.filter(task => task.id !== source.taskId)
        targetColumn.tasks = [ sourceTask, ...targetColumn.tasks ];
    }
};