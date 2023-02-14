import * as React from "react";
import classNames from "classnames";

import BoardIcon from "public/images/icons-icon-board.svg";

import { AppContext } from "src/context";

import Button from "src/components/shared/button";

const ListItem = ({ id, item, name }) => {
    const { board, setBoard } = React.useContext();
    const isSelected = board.id === id;

    const clickHandler = React.useCallback(() => setBoard(item), [ item, setBoard ])

    return (
        <li>
            <Button
                classes={{ button: classNames(isSelected ? "bg-primary-600 rounded-l-none rounded-r-full text-white" : "text-primary-500") }}
                onClick={clickHandler}
                startIcon={<BoardIcon />}>
                { name }
            </Button>
        </li>
    )
};

export default ListItem;