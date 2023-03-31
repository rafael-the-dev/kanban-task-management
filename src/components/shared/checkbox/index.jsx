import classNames from 'classnames';

import classes from "./styles.module.css";

const Checkbox = ({ isChecked }) => {

    return (
        <label 
            className="check-container"
            id="check-container">
            <input 
                className=''
                id="check-input"
                type="checkbox" 
                checked={isChecked}
            />
            <span className="checkmark" id="checkmark"></span>
        </label>
    );
};

export default Checkbox;