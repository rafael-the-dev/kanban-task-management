const { apiHandler } = require("src/middlewares/api-handler");

const BoardColumnTask = require("src/models/server/db/BoardColumnTask");

const requestHandler = (req, res, { mongoDbConfig, user }) => {
    const { body, method, query: { columnId, id, taskId } } = req;

    switch(method) {
        case "DELETE": {
            return BoardColumnTask
                .delete({ boardId: id, columnId, taskId }, { mongoDbConfig, user })
                .then(() => res.send());
        }
        case "PUT": {
            const { description, dueDate, finished, subTasks, role, source, title } = JSON.parse(body);

            return BoardColumnTask
                .update(
                    { 
                        boardId: id, 
                        columnId, 
                        description, dueDate, 
                        finished,
                        role,
                        subTasks, source,
                        title, taskId
                    }, 
                    { mongoDbConfig, user }
                )
                .then(() => res.send());
        }
        default: {
            throw new Error("Method not supported")
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;