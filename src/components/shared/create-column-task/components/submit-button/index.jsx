import { useContext } from "react";
import classNames from "classnames";

import { ColumnContext } from "src/context/ColumnContext"

import Button from "src/components/shared/button";

const SubmitButton = ({ className }) => {
    const { loading } = useContext(ColumnContext);

    return (
        <Button
            color="primary"
            classes={{ button: classNames("bg-primary-600 rounded-none w-full sm:py-3 hover:bg-primary-700", className) }}
            type="submit">
            { loading ? "Loading..." : "Send" }
        </Button>
    );
}

export default SubmitButton;