
import CreateTask from "src/components/shared/create-column-task";

const CreateColumn = () => {
    return (
        <CreateTask.Form>
            <CreateTask.Content>
                <CreateTask.NameInput />
                <CreateTask.Columns />
            </CreateTask.Content>
            <CreateTask.SubmitButton />
        </CreateTask.Form>
    );
};

export default CreateColumn;