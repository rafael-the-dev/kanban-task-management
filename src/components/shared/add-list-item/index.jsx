
import Button from "../button";

const ButtonContainer = ({ children, onClick }) => {
    return (
        <Button
            classes={{ button: `bg-primary-100 capitalize py-2 sm:py-3 shadow-none text-primary-600 w-full 
                hover:bg-primary-600 hover:text-white` }}
            color="default"
            onClick={onClick}>
            { children }
        </Button>
    )
};

export default ButtonContainer;