import * as React from "react";
import classNames from "classnames";
import { v4 as uuidV4 } from "uuid"

import classes from "./styles.module.css";

import { getAuthorizationHeader } from "src/helpers/queries";
import { AppContext } from "src/context"
import { useLoading } from "src/hooks/useLoading";

import AddSubTaskButton from "../add-list-item";
import Button from "../button"
import SubTaskInput from "../removeable-input";
import Dialog from "src/components/dialog";
import DialogHeader from "src/components/dialog/components/dialog-header";
import MessageDialog from "../message-dialog"
import TextField from "src/components/default-input";
import { Typography } from "@mui/material";

const CreateBoardContainer = ({ onOpen }) => {
    const { board, fetchBoards } = React.useContext(AppContext);

    const { loading, setLoading } = useLoading();

    const [ name, setName ] = React.useState({ error: false, value: "" });
    const [ subTasks, setSubTasks ] = React.useState([]);
    const [ taskColumn, setTaskColumn ] = React.useState("");

    const onClose = React.useRef(null);
    const setDialogMessageRef = React.useRef(null);

    const closeHandler = React.useCallback(() => onClose.current?.(), []);

    const createSubTask = React.useCallback(() => {
        setSubTasks(subTasks => {
            return [
                ...subTasks,
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
            const { status } = await fetch(`/api/boards/${board.id}`, options);

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

    const changeHandler = React.useCallback(({ target: { value }}) => {
        setName(
            {
                error: !Boolean(value.trim()),
                value
            }
        );
    }, []);

    const addSubTaskButton = React.useMemo(() => (
        <AddSubTaskButton
            onClick={createSubTask}>
            Add new subtask
        </AddSubTaskButton>
    ), [ createSubTask ]);

    const dialogHeaderMemo = React.useMemo(() => (
        <DialogHeader
            classes={{ root: classNames("capitalize pl-3")}}
            onClose={closeHandler}>
            Add new task
        </DialogHeader>
    ), [ closeHandler ])

    const nameInputMemo = React.useMemo(() => (
        <TextField 
            { ...name }
            className="capitalize"
            fullWidth
            label="Title"
            onChange={changeHandler}
        />
    ), [ name, changeHandler ]);

    const messageDialogMemo = React.useMemo(() => (
        <MessageDialog
            setDialogMessage={setDialogMessageRef} 
        />
    ), [])

    const columnTitleMemo = React.useMemo(() => (
        <Typography
            component="legend"
            className="">
            Subtasks
        </Typography>
    ), [])

    const subTasksInputsMemo = React.useMemo(() => (
        <div className="mt-2">
            {
                subTasks.map(column => (
                    <SubTaskInput 
                        { ...column }
                        list={subTasks}
                        key={column.id}
                        setList={setSubTasks}
                    />
                ))
            }
        </div>
    ), [ subTasks ]);

    React.useEffect(() => {
        try {
            setSubTasks(columns => {
                if(columns.length === 0)  {
                    createSubTask();
                    throw new Error()
                }
    
                return columns;
            })
        } catch(e) {

        }
    }, [ createSubTask ])

    return (
        <Dialog
            classes={{ paper: classNames(classes.paper, `m-0`) }}
            onClose={onClose}
            onOpen={onOpen}>
            { dialogHeaderMemo }
            <form 
                className="flex flex-col grow items-stretch justify-between"
                onSubmit={submitHandler}>
                <div className={classNames(classes.content, "grow overflow-y-auto px-5 py-3")}>
                    { nameInputMemo }
                    <fieldset className="mt-4">
                        { columnTitleMemo }
                        { subTasksInputsMemo }
                        { addSubTaskButton }
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