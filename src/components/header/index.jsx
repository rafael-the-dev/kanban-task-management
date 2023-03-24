import * as React from "react";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import classNames from "classnames"

import classes from "./styles.module.css";

import LogoImage from "public/images/icons/logo-light.svg"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AppContext, LoginContext } from "src/context";

import Avatar from "./components/avatar";
import AddColumnTask from "./components/add-board-column-task";
import BoardMenu from "./components/board-menu";
import Image from "src/components/shared/image";
import Link from "../link";
import Logo from "src/components/shared/logo";
import Menu from "./components/menu";
import SearchField from "./components/search-field";
import Title from "../title";

const Header = () => {
    const { loggedUser } = React.useContext(LoginContext);
    const { board } = React.useContext(AppContext);

    const router = useRouter();
    const { pathname } = router;
    

    if([ "/sign-up", "/login" ].includes(pathname)) return <></>;

    return (
        <header className={classNames("xl:border-l border-solid border-stone-300")}>
            <div className={classNames("flex items-center justify-between px-5 py-2 relative xl:px-10")}>
                <div className="flex items-center pl-2 xl:pl-0">
                    <Logo lgUp />
                    <Hidden lgUp>
                        <Menu />
                    </Hidden>
                    { board && (
                        <Hidden lgDown>
                            <Typography
                                component='h2'
                                className="font-semibold text-2xl">
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