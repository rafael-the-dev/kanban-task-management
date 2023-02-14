import Button from "@mui/material/Button";
import classNames from "classnames";

import Link from "../link";

const ButtonContainer = ({ children, color, classes, href, variant, ...rest }) => {
    const defaultColor = color ?? "default";
    const defaultVariant = variant ?? "contained";
    
    const variants = {
        contained: `bg-${defaultColor}-600 text-white hover:bg-${defaultColor}-700`,
        outlined: `border border-solid border-${defaultColor}-700 text-${defaultColor}-700 hover:bg-${defaultColor}-900 hover:border-${defaultColor}-700 hover:text-white`
    };
    
    const button = (
        <Button
            className={classNames("py-2", variants[defaultVariant], classes?.button)}
            variant={defaultVariant}
            { ...rest }>
            { children }
        </Button>
    );

    return href ? <Link className={classes?.link} href={href}>{ button }</Link> : button;
};

export default ButtonContainer;