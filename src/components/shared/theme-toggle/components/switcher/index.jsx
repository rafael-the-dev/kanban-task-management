import * as React from "react";
import Button from "@mui/material/Button";
import classNames from "classnames";

import CircleIcon from "@mui/icons-material/Circle";

import { useTheme } from "src/hooks/theme";

const Switcher  = () => {
    const { isDarkTheme } = useTheme();

    return (
        <Button className={classNames(`bg-primary-600 flex mx-3 rounded-full`, 
        isDarkTheme ? "justify-end" : "justify-start")}>
            <CircleIcon className="text-white text-sm" />
        </Button>
    );
};

export default Switcher;