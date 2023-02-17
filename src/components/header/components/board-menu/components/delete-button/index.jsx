import  * as React from "react";
import Button from "@mui/material/Button";

import DeleteIcon from '@mui/icons-material/Delete';

import { AppContext } from "src/context"
import { useLoading } from "src/hooks/useLoading";
import { getAuthorizationHeader } from "src/helpers/queries";

import MessageDialog from "src/components/message-dialog";

const BoardOptions = ({ onClose }) => {
    const { board, fetchBoards } = React.useContext(AppContext);

    const { loading, setLoading } = useLoading();

    const setDialogMessage = React.useRef(null);

    const clickHandler = React.useCallback(async () => {
        setLoading(true);

        let responseMessage = {
            description: "Board was successfully deleted.",
            type: "success",
            title: "Success"
        }

        try {
            const options = {
                ...getAuthorizationHeader(),
                method: "DELETE"
            };

            await fetch(`/api/boards/${board.id}`, options);
            await fetchBoards();
            onClose();

        }
        catch(e) {
            responseMessage = {
                description: "Board was successfully deleted.",
                type: "success",
                title: "Success"
            }
        }
        finally {
            setLoading(false);
            setDialogMessage.current?.(responseMessage);
        }
    }, [ board, fetchBoards, onClose, setLoading ]);

    const messageDialog = React.useMemo(() => (
        <MessageDialog 
            setDialogMessage={setDialogMessage}
        />
    ), [])

    return (
        <>
            <Button 
                className="capitalize justify-start pl-2 text-red-600 w-full hover:bg-red-600 hover:text-white"
                onClick={clickHandler}
                startIcon={<DeleteIcon />}>
                { loading ? "Loading..." : "Delete" }
            </Button>
            { messageDialog }
        </>
    );
};

export default BoardOptions;