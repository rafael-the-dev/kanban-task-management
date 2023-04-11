import classNames from "classnames";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";

import classes from "src/components/header/styles.module.css"
import LogoImage from "public/images/icons/logo-light.svg";

import Link from "../link";

const Logo = (props) => (
    <Hidden { ...props }>
        <Link 
            className={classNames(classes.logoContainer, 'xl:flex items-center')}
            href="/">
            <LogoImage />
            <Typography
                component="h1"
                className="font-bold hidden ml-3 text-black text-xl xl:inline-block dark:text-white">
                Kanban
            </Typography>
        </Link>
    </Hidden>
);

export default Logo;