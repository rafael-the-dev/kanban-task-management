import Button from "@mui/material/Button";

const DefaultButton = ({ children, disabled }) => (
    <Button 
        className="bg-primary-600 mt-6 opacity-90 py-3 rounded-2xl text-base w-full hover:bg-primary-700 dark:text-white"
        disabled={disabled}
        variant="contained"
        type="submit"
    >
        { children }
    </Button>
);

export default DefaultButton;