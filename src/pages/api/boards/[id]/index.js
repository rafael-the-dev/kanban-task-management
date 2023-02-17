const { apiHandler } = require("src/middlewares/api-handler");

const BoardModel = require("src/models/server/db/Board")

const requestHandler = (req, res, { mongoDbConfig, user }) => {
    const { method, query: { id } } = req;

    switch(method) {
        case "DELETE": {
            return BoardModel.delete({ id }, { mongoDbConfig, user })
                .then(() => res.send());
        }
        default: {
            throw new Error("Method not supported")
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;