import classNames from "classnames";
import Typography from "@mui/material/Typography";

import classes from "../styles.module.css";

const CardTitle = ({ children  }) => (
    <Typography
        component="h3"
        className={classNames(classes.title, "font-semibold overflow-hidden text-ellipsis")}>
        { children }
    </Typography>
);

export default CardTitle;