import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import TextField from "src/components/default-input";

const Date = ({ date }) => {

    if(!date) return <></>;

    return (
        <DesktopDatePicker
            inputFormat="DD/MM/YYYY"
            inputProps={{ readOnly: true }}
            mask="__/__/____"
            value={date}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    classes={{ root: "mb-0 task-card-due-date" }}
                    variant="standard" 
                />
            )}
        />
    );
};

export default Date;