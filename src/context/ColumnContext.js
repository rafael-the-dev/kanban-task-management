import * as React from "react";

import { useLoading } from "src/hooks/useLoading";

export const ColumnContext = React.createContext();
ColumnContext.displayName = "ColumnContext";

const initial = { error: false, value: "" };

export const ColumnContextProvider = ({children}) => {
    const [ description, setDescription ] = React.useState(initial);
    const [ name, setName ] = React.useState(initial);
    const [ subTasks, setSubTasks ] = React.useState([]);
    const [ taskColumn, setTaskColumn ] = React.useState("");

    const { loading, setLoading } = useLoading();

    return (
        <ColumnContext.Provider
            value={{
                description,
                loading,
                name,
                subTasks,
                taskColumn,
                setDescription, setLoading, setName, setSubTasks, setTaskColumn
            }}>
            { children }
        </ColumnContext.Provider>
    );
};