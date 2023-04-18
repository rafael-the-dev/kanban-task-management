const uuidV4 = require("uuid").v4;

const { isValidName } = require("src/helpers/board")
const { getIsoDate } = require("src/helpers/datetime");

const Error404 = require("../errors/404Error");

const UserModel = require("./User");

const validateColumns = ({ columns }) => {
    const createdAt = getIsoDate();

    const result = columns.map(({ id, name }) => {
        isValidName({ value: name }); // validate column name

        return {
            createdAt,
            id: id ?? uuidV4(), // column id is optional to be provided by the user
            name,
            tasks: []
        }
    });

    return result;
};

class Board {

    static async getAll({ filter }, { mongoDbConfig, user: { username } }) {
        const { boards } = await UserModel.get({ username }, { mongoDbConfig });

        return { data: boards };

    }

    static async delete({ id }, { mongoDbConfig, user }) {
        const { username } = user;

        const userDetails = await UserModel.get({ username }, { mongoDbConfig });

        const boards =  userDetails.boards.filter(board => board.id !== id);      

        await UserModel.update(
            { 
                filter: { username },
                key: "boards",
                value: boards
            },
            {
                mongoDbConfig
            }
        )
    }

    static async insert({ columns, name }, { mongoDbConfig, user }) {
        const { username } = user;

        const userDetails = await UserModel.get({ username }, { mongoDbConfig });

        columns = validateColumns({ columns });

        const board = {
            columns,
            id: uuidV4(),
            name
        };

        const boards = [ ...userDetails.boards, board ]; //concat old boards with new one

        await UserModel.update(
            { 
                filter: { username },
                key: "boards",
                value: boards
            },
            {
                mongoDbConfig
            }
        )
    }

    static async update({ columns, id, name }, { mongoDbConfig, user }) {
        const { username } = user;

        const userDetails = await UserModel.get({ username }, { mongoDbConfig });

        const board =  userDetails.boards.find(board => board.id === id);

        if(!board) throw new Error404(`Board not found`);

        board.name = name;

        // get all new columns
        let newColumns = columns.filter(column => {
            return !Boolean(board.columns.find(item => item.id === column.id));
        });

        // validate new columns
        newColumns = validateColumns({ columns: newColumns });

        const updatedOldColumns = columns.map(column => {
            const boardColumn = board.columns.find(item => item.id === column.id);

            if(!boardColumn) return [];

            return {
                ...boardColumn,
                ...column
            }
        }).flatMap(column => column);

        board.columns = [ ...updatedOldColumns, ...newColumns ]

        await UserModel.update(
            { 
                filter: { username },
                userObj: userDetails
            },
            {
                mongoDbConfig
            }
        )
    }
}

module.exports = Board;