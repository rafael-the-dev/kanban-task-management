import * as React from "react";
import { useRouter } from "next/router"

import { navigationList } from "./assets/js/navigation-list";

import ListItem from "./components/list-item";

const Navigation = () => {

    const router = useRouter();
    const { pathname } = router;

    const canIHide = React.useMemo(() => {
        return [ "/dashboard", "/login" ].includes(pathname);
    }, [ pathname ]);

    if(canIHide) return <></>;

    return (
        <nav className="bg-primary-500">
            <ul className="flex overflow-x-auto w-full">
                {
                    navigationList.map(item => (
                        <ListItem 
                            key={item.id}
                            { ...item }
                        />
                    ))
                }
            </ul>
        </nav>
    );
};

export default Navigation;