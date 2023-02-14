import * as React from 'react';

import { fetchHelper, getAuthorizationHeader } from "src/helpers/queries"

export const AppContext = React.createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const [ boards, setBoards ] = React.useState({ list: [] });
    const [ board, setBoard ] = React.useState(null);

    const fetchBoards = React.useCallback(async () => {
        try {
            const { data } = await fetchHelper({ options: getAuthorizationHeader(), url: "/api/boards" });
            setBoards({ list: data });

            if(data.length > 0) setBoard(data[0])
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
            boards, board,
            fetchBoards,
            setBoards, setBoard
         }}>
            { children }
        </AppContext.Provider>
    );
}