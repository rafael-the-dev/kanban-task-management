
import Button from "../button";

const ButtonContainer = ({ children, onClick }) => {
    return (
        <Button
            classes={{ button: "bg-primary-200 py-2 shadow-none text-primary-700 w-full hover:bg-primary-600 hover:text-white" }}
            color="primary"
            onClick={onClick}>
            { children }
        </Button>
    )
};

export default ButtonContainer;