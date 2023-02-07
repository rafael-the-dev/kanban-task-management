const { apiHandler } = require("src/middlewares/api-handler")
//const { connection } = require("src/connections/mysql");
const UserModel = require("src/models/server/db/User")

const requestHandler = async (req, res, { mongoDbConfig }) => {

    const { body, method } = req;

    switch(method) {
        case "GET": {
            const result = await UserModel.getAll({}, { mongoDbConfig });

            const users = result
                .filter(user => user.category?.toLowerCase() !== "system")
            res.json(users);
            return;
        }
        case "POST": {
            const { firstName, lastName, password, username } = JSON.parse(body);

            return UserModel.insert(
                {
                    firstName, lastName, password, username
                },
                { mongoDbConfig }
                )
                .then(() => res.status(201).send());
        }
        default: {
            throw new Error("Method not supported.");
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;