import * as React from "react";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { AppContext } from "src/context";

import Button from "src/components/shared/button";
import Drawer from "src/components/drawer";

const Menu = () => {
    const { board, boards } = React.useContext(AppContext);

    const [ open, setOpen ] = React.useState(false);

    const isListEmpty = boards.list.length === 0;
    const hasSelectedBoard = Boolean(board);

    const toggleState = React.useCallback(() => setOpen(b => !b), []);

    // hide menu if boards' list is empty or if no board is selected
    if(isListEmpty || !hasSelectedBoard) return <></>;

    return (
        <>
            <Button
                color="no-color"
                classes={{ button: "bg-transparent capitalize py-0 shadow-none text-black hover:bg-transparent hover:shadow-none hover:text-primary-700" }}
                endIcon={ open ? <KeyboardArrowUpIcon className="text-primary-600" /> : <KeyboardArrowDownIcon className="text-primary-600" /> }
                onClick={toggleState}>
                { board.name }
            </Button>
        </>
    );
};

export default Menu;