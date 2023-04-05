import { createContext, useCallback, useEffect, useRef, useState } from 'react';

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

    const isFirstRendering = useRef(true);
    console.log('status', theme)
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
        console.log("theme")
        if(isFirstRendering.current) {
            isFirstRendering.current = false;
            return;
        }

        if(theme === "DARK") {
            document.querySelector('html').classList.add("dark");
        } else {
            document.querySelector('html').classList.remove("dark");
        }

        saveThemeOnLocalStorage({ theme })
    }, [ saveThemeOnLocalStorage, theme ])

    return (
        <ThemeContext.Provider 
            value={{ 
                setTheme, 
                theme 
            }}>
            { children }
        </ThemeContext.Provider>
    );
}