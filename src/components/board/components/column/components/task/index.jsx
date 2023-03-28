import * as React from "react";
import Button from "@mui/material/Button";
import classNames from "classnames";
import Paper from "@mui/material/Paper";
import { useDrag, useDrop } from "react-dnd"

import { AppContext } from "src/context/AppContext";
import { ItemTypes } from "./assets/js/config"; 
import { swapTasks } from "src/helpers/dnd"

import DueDate from "./components/due-date";
import Description from "./components/description";
import Title from "./components/title";

import TaskDialog from "src/components/shared/create-column-task";

const TaskCard = ({ body, columnId, footer, header, id }) => {
    const { dialogCloseHandler, board, fetchBoards, setBoard } = React.useContext(AppContext);

    const submitHandler = React.useCallback(async ({ draggedItem }) => {
        try {
            const options = {
                body: JSON.stringify({
                    role: "SWAP",
                    source: { columnId: draggedItem.columnId, taskId: draggedItem.id }
                }),
                method: "PUT"
            };

            const res = await fetch(`/api/boards/${board.id}/columns/${columnId}/tasks/${id}`, options);
            const { status } = res;

            if(status === 200) await fetchBoards();
        }
        catch(e) {
            console.error(e)
        }
    }, [ board, columnId, fetchBoards, id ]);

    const dropHandler = React.useCallback(({ draggedItem }) => {
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
    }, [ columnId, id, setBoard ]);

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.COLUMN_TASK,
            drop: async (item) => {
                dropHandler({ draggedItem: item });
                await submitHandler({ draggedItem: item });
            }
        }),
        [ columnId, dropHandler, submitHandler ]
    );

    const [ collected, drag ] = useDrag(
        () => ({
            collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
            }),
            item: { columnId, id },
            type: ItemTypes.COLUMN_TASK,
        }),
        [ columnId, id ]
    );

    const { isDragging } = collected;

    const onClose = React.useRef(null);
    const onOpen = React.useRef(null);

    const closeHandler = React.useCallback(() => {
        dialogCloseHandler.current = null;
        onClose.current?.();
    }, [ dialogCloseHandler ]);

    const clickHandler = React.useCallback(() => {
        dialogCloseHandler.current = closeHandler;
        onOpen.current?.();
    }, [ closeHandler, dialogCloseHandler ]);
    
    return (
        <li
            className="mb-4 last:mb-0"
            ref={drop}>
            <Button 
                className={classNames(`justify-start normal-case px-4 py-3 rounded-lg text-left w-full 
                    first-letter:capitalize`,
                    isDragging ? "bg-primary-200" : "bg-white hover:bg-primary-100")}
                onClick={clickHandler}
                ref={drag}
                { ...collected }>
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
                customClose={closeHandler}
                onClose={onClose}
                onOpen={onOpen} 
                title="Edit task"
                taskId={id}>
                <TaskDialog.Form>
                    <TaskDialog.Content>
                        <TaskDialog.NameInput />
                        <TaskDialog.DescriptionInput />
                        <TaskDialog.DueDate />
                        <TaskDialog.Columns />
                    </TaskDialog.Content>
                    <div className="flex items-stretch justify-end py-3 px-4">
                        <TaskDialog.DeleteButton className="mr-3" />
                        <TaskDialog.SubmitButton className="px-8 w-auto" />
                    </div>
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