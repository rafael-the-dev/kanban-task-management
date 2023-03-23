import * as React from "react";

import { getAuthorizationHeader } from "src/helpers/queries";
import { AppContext } from "src/context/AppContext";
import { ColumnContext } from "src/context/ColumnContext";

import MessageDialog from "src/components/shared/message-dialog";

const Form = ({ children }) => {
    const { board, fetchBoards } = React.useContext(AppContext);
    const { boardColumnId, description, name, subTasks, setLoading } = React.useContext(ColumnContext);

    const setDialogMessageRef = React.useRef(null);

    const messageDialogMemo = React.useMemo(() => (
        <MessageDialog
            setDialogMessage={setDialogMessageRef} 
        />
    ), []);

    const getURL = React.useCallback(() => {
        let url = `/api/boards/${board.id}`;

        //concatenate /tasks slug if user is creating new task
        if(boardColumnId.current) url += `/columns/${boardColumnId.current}/tasks`; 

        return url;

    }, [ board, boardColumnId ])
       
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
                subTasks: subTasks.map(({ id, value }) => ({ id, name: value })),
                role: "CREATE_COLUMN",
                title: name.value,
            }
        );

        const options = {
            ...getAuthorizationHeader(),
            body, 
            method: "POST"
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
            className="flex flex-col grow items-stretch justify-between"
            onSubmit={submitHandler}>
            { children }
            { messageDialogMemo }
        </form>
    );
};

export default Form;