const uuidV4 = require("uuid").v4;

const InputFormatError = require("../errors/InvalidArgumentError")

const UserModel = require("./User");

const isValidName = ({ name }) => {
    if(!Boolean(name.trim())) throw new InputFormatError();

    return true;
};

const validateColumns = ({ columns }) => {
    const createdAt = new Date(Date.now()).toISOString();
    
    const result = columns.map(({ id, name }) => {
        isValidName({ name }); // validate column name

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
}

module.exports = Board;