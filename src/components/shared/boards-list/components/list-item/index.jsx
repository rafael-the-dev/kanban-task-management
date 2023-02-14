import * as React from "react";
import classNames from "classnames";

import BoardIcon from "public/images/icons/icon-board.svg";

import classes from "./styles.module.css";

import { AppContext } from "src/context";

import Button from "src/components/shared/button";

const ListItem = ({ id, item, name }) => {
    const { board, setBoard } = React.useContext(AppContext);

    //check if the current list item is the selected board
    const isSelected = board.id === id;

    const clickHandler = React.useCallback(() => setBoard(item), [ item, setBoard ])

    return (
        <li>
            <Button
                classes={
                    { 
                        button: classNames(isSelected ? "bg-primary-500 text-white" : "bg-transparent shadow-none text-primary-500", 
                        `capitalize justify-start mb-2 rounded-l-none rounded-r-full hover:bg-primary-600 hover:text-white lst:mb-0`, classes.button) 
                    }
                }
                onClick={clickHandler}
                startIcon={<BoardIcon className={classNames(isSelected ? "text-white" : "")} />}>
                { name }
            </Button>
        </li>
    )
};

export default ListItem;