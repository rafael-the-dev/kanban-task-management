import * as React from "react";
import classNames from "classnames"

import classes from "./styles.module.css";

import Board from "src/components/board";

const Home = () => {
    return (
        <main className={classNames(classes.main, `bg-primary-50 `)}>
            <Board />
        </main>
    );
};

export default Home;