const uuidV4 = require("uuid").v4;

const { isValidName } = require("src/helpers/board")
const { getIsoDate } = require("src/helpers/datetime");

const Error404 = require("../errors/404Error");

const UserModel = require("./User");

class BoardColumn {
    static async create({ boardId, name }, { mongoDbConfig, user }) {
        const { username } = user;

        const userDetails = await UserModel.get({ username }, { mongoDbConfig });

        isValidName({ value: name });

        const column = {
            createdAt: getIsoDate(),
            id: uuidV4(),
            name,
            tasks: []
        };

        const board = userDetails.boards.find(board => board.id === boardId);

        if(!board) throw new Error404("Board not found");

        board.columns = [ ...board.columns, column ];

        await UserModel.update(
            { 
                filter: { username },
                key: "boards",
                value: userDetails.boards
            },
            {
                mongoDbConfig
            }
        )
    }
}

module.exports = BoardColumn;