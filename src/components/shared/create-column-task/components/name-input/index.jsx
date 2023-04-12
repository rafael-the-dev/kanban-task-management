import * as React from "react";

import { ColumnContext } from "src/context/ColumnContext";

import TextField from "src/components/default-input";

const NameInput = () => {
    const { name, setName } = React.useContext(ColumnContext);

    const changeHandler = React.useCallback(({ target: { value }}) => {
        setName(
            {
                error: !Boolean(value.trim()),
                value
            }
        );
    }, [ setName ]);

    const nameInputMemo = React.useMemo(() => (
        <TextField 
            { ...name }
            className="capitalize"
            fullWidth
            label="Title"
            onChange={changeHandler}
            required
        />
    ), [ name, changeHandler ]);

    return nameInputMemo;
};

export default NameInput;