const { apiHandler } = require("src/middlewares/api-handler");

const BoardColumn = require("src/models/server/db/BoardColumn")
const BoardColumnTask = require("src/models/server/db/BoardColumnTask");

const requestHandler = (req, res, { mongoDbConfig, user }) => {
    const { body, method, query: { columnId, id } } = req;

    switch(method) {
        case "DELETE": {
            return BoardColumn.delete({ boardId: id, columnId }, { mongoDbConfig, user })
                .then(() => res.send())
        }
        case "PUT": {
            const { role, source } = JSON.parse(body);

            return BoardColumnTask
                .swap(
                    { 
                        boardId: id, 
                        columnId, 
                        role,
                        source,
                        target: { columnId }
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