import * as React from "react";
import { Breadcrumbs, Hidden, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import classNames from "classnames"

import classes from "./styles.module.css";

import LogoImage from "public/images/icons/logo-light.svg"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { LoginContext } from "src/context";

import Avatar from "./components/avatar";
import AddColumnTask from "./components/add-board-column-task";
import BoardMenu from "./components/board-menu";
import Image from "src/components/shared/image";
import Link from "../link";
import Menu from "./components/menu";
import SearchField from "./components/search-field";
import Title from "../title";

const Header = () => {
    const { loggedUser } = React.useContext(LoginContext);

    const router = useRouter();
    const { pathname } = router;
    

    if([ "/sign-up", "/login" ].includes(pathname)) return <></>;

    return (
        <header className={classNames("")}>
            <div className={classNames("flex items-center justify-between px-5 py-2 relative xl:px-10")}>
                <div className="flex items-center pl-2 xl:pl-0">
                    <Link 
                        className={classNames(classes.logoContainer)}
                        href="/">
                        <LogoImage />
                    </Link>
                    <Hidden lgUp>
                        <Menu />
                    </Hidden>
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