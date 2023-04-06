import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();
ThemeContext.displayName = 'ThemeContext';

export const ThemeContextProvider = ({ children }) => {
    const [ theme, setTheme ] = useState(() => {
        try {
            const savedTheme = localStorage.getItem(process.env.LOCAL_STORAGE);
            const currentTheme = JSON.parse(savedTheme).theme;

            if(currentTheme) return currentTheme;
        } catch(e) {

        }

        return "LIGHT";
    });

    const isDarkTheme = useMemo(() => theme === "DARK", [ theme ]);

    const muiTheme = createTheme({
        breakpoints: {
            values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 900,
            xl: 1024,
            },
        },
        palette: {
            mode: theme.toLowerCase()
        }
    });

    const isFirstRendering = useRef(true);
    
    const saveThemeOnLocalStorage = useCallback((props) => {
        const currentState = JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE));
        console.log(currentState);
        console.log(props)
        localStorage.setItem(process.env.LOCAL_STORAGE, JSON.stringify({ ...currentState, ...props }));
    }, []);

    /**
    * Check if browser has process.env.LOCAL_STORAGE value if does not, create it
    */
    useEffect(() => {
        if(!localStorage.getItem(process.env.LOCAL_STORAGE)) {
            saveThemeOnLocalStorage({ theme: "LIGHT"});
        }
    }, [ saveThemeOnLocalStorage ]);

    /** 
    * Get saved theme value and update theme
    */
    useEffect(() => {
        const stringifiedTheme = localStorage.getItem(process.env.LOCAL_STORAGE);
        if(stringifiedTheme) {
            const storedTheme = JSON.parse(stringifiedTheme).theme;
            if(storedTheme) setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        if(isFirstRendering.current) {
            isFirstRendering.current = false;
            return;
        }

        if(isDarkTheme) {
            document.querySelector('html').classList.add("dark");
        } else {
            document.querySelector('html').classList.remove("dark");
        }

        saveThemeOnLocalStorage({ theme })
    }, [ isDarkTheme, saveThemeOnLocalStorage, theme ])

    return (
        <ThemeContext.Provider 
            value={{ 
                isDarkTheme,
                setTheme, 
                theme 
            }}>
            <ThemeProvider theme={muiTheme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                { children }
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}