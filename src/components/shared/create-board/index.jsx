import * as React from "react";
import classNames from "classnames";
import { v4 as uuidV4 } from "uuid"

import classes from "./styles.module.css";

import Button from "../button"
import ColumnInput from "./components/column-name-input";
import Dialog from "src/components/dialog";
import DialogHeader from "src/components/dialog/components/dialog-header";
import TextField from "src/components/default-input";
import { Typography } from "@mui/material";

const CreateBoardContainer = ({ onOpen }) => {
    //const {} = React.useContext();

    const [ columns, setColumns ] = React.useState([]);
    const [ name, setName ] = React.useState({ error: false, value: "" });

    const onClose = React.useRef(null);

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
    }, [])

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
            classes={{ button: "w-full" }}
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
            <form className="px-5 py-3">
                { nameInputMemo }
                <fieldset className="mt-4">
                    { columnsTitleMemo }
                    { columnsInputsMemo }
                    { addColumnButton }
                </fieldset>
            </form>
        </Dialog>
    );
};

export default CreateBoardContainer;