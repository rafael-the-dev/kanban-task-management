import * as React from "react";

import { ThemeContext } from "src/context/ThemeContext"

export const useTheme = () => {
    const { isDarkTheme, setTheme, theme } = React.useContext(ThemeContext);

    const setDarkTheme = React.useCallback(() => setTheme("DARK"), [ setTheme ]);
    const setLightTheme = React.useCallback(() => setTheme("LIGHT"), [ setTheme ]);

    const toggleTheme = React.useCallback(() => {
        setTheme((theme) => {
            return theme === "LIGHT" ? "DARK" : "LIGHT";
        })
    }, [ setTheme ])

    return {
        isDarkTheme,
        toggleTheme
    }
};