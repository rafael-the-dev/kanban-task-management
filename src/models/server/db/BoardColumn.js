const uuidV4 = require("uuid").v4;

const { getBoardDetails, isValidName } = require("src/helpers/board")
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

        const { board } = getBoardDetails({ boards: userDetails.boards, id: boardId })

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

    static async delete({ boardId, columnId }, { mongoDbConfig, user }) {
        const { username } = user;

        const userDetails = await UserModel.get({ username }, { mongoDbConfig });

        const { board } = getBoardDetails({ boards: userDetails.boards, id: boardId, columnId });

        board.columns = board.columns.filter(column => column.id !== columnId);

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