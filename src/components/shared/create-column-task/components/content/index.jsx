import classNames from "classnames";

import classes from './styles.module.css';

const Content = ({ children }) => (
    <div className={classNames(classes.content, "grow overflow-y-auto px-5 py-3")}>
        { children }
    </div>
);

export default Content;