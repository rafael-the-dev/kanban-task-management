import * as React from 'react';

import { fetchHelper, getAuthorizationHeader } from "src/helpers/queries";
import { LoginContext } from "./LoginContext"

export const AppContext = React.createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const { user } = React.useContext(LoginContext);

    const [ boards, setBoards ] = React.useState({ list: [] });
    const [ board, setBoard ] = React.useState(null);
    
    const boardRef = React.useRef(null);

    const dialogCloseHandler = React.useRef(null);

    const fetchBoards = React.useCallback(async () => {
        try {
            const { data } = await fetchHelper({ options: getAuthorizationHeader(), url: "/api/boards" });
            setBoards({ list: data });

            if(boardRef.current) {
                const result = data.find(item => item.id == boardRef.current.id);

                if(result) setBoard(result);
                else setBoard(data.length > 0 ? data[0] : null);
            }
            else setBoard(data.length > 0 ? data[0] : null);
        }
        catch(e) {
            console.error(e);
        }
    }, [ ]);

    React.useEffect(() => {
        if(user) fetchBoards();
    }, [ fetchBoards, user ]);

    return (
        <AppContext.Provider value={{ 
            boards, board,
            dialogCloseHandler,
            fetchBoards,
            setBoards, setBoard
         }}>
            { children }
        </AppContext.Provider>
    );
}