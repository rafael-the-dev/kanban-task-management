
import Button from "@mui/material/Button";

import EditIcon from '@mui/icons-material/Edit';

const EditButton = ({ children, ...rest }) => {
    return (
        <Button 
            className="capitalize justify-start pl-2 text-primary-600 w-full hover:bg-primary-600 hover:text-white"
            startIcon={<EditIcon />}
            { ...rest }>
            { children }
        </Button>
    )
};

export default EditButton;