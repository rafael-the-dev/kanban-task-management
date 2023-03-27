
import DialogHeader from "src/components/dialog/components/dialog-header";

const Title = ({ children, onClose }) => (
    <DialogHeader
        classes={{ root: classNames("bg-primary-600 capitalize pl-3")}}
        onClose={onClose}>
        { children }
    </DialogHeader>
);

export default Title;