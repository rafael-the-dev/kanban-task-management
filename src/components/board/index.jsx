import * as React from "react"

import { AppContext } from "src/context";

import Column from "./components/column";

const BoardContainer = () => {
    const { board } = React.useContext(AppContext);

    if(!board) return <></>;

    return (
        <div className="h-full">
            <ul
                className="flex h-full overflow-x-auto px-5 py-4 w-full">
                {
                    board.columns.map(column => (
                        <Column
                            { ...column }
                            key={column.id} 
                        />
                    ))
                }
            </ul>
        </div>
    );
};

export default BoardContainer;