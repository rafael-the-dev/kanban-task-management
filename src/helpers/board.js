
import Error404 from "src/models/server/errors/404Error";
import InputFormatError from "src/models/server/errors/InvalidArgumentError";


export const getBoard = ({ boards, id }) => boards.find(board => board.id === id);
export const getBoardColumn = ({ columns, id }) => columns.find(column => column.id === id);

export const getBoardDetails = ({ boards, id, columnId, taskId }) => {
    const board = getBoard({ boards, id });
    if(!board) throw new Error404("Board not found");

    let column = null;
    if(columnId) {
        column = getBoardColumn({ columns: board.columns, id: columnId });
        if(!column) throw new Error404("Column not found");
    }

    let task = null;
    if(taskId) {
        task = column.tasks.find(currentTask => currentTask.id === taskId);
        if(!task) throw new Error404("Task not found");
    }

    return {
        board,
        column,
        task
    };
};

export const isValidName = ({ value }) => {
    if(!Boolean(value.trim())) throw new InputFormatError();

    return true;
};