import * as React from "react";

import { ColumnContext } from "src/context/ColumnContext";

import TextField from "src/components/default-input";

const DescriptionInput = () => {
    const { description, setDescription } = React.useContext(ColumnContext);

    const changeHandler = React.useCallback(({ target: { value }}) => setDescription({ error: false, value }), [ setDescription ]);

    return (
        <TextField
            { ...description }
            className='input'
            label="Description"
            multiline
            minRows={3}
            onChange={changeHandler}
            placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
        />
    )
};

export default DescriptionInput;