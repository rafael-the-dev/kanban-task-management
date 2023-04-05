import * as React from "react";
import { Avatar, Button, IconButton, Typography} from "@mui/material";
import classNames from "classnames";

import classes from "./styles.module.css";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SchoolIcon from '@mui/icons-material/School';
import TimelineIcon from '@mui/icons-material/Timeline';

import BoardsList from "src/components/shared/boards-list";
import CreateBoard from 'src/components/header/components/menu/components/create-board';
import Logo from "src/components/shared/logo";
import ThemeSwitcher from "src/components/shared/theme-toggle";

const Container = () => {
    const [ open, setOpen ] = React.useState(false);

    const toggle = React.useCallback(() => setOpen(b => !b), []);

    return (
        <aside 
            className={classNames(classes.container, `bg-stone-100 flex flex-col h-screen xl:h-full 
            justify-between overflow-hidden pl-5 pb-6 xl:bg-white xl:pl-0`,
            { [classes.containerOpen]: open })}>
            <div>
                <div className="pr-5 py-4 rounded-full xl:mb-8 xl:pl-4 lg:py-3 xl:rounded-none">
                    <Logo lgDown />
                </div>
                <BoardsList />
                <CreateBoard />
            </div>
            <div >
                <ThemeSwitcher />
                <Button
                    className={classNames(classes.button, "bg-slate-300 hidden xl:flex hover:bg-slate-400", { [classes.buttonOpen]: open})}
                    onClick={toggle}>
                    { open ? <ArrowBackIcon /> : <ArrowForwardIcon /> }
                </Button>
            </div>
        </aside>
    );
};

export default Container;