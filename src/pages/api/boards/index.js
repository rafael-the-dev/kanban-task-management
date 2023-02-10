const { apiHandler } = require("src/middlewares/api-handler");

const requestHandler = (req, res, { mongoDbConfig, user }) => {
    const {method } = req;

    switch(method) {
        case "POST": {
            const { body } = req;
            const { columns, name } = JSON.parse(body);

            return BoardModel.insert({ columns, name }, { mongoDbConfig, user })
                .then(() => res.status(201).send())
        }
        default: {
            throw new Error("Method not supported")
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;