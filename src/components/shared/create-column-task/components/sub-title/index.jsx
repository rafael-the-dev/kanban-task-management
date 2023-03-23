import Typography from "@mui/material/Typography";

const Subtitle = ({ children, component }) => (
    <Typography
        component={ component ?? "legend" }
        className="">
        { children }
    </Typography>
);

export default Subtitle;