import * as React from "react";
import classNames from "classnames"
import IconButton from "@mui/material/IconButton";

import DarkThemeIcon from "public/images/icons/icon-dark-theme.svg";
import LightThemeIcon from "public/images/icons/icon-light-theme.svg";

import { useTheme } from "src/hooks/theme";

import Switcher from "./components/switcher";

const ThemeToggle = () => {
    const { isDarkTheme } = useTheme();

    return (
        <div className="bg-primary-100 flex items-center justify-center py-2 rounded-lg xl:mx-3">
            <IconButton className={classNames(`p-0`)}>
                <LightThemeIcon />
            </IconButton>
            <Switcher />
            <IconButton className={classNames(`p-0`)}>
                <DarkThemeIcon />
            </IconButton>
        </div>
    );
};

export default ThemeToggle;