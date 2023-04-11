import * as React from "react";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import classNames from "classnames"

import classes from "./styles.module.css";

import { AppContext, LoginContext } from "src/context";

import AddColumnTask from "./components/add-board-column-task";
import BoardMenu from "./components/board-menu";
import Logo from "src/components/shared/logo";
import Menu from "./components/menu";

const Header = () => {
    const { loggedUser } = React.useContext(LoginContext);
    const { board, boards } = React.useContext(AppContext);

    const isEmptyList = boards.list.length === 0

    const router = useRouter();
    const { pathname } = router;
    

    if([ "/sign-up", "/login" ].includes(pathname)) return <></>;

    return (
        <header className={classNames("xl:border-l dark:border-l-0 border-solid border-stone-300", { "xl:hidden": isEmptyList })}>
            <div className={classNames("flex items-center justify-between px-5 py-2 relative xl:px-10 dark:bg-dark-700")}>
                <div className="flex items-center pl-2 xl:pl-0">
                    <Logo xlUp />
                    <Hidden xlUp>
                        <Menu />
                    </Hidden>
                    { board && (
                        <Hidden xlDown>
                            <Typography
                                component='h2'
                                className={classNames(classes.boardName, `font-semibold dark:text-white
                                    overflow-hidden whitespace-nowrap text-ellipsis text-2xl`)}>
                                { board.name }
                            </Typography>
                        </Hidden>
                    )}
                </div>
                <div className="flex items-center pr-2 xl:pr-0">
                    <AddColumnTask />
                    <BoardMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;