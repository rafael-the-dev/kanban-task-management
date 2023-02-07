import { useRouter } from "next/router"

import { SignUpContextProvider } from "src/context"

const ContextProvider = ({ children }) => {
    const { pathname } = useRouter();

    const getProvider = () => {
        return {
            "/sign-up": <SignUpContextProvider>{ children }</SignUpContextProvider>
        }[pathname]
    };

    
    return (
        <>{ getProvider() ?? children }</>
    );
};

export default ContextProvider;