import * as React from 'react';

export const AppContext = React.createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const [ boards, setBoards ] = React.useState({ list: [] });

    return (
        <AppContext.Provider value={{ 
            boards,
            setBoards
         }}>
            { children }
        </AppContext.Provider>
    );
}