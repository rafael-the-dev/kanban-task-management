import * as React from "react";
import Typography from "@mui/material/Typography"

import { AppContext } from "src/context";

import ListItem from "./components/list-item";

const BoardsList = () => {
    const { boards: { list } } = React.useContext(AppContext);

    return (
        <div>
            <Typography>
                All boards ({ list.length })
            </Typography>
            <ul>
                {
                    list.map(listItem => (
                        <ListItem 
                            { ...listItem }
                            item={listItem}
                            key={listItem.id}
                        />
                    ))
                }
            </ul>
        </div>
    );
};

export default BoardsList;