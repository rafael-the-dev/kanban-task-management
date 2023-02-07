import classNames from "classnames";

import classes from "./styles.module.css";

const Main = ({ children, className }) => (
    <main className={classNames(classes.main, className, "px-5 w-full xl:px-6")}>
        { children }
    </main>
);

export default Main;