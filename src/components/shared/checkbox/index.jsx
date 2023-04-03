import classNames from 'classnames';

import classes from "./styles.module.css";

const Checkbox = ({ value, ...rest }) => {

    return (
        <label 
            className="check-container"
            id="check-container">
            <input 
                className=''
                checked={value}
                id="check-input"
                type="checkbox"
                { ...rest }
            />
            <span className="checkmark" id="checkmark"></span>
        </label>
    );
};

export default Checkbox;