import { useCallback, useEffect, useMemo, useState} from "react"
import Drawer from "@mui/material/Drawer"

const Container = ({ anchor, children, classes, customClose, id, onOpen, onClose }) => {
    const [ open, setOpen ] = useState(false);

    const childrenMemo = useMemo(() => children, [ children ]);

    const openHandler = useCallback(() => setOpen(true), []);
    const closeHandler = useCallback(() => setOpen(false), []);

    useEffect(() => {
        if(onClose) onClose.current = closeHandler;
    }, [ onClose, closeHandler ])

    useEffect(() => {
        if(onOpen) onOpen.current = openHandler;
    }, [ onOpen, openHandler ]);

    return (
        <Drawer
            anchor={ anchor ?? "right" }
            id={id}
            open={open}
            onClose={customClose ?? closeHandler}
            classes={classes}>
            { childrenMemo }
        </Drawer>
    );
};

export default Container;