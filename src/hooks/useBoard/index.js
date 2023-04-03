import * as React from "react";

import { AppContext } from "src/context/AppContext";
import { getBoardColumn, get} from "src/helpers/board"

export const useBoard =  () => {
    const { board, setBoard } = React.useContext(AppContext);

    const updateBoard = React.useCallback(({ columnId, key, onSuccess, taskId }) => {
        setBoard(currentBoard => {
            const newBoard = { ...currentBoard };

            let column = null;
            if([ 'COLUMN', 'TASK' ].includes(key)) {
                column = getBoardColumn({ columns: newBoard.columns, id: columnId });
            }

            let task = null;
            if(key === "TASK") {
                task = column.tasks.find(task => task.id === taskId);
            }

            onSuccess({ newBoard, column, task });

            return newBoard;

        })
    }, [ setBoard ]);

    return {
        board,
        setBoard,
        updateBoard
    }
};