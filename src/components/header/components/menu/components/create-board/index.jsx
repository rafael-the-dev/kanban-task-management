import * as React from "react";

import AddIcon from '@mui/icons-material/Add';

import Button from "src/components/shared/button";
import CreateBoard from "src/components/shared/create-board";

const CreateBoardContainer = () => {
    const onOpenRef = React.useRef(null);

    const clickHandler = () => onOpenRef.current?.();

    return (
        <div className="px-5">
            <Button
                classes={{ button: "bg-transparent capitalize mt-4 rounded-full shadow-none text-primary-600 w-full hover:bg-primary-600 hover:text-white" }}
                onClick={clickHandler}
                startIcon={<AddIcon />}>
                Create new board
            </Button>
            <CreateBoard 
                onOpen={onOpenRef}
            />
        </div>
    );
};

export default CreateBoardContainer;