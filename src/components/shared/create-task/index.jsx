import * as React from "react";

import { AppContext }  from "src/context/AppContext";

import CreateColumn from "src/components/shared/create-column-task";

const CreateColumnDialog = () => {
    const { board } = React.useContext(AppContext);

    return (
        <CreateColumn.Form href={`/api/boards/${board.id}/columns`}>
            <CreateColumn.Content>
                <CreateColumn.NameInput />
            </CreateColumn.Content>
            <div className="flex items-stretch justify-end py-3 px-6">
                <CreateColumn.SubmitButton className="px-8 w-auto" />
            </div>
        </CreateColumn.Form>
    );
};

export default CreateColumnDialog;