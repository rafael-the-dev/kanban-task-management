import * as React from "react";
import classNames from "classnames";
import Hidden from "@mui/material/Hidden";
import { useRouter } from "next/router"

import classes from "./styles.module.css";

import ContextProvider from "./components/context-provider";
import Header from "../header";
//import Footer from "../footer";
import Loading from "./components/loading";
import Menu from "../menu";
import TokenDialog from "./components/TokenDialog"

const LayoutContainer = ({ children }) => {
    const [ loading, setLoading ] = React.useState(true);
    const isFirstRender = React.useRef(true);

    const { pathname } = useRouter();

    const tokenDialogMemo = React.useMemo(() => <TokenDialog />, [])

    if(loading) return <Loading loading={loading} setLoading={setLoading} />;

    return (
        <div className={classNames(classes.root, `h-screen items-stretch xl:flex`)}>
            <Hidden xlDown>
                <Menu />
            </Hidden>
            <div className={classNames("grow h-full overflow-y-auto",
                [ "/sign-up", "/login" ].includes(pathname) ? "w-full" : classes.main,
                { "flex flex-col h-full items-stretch": pathname === "/sale" })}>
                    <Header />
                    <ContextProvider>
                        { children }
                    </ContextProvider>
            </div>
            { tokenDialogMemo }
        </div>
    );
};


export default LayoutContainer;