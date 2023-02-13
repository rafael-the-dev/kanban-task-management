import * as React from "react";
import classNames from "classnames";
import { v4 as uuidV4 } from "uuid"

import classes from "./styles.module.css";

import { getAuthorizationHeader } from "src/helpers/queries";
import { useLoading } from "src/hooks/useLoading"

import Button from "../button"
import ColumnInput from "./components/column-name-input";
import Dialog from "src/components/dialog";
import DialogHeader from "src/components/dialog/components/dialog-header";
import MessageDialog from "../message-dialog"
import TextField from "src/components/default-input";
import { Typography } from "@mui/material";

const CreateBoardContainer = ({ onOpen }) => {
    //const {} = React.useContext();
    const { loading, setLoading } = useLoading();

    const [ columns, setColumns ] = React.useState([]);
    const [ name, setName ] = React.useState({ error: false, value: "" });

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
        let responseDialogMessage = {
            description: "Board was successfully created.",
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
            method: "POST"
        }

        try {
            const { status } = await fetch("/api/boards", options);

            if(status >= 300 || status < 200) throw new Error();
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

    const changeHandler = React.useCallback(({ target: { value }}) => {
        setName(
            {
                error: !Boolean(value.trim()),
                value
            }
        );
    }, []);

    const addColumnButton = React.useMemo(() => (
        <Button
            classes={{ button: "bg-primary-200 py-2 shadow-none text-primary-700 w-full hover:bg-primary-600 hover:text-white" }}
            color="primary"
            onClick={createColumn}>
            Add column
        </Button>
    ), [ createColumn ])

    const nameInputMemo = React.useMemo(() => (
        <TextField 
            { ...name }
            className="capitalize"
            fullWidth
            label="Board name"
            onChange={changeHandler}
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
            className="">
            Board columns
        </Typography>
    ), [])

    const columnsInputsMemo = React.useMemo(() => (
        <div className="mt-2">
            {
                columns.map(column => (
                    <ColumnInput 
                        { ...column }
                        columns={columns}
                        key={column.id}
                        setColumns={setColumns}
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
    }, [ createColumn ])

    return (
        <Dialog
            classes={{ paper: classNames(classes.paper, `m-0`) }}
            onClose={onClose}
            onOpen={onOpen}>
            <DialogHeader
                classes={{ root: classNames("capitalize pl-3")}}
                onClose={closeHandler}>
                Add new board
            </DialogHeader>
            <form 
                className="flex flex-col grow items-stretch justify-between"
                onSubmit={submitHandler}>
                <div className={classNames(classes.content, "grow overflow-y-auto px-5 py-3")}>
                    { nameInputMemo }
                    <fieldset className="mt-4">
                        { columnsTitleMemo }
                        { columnsInputsMemo }
                        { addColumnButton }
                    </fieldset>
                </div>
                <Button
                    color="primary"
                    classes={{ button: "bg-primary-600 rounded-none w-full sm:py-3 hover:bg-primary-700" }}
                    type="submit">
                    { loading ? "Loading..." : "Send" }
                </Button>
            </form>
            { messageDialogMemo }
        </Dialog>
    );
};

export default CreateBoardContainer;