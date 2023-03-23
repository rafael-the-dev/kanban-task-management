import classNames from "classnames";
import Typography from "@mui/material/Typography";

import classes from "../styles.module.css";

const CardDescription = ({ children }) => (
    children ? <div>
        <Typography
            component="p"
            className={classNames(classes.description, `font-normal mt-2 text-sm leading-6
                overflow-hidden text-ellipsis`)}>
            { children }
        </Typography>
    </div>: <></> 
);

export default CardDescription;