import classNames from "classnames";

import IconButton from "@mui/material/IconButton";

import CloseIcon from '@mui/icons-material/Close'; 

import classes from "./styles.module.css";

import TextField from "src/components/default-input";

const ColumnInput = ({ columns, error, id, setColumns, value }) => {
    const helper = ({ onSuccess }) => {
        
    };

    const changeHandler = ({ target: { value }}) => {
        setColumns(columns => {
            const list = [ ...columns ];
            const column = list.find(item => item.id === id);

            if(!column) return columns;

            column.error = !Boolean(value.trim());
            column.value = value;

            return list;
        });
    };

    const deleteHandler = () => {
        setColumns(columns => columns.filter(item => item.id !== id));
    };

    return (
        <div className={classNames("flex", error ? "items-start" : "items-center")}>
            <TextField 
                classes={{ root: classes.TextFieldRoot }}
                className="grow mr-1"
                error={error}
                helperText={ error ? "Column name must not be empty" : "" }
                onChange={changeHandler}
                placeholder="Insert column name"
                value={value}
            />
            <IconButton
                disabled={columns.length === 1}
                onClick={deleteHandler}>
                <CloseIcon />
            </IconButton>
        </div>
    );
};

export default ColumnInput;