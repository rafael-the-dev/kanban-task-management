import * as React from "react";
import classNames from "classnames";
import { v4 as uuidV4 } from "uuid"

import classes from "./styles.module.css";

import { getAuthorizationHeader } from "src/helpers/queries";
import { AppContext } from "src/context"
import { useLoading } from "src/hooks/useLoading";

import AddColumnButton from "../add-list-item";
import Button from "../button"
import ColumnInput from "../removeable-input";
import Dialog from "src/components/dialog";
import DialogHeader from "src/components/dialog/components/dialog-header";
import MessageDialog from "../message-dialog"
import TextField from "src/components/default-input";
import { Typography } from "@mui/material";

const CreateBoardContainer = ({ id, onOpen }) => {
    const { boards, fetchBoards } = React.useContext(AppContext);

    const { loading, setLoading } = useLoading();

    const [ columns, setColumns ] = React.useState([]);
    const [ name, setName ] = React.useState({ error: false, value: "" });

    const boardRef = React.useRef(null);
    const onClose = React.useRef(null);
    const setDialogMessageRef = React.useRef(null);

    const closeHandler = React.useCallback(() => onClose.current?.(), []);

    const createColumn = React.useCallback(() => {
        setColumns(columns => {
            return [
                ...columns,
                {
                    error: false,
                    id: uuidV4(),
                    value: "",
                }
            ]
        })
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        const isUpdating = Boolean(boardRef.current);

        let responseDialogMessage = {
            description: `Board was successfully ${isUpdating ? "updated": "created"}.`,
            title: "Success",
            type: "success"
        }

        const body = JSON.stringify(
            {
                columns: columns.map(({ id, value }) => ({ id, name: value })),
                name: name.value,
            }
        );

        const options = {
            ...getAuthorizationHeader(),
            body, 
            method: isUpdating ? "PUT" : "POST"
        }

        try {
            const { status } = await fetch(`/api/boards/${isUpdating ? boardRef.current.id : ""}`, options);

            if(status >= 300 || status < 200) throw new Error();

            await fetchBoards();
            closeHandler();
        }
        catch(e) {
            console.error(e);

            responseDialogMessage = {
                description: `Error while ${isUpdating ? "updating" : "creating"} board, try again.`,
                title: "Error",
                type: "error"
            }
        }
        finally {
            setLoading(false);
            setDialogMessageRef.current?.(responseDialogMessage);
        };
    };

    const changeHandler = React.useCallback(({ target: { value }}) => {
        setName(
            {
                error: !Boolean(value.trim()),
                value
            }
        );
    }, []);

    const addColumnButton = React.useMemo(() => (
        <AddColumnButton
            onClick={createColumn}>
            Add column
        </AddColumnButton>
    ), [ createColumn ]);

    const dialogHeaderMemo = React.useMemo(() => (
        <DialogHeader
            classes={{ 
                root: classNames("bg-primary-700 capitalize pl-3 text-white dark:bg-dark-600"), 
                button: classNames(`text-green-100 dark:opacity-80 dark:text-white`)
            }}
            onClose={closeHandler}>
            Add new board
        </DialogHeader>
    ), [ closeHandler ])

    const nameInputMemo = React.useMemo(() => (
        <TextField 
            { ...name }
            className="capitalize dark:border-white dark:text-white"
            classes={{ root: "dark:text-white", label: "dark:text-white" }}
            fullWidth
            label="Board name"
            onChange={changeHandler}
            required
        />
    ), [ name, changeHandler ]);

    const messageDialogMemo = React.useMemo(() => (
        <MessageDialog
            setDialogMessage={setDialogMessageRef} 
        />
    ), [])

    const columnsTitleMemo = React.useMemo(() => (
        <Typography
            component="legend"
            className="dark:text-white">
            Board columns
        </Typography>
    ), [])

    const columnsInputsMemo = React.useMemo(() => (
        <div className="mt-2">
            {
                columns.map(column => (
                    <ColumnInput 
                        { ...column }
                        list={columns}
                        key={column.id}
                        setList={setColumns}
                    />
                ))
            }
        </div>
    ), [ columns ]);

    React.useEffect(() => {
        try {
            setColumns(columns => {
                if(columns.length === 0)  {
                    createColumn();
                    throw new Error()
                }
    
                return columns;
            })
        } catch(e) {

        }
    }, [ createColumn ]);

    React.useEffect(() => {
        if(id) {
            const board = boards.list.find(board => board.id === id);
            if(board) {
                boardRef.current = board;

                setName({ error: !Boolean(board.name), value: board.name });
                
                setColumns(
                    board.columns
                        .map(({ name, ...rest}) => ({ ...rest, error: !Boolean(name.trim()), value: name })
                    )
                );
            }
        }
    }, [ boards, id ])

    return (
        <Dialog
            classes={{ paper: classNames(classes.paper, `m-0`) }}
            onClose={onClose}
            onOpen={onOpen}>
            { dialogHeaderMemo }
            <form 
                className="flex flex-col grow items-stretch justify-between dark:bg-dark-600"
                onSubmit={submitHandler}>
                <div className={classNames(classes.content, "grow overflow-y-auto px-5 py-3")}>
                    { nameInputMemo }
                    <fieldset className="mt-4">
                        { columnsTitleMemo }
                        { columnsInputsMemo }
                        { addColumnButton }
                    </fieldset>
                </div>
                <div className="flex justify-end py-3 px-6">
                    <Button
                        color="primary"
                        classes={{ button: "bg-primary-600 rounded-none sm:px-8 sm:py-3 hover:bg-primary-700" }}
                        type="submit">
                        { loading ? "Loading..." : "Send" }
                    </Button>
                </div>
                
            </form>
            { messageDialogMemo }
        </Dialog>
    );
};

export default CreateBoardContainer;