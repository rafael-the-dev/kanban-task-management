import * as React from "react";
import { Button, Typography } from "@mui/material"
import classNames from "classnames"

import classes from "./styles.module.css";

import { AppContext } from "src/context";

import Board from "src/components/board";
import EmptyBoardsListMessage from "src/components/empty-boards-list";

const Home = () => {
    const { boards } = React.useContext(AppContext);

    return (
        <main className={classNames(classes.main, `bg-primary-50 `)}>
            {
                boards.list.length === 0 ? <EmptyBoardsListMessage /> : <Board />
            }
        </main>
    );
};

export default Home;