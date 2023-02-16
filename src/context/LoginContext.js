import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router"

const LoginContext = createContext();
LoginContext.displayName = "LoginContext";

const LoginContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ isValidatingToken, setIsValidatingToken ] = useState(false);
    const isFirstRender = useRef(true);

    const loggedUser = useMemo(() => {
        if(user) return user;

        return {
            access: {
                loginId: "",
                token: "",

            },
            category: "",
            firstName: "",
            image: "",
            lastName: "",
            username: ""
        };
    }, [ user ]);

    const addUser = useCallback((newUser) => setUser(newUser), []);

    const getLocalStorageData = useCallback(() => {
        return JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE));
    }, [])

    const logoutHelper = useCallback(async () => {
        const { token } = getLocalStorageData().user;

        const options = {
            body: JSON.stringify({}),
            headers: {
                "Authorization": token
            },
            method: "PUT"
        };

        await fetch("/api/logout", options);
        return;
    }, [ getLocalStorageData ]);

    const saveUserInfo = useCallback((newUser) => {
        let savedData = getLocalStorageData();
        const defaultUser = newUser ?? user;

        if(defaultUser) {
            document.cookie = `token=${defaultUser.access?.token}`
            savedData = { ...savedData, user: defaultUser.access }
        } else {
            savedData = { ...savedData, defaultUser: {} }
        }

        localStorage.setItem(process.env.LOCAL_STORAGE, JSON.stringify(savedData))
    }, [ getLocalStorageData, user ]);

    const router = useRouter();

    useEffect(() => { 
        if(!isFirstRender.current)
            saveUserInfo(); 

        isFirstRender.current = false;
    }, [ saveUserInfo ]);
    
    useEffect(() => {
        try {
            JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE));
        } catch(e) {
            localStorage.setItem(process.env.LOCAL_STORAGE, JSON.stringify({ user: {} }))
        }
    }, []);

    return (
        <LoginContext.Provider
            value={{ 
                addUser,
                getLocalStorageData,
                isValidatingToken,
                logoutHelper,
                loggedUser,
                saveUserInfo,
                user
            }}>
            { children }
        </LoginContext.Provider>
    );
};

export {
    LoginContext,
    LoginContextProvider
}