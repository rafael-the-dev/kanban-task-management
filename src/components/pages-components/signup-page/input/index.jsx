import * as React from "react";
import classNames from "classnames"
import Typography from "@mui/material/Typography";
import { v4 as uuuidV4 } from "uuid";

import classes from "./styles.module.css";

import { SignUpContext } from "src/context"

import Input from 'src/components/Input';

const DefaultInput = React.forwardRef((props, ref) => {
    //const [ value, setValue ] = React.useState('');

    //const {  } = React.useContext(SignUpContext);

    const { errors, onChange, ...rest  } = props;
    const hasErrors = () => Boolean(errors.length);

    const changeHandler = React.useCallback(e => {
        const currentValue = e.target.value;
        onChange(currentValue);
    }, [ onChange ]);

    return (
        <div className="mb-4">
            <Input 
                { ...rest }
                className={classNames(classes.input, "border-solid rounded-lg w-full", 
                hasErrors() ? "border-red-600" : "border-blue-800 dark:border-stone-500" )}
                error={hasErrors()}
                fullWidth
                onChange={changeHandler}
                ref={ref}
                required
            />
            { hasErrors() && (
                <ul className="mt-2 pl-3">
                    {
                        errors.map((item) => (
                            <Typography 
                                className="mb-1 text-red-600 text-xs last:mb-0" 
                                key={uuuidV4()}>
                                * { item.message }
                            </Typography>
                        ))
                    }
                </ul>
            )}
        </div>
    );
});

DefaultInput.displayName = "Input";

export default DefaultInput;