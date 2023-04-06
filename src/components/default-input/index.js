import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const isDarkMode = theme => theme.palette.mode === "dark";

const Input = styled(TextField)(({ theme }) => ({
    '&': {
        marginBottom: "1rem"
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: 0
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#00748f"
    },
    "& .MuiFormLabel-root": {
        ...( isDarkMode(theme) ? { color: "#FFF" } : {} )
    }
}));

export default Input;