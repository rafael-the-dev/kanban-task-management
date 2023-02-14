import * as React from 'react';

import { fetchHelper, getAuthorizationHeader } from "src/helpers/queries"

export const AppContext = React.createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const [ boards, setBoards ] = React.useState({ list: [] });

    const fetchBoards = React.useCallback(async () => {
        try {
            const { data } = await fetchHelper({ options: getAuthorizationHeader(), url: "/api/boards" });
            setBoards({ list: data });
        }
        catch(e) {
            console.error(e);
        }
    }, []);

    React.useEffect(() => {
        fetchBoards();
    }, [ fetchBoards ])

    return (
        <AppContext.Provider value={{ 
            boards,
            fetchBoards,
            setBoards
         }}>
            { children }
        </AppContext.Provider>
    );
}