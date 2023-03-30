const { apiHandler } = require("src/middlewares/api-handler");

const BoardColumn = require("src/models/server/db/BoardColumn")

const requestHandler = (req, res, { mongoDbConfig, user }) => {
    const { body, method, query: { id }} = req

    switch(method) {
        case "POST": {
            const { title } = JSON.parse(body);

            return BoardColumn.create({ boardId: id, name: title }, { mongoDbConfig, user })
                .then(() => res.status(201).send());
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;