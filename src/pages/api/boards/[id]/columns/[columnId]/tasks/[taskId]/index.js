const { apiHandler } = require("src/middlewares/api-handler");

const BoardModel = require("src/models/server/db/Board")

const requestHandler = (req, res, { mongoDbConfig, user }) => {
    const { body, method, query: { columnId, id, taskId } } = req;

    switch(method) {
        case "DELETE": {
            return BoardModel.deleteTask({ boardId: id, columnId, taskId }, { mongoDbConfig, user })
                .then(() => res.send());
        }
        case "PUT": {
            const { description, dueDate, finished, subTasks, role, source, title, target } = JSON.parse(body);

            return BoardModel
                .updateTask(
                    { 
                        boardId: id, 
                        columnId, 
                        description, dueDate, 
                        finished,
                        role,
                        subTasks, source,
                        title, taskId, target: { columnId, taskId }
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