import * as React from "react";
import Collapse from "@mui/material/Collapse";

import { NavigationContext } from "src/context";

const Container = () => {
    const { component } = React.useContext(NavigationContext);

    return (
        <Collapse
            in={Boolean(component)}
            unmountOnExit>
            <div className="overflow-x-auto w-full">
                { component }
            </div>
        </Collapse>
    );
};

export default Container;