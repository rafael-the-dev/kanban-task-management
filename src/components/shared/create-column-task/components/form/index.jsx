import * as React from "react";

import { getAuthorizationHeader } from "src/helpers/queries";
import { AppContext } from "src/context/AppContext";
import { ColumnContext } from "src/context/ColumnContext";

import MessageDialog from "src/components/shared/message-dialog";

const Form = ({ children, href }) => {
    const { board, fetchBoards } = React.useContext(AppContext);
    const { boardColumnId, columnId, dueDate, description, name, subTasks, setLoading, taskId } = React.useContext(ColumnContext);

    const setDialogMessageRef = React.useRef(null);

    const canIEdit = React.useMemo(() => Boolean(columnId) && Boolean(taskId), [ columnId, taskId ]);

    const messageDialogMemo = React.useMemo(() => (
        <MessageDialog
            setDialogMessage={setDialogMessageRef} 
        />
    ), []);

    const getURL = React.useCallback(() => {
        if(href) return href;

        let url = `/api/boards/${board.id}`;

        //concatenate /tasks slug if user is creating new task
        if(boardColumnId.current) url += `/columns/${boardColumnId.current}/tasks/${canIEdit ? taskId : '/' }`; 

        return url;

    }, [ board, boardColumnId, canIEdit, href, taskId ]);
       
    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);

        let responseDialogMessage = {
            description: "Board was successfully created.",
            title: "Success",
            type: "success"
        }

        const body = JSON.stringify(
            {
                ...( description ? { description: description.value } : {}),
                ...(dueDate.value ? { dueDate: dueDate.value } : {}),
                ...(subTasks ? { subTasks: subTasks.map(({ id, value }) => ({ id, name: value })) } : {}),
                role: "CREATE_COLUMN",
                title: name.value,
            }
        );

        const options = {
            ...getAuthorizationHeader(),
            body, 
            method: canIEdit ? "PUT" : "POST"
        }

        try {
            const { status } = await fetch(getURL(), options);

            if(status >= 300 || status < 200) throw new Error();

            await fetchBoards();
        }
        catch(e) {
            console.error(e);

            responseDialogMessage = {
                description: "Error while creating board, try again.",
                title: "Error",
                type: "error"
            }
        }
        finally {
            setLoading(false);
            setDialogMessageRef.current?.(responseDialogMessage);
        };
    };

    return (
        <form 
            className="flex flex-col grow items-stretch justify-between pt-3 dark:bg-dark-600"
            onSubmit={submitHandler}>
            { children }
            { messageDialogMemo }
        </form>
    );
};

export default Form;