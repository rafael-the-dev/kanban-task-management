import * as React from "react";
import moment from "moment";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { ColumnContext } from "src/context/ColumnContext"

import TextField from "src/components/default-input";

const DueDate = ({  }) => {
    const { dueDate, setDueDate } = React.useContext(ColumnContext);

    const changeHandler = React.useCallback((newDate) => {
        setDueDate(currentDate => ({ ...currentDate, value: newDate }));
    }, [ setDueDate ]);

    return (
        <DesktopDatePicker
            { ...dueDate }
            inputFormat="DD/MM/YYYY"
            mask="__/__/____"
            minDate={moment()}
            onChange={changeHandler}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    fullWidth
                    variant="outlined" 
                />
            )}
        />
    );
};

export default DueDate;