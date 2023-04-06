import * as React from "react";
import classNames from "classnames"

import classes from "./styles.module.css";
import { AppContext } from "src/context";

import Board from "src/components/board";
import EmptyBoardsListMessage from "src/components/empty-boards-list";

const Home = () => {
    const { boards } = React.useContext(AppContext);

    const isEmptyList = boards.list.length === 0;

    return (
        <main className={classNames(classes.main, `bg-primary-50 dark:bg-dark-700`, { [classes.mainEmptyList]: isEmptyList })}>
            {
                isEmptyList ? <EmptyBoardsListMessage /> : <Board />
            }
        </main>
    );
};

export default Home;