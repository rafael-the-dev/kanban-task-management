import * as React from "react"

import { AppContext } from "src/context";

import AddColumn from "./components/add-column-list-item";
import Column from "./components/column";

const BoardContainer = () => {
    const { board } = React.useContext(AppContext);

    if(!board) return <></>;

    return (
        <div className="h-full">
            <div className="h-full overflow-x-auto w-full">
                <ul
                    className="flex h-full px-5 py-4 w-fit">
                    {
                        board.columns.map(column => (
                            <Column
                                { ...column }
                                key={column.id} 
                            />
                        ))
                    }
                    <AddColumn />
                </ul>
            </div>
        </div>
    );
};

export default BoardContainer;