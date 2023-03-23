import { useContext } from "react";

import { ColumnContext } from "src/context/ColumnContext"

import Button from "src/components/shared/button";

const SubmitButton = () => {
    const { loading } = useContext(ColumnContext);

    return (
        <Button
            color="primary"
            classes={{ button: "bg-primary-600 rounded-none w-full sm:py-3 hover:bg-primary-700" }}
            type="submit">
            { loading ? "Loading..." : "Send" }
        </Button>
    );
}

export default SubmitButton;