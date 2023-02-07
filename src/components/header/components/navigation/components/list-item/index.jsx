import * as React from "react";
import classNames from "classnames";

import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Link from "src/components/shared/link"

const DesktopButton = ({ icon, label, ...rest }) => {

    return (
        <Hidden mdDown>
            <Tooltip 
                title={label}>
                <IconButton
                    { ...rest }>
                    { icon }
                </IconButton>
            </Tooltip>
        </Hidden>
    )
};

const MobileButton = ({ arrowIcon, label, ...rest }) => {

    return (
        <Hidden mdUp>
            <Button
                endIcon={arrowIcon}
                { ...rest }>
                { label }
            </Button>
        </Hidden>
    );
};

const ListItem = ({ href, label, list, ...rest }) => {
    const [ open, setOpen ] = React.useState();

    const arrowIcon = React.useMemo(() => {
        if(!list) return <></>;

        return open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />;
    }, [ list, open ])

    /*const desktopButton = React.useMemo(() => <DesktopButton { ...props } />, [ props ]);
    const mobileButton = React.useMemo(() => <MobileButton { ...props } arrowIcon={arrowIcon} />, [ arrowIcon, props ]);*/

    const button = React.useMemo(() => (
        <Button
            className={classNames("text-white")}
            endIcon={arrowIcon}
            { ...rest }>
            { label }
        </Button>
    ), [ arrowIcon, label, rest ]);

    return (
        <li>
            {
                !href ? button : (
                    <Link href={href}>
                        { button }
                    </Link>
                )
            }
        </li>
    );
};

export default ListItem;