const { apiHandler } = require("src/middlewares/api-handler");

const BoardColumnTask = require("src/models/server/db/BoardColumnTask");

const requestHandler = (req, res, { mongoDbConfig, user }) => {
    const { body, method, query: { columnId, id } } = req;

    switch(method) {
        case "POST": {
            const { description, dueDate, subTasks, title } = JSON.parse(body);
            
            return BoardColumnTask
                .create({ boardId: id, columnId, description, dueDate, subTasks, title }, { mongoDbConfig, user })
                .then(() => res.status(201).send());
        }
        default: {
            throw new Error("Method not supported")
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;