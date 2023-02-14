import * as React from "react";
import classNames from "classnames";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import classes from "./styles.module.css";

import { AppContext } from "src/context";

import Button from "src/components/shared/button";
import BoardsList from "src/components/shared/boards-list";
import CreateBoard from './components/create-board';
import Drawer from "src/components/drawer";

const Menu = () => {
    const { board, boards } = React.useContext(AppContext);

    const [ open, setOpen ] = React.useState(false);

    const onCloseRef = React.useRef(null); //this will hold drawer close handler function
    const onOpenRef = React.useRef(null); // this will hold drawer open handler function

    const isListEmpty = boards.list.length === 0;
    const hasSelectedBoard = Boolean(board);

    const toggleState = React.useCallback(() => setOpen(b => !b), []);

    const componentsMemo = React.useMemo(() => (
        <Drawer
            anchor="top"
            classes={{ paper: classNames(classes.drawerPaper, `mx-auto py-3 rounded-lg`), root: classNames(classes.drawerRoot) }}
            customClose={toggleState}
            onClose={onCloseRef}
            onOpen={onOpenRef}>
            <BoardsList />
            <CreateBoard />
        </Drawer>
    ), [ toggleState ]);

    React.useEffect(() => {
        open ? onOpenRef.current?.() : onCloseRef.current?.();
    }, [ open ])

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
            { componentsMemo }
        </>
    );
};

export default Menu;