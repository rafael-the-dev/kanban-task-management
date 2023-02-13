import * as React from "react";

export const useLoading = () => {
    const [ loading, setLoading ] = React.useState(false);

    const preventClickEvent = React.useCallback(() => {
        return;
    }, [])

    React.useEffect(() => {
        if(loading) {
            window.addEventListener("click", preventClickEvent);
        } else {
            window.removeEventListener("click", preventClickEvent);
        }

        return () => {
            window.removeEventListener("click", preventClickEvent);
        }
    }, [ loading, preventClickEvent ])

    return {
        loading, setLoading
    }
};