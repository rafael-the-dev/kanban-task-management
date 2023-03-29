const { apiHandler } = require("src/middlewares/api-handler");

const BoardModel = require("src/models/server/db/Board")

const requestHandler = (req, res, { mongoDbConfig, user }) => {
    const { body, method, query: { columnId, id } } = req;

    switch(method) {
        case "DELETE": {
            return BoardModel.deleteTask({ boardId: id, columnId }, { mongoDbConfig, user })
                .then(() => res.send());
        }
        case "PUT": {
            const { role, source, title } = JSON.parse(body);

            return BoardModel
                .updateTask(
                    { 
                        boardId: id, 
                        columnId, 
                        role,
                        source,
                        title, target: { columnId }
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