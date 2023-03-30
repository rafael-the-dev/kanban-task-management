
import InputFormatError from "src/models/server/errors/InvalidArgumentError";

export const isValidName = ({ value }) => {
    if(!Boolean(value.trim())) throw new InputFormatError();

    return true;
};