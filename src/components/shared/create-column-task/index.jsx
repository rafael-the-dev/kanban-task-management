import * as React from "react";
import classNames from "classnames";

import classes from "./styles.module.css";

import { AppContext } from "src/context/AppContext";
import { ColumnContextProvider } from "src/context/ColumnContext"

import Dialog from "src/components/dialog";
import DialogHeader from "src/components/dialog/components/dialog-header";

import Columns from "./components/columns";
import Content from "./components/content";
import DeleteButton from "./components/delete-task";
import DueDate from "./components/due-date";
import DescriptionInput from "./components/description-input";
import Form from "./components/form";
import NameInput from "./components/name-input";
import SubmitButton from "./components/submit-button";
import Title from "./components/title";

const CreateBoardContainer = ({ children, columnId, customClose, onOpen, title, taskId }) => {
    const { board, fetchBoards } = React.useContext(AppContext);

    const onClose = React.useRef(null);

    const closeHandler = React.useCallback(() => onClose.current?.(), []);

    const dialogHeaderMemo = React.useMemo(() => (
        <DialogHeader
            classes={{ 
                button: classNames("text-gray-100"),
                root: classNames("bg-primary-700 capitalize opacity-80 pl-3 text-white")
            }}
            onClose={closeHandler}>
            { title }
        </DialogHeader>
    ), [ closeHandler, title ])

    return (
        <Dialog
            classes={{ paper: classNames(classes.paper, `m-0`) }}
            customClose={customClose}
            onClose={onClose}
            onOpen={onOpen}>
            { dialogHeaderMemo }
            <ColumnContextProvider columnId={columnId} taskId={taskId}>
                { children }
            </ColumnContextProvider>
        </Dialog>
    );
};

CreateBoardContainer.Columns = Columns;
CreateBoardContainer.Content = Content;
CreateBoardContainer.DeleteButton = DeleteButton;
CreateBoardContainer.DueDate = DueDate;
CreateBoardContainer.DescriptionInput = DescriptionInput;
CreateBoardContainer.Form = Form;
CreateBoardContainer.Header = Title;
CreateBoardContainer.NameInput = NameInput;
CreateBoardContainer.SubmitButton = SubmitButton;

export default CreateBoardContainer;