const uuidV4 = require("uuid").v4;

const InputFormatError = require("../errors/InvalidArgumentError")

const UserModel = require("./User");

const getBoard = ({ boards, id }) => boards.find(board => board.id === id);

const getIsoDate = (date) => new Date(date ?? Date.now()).toISOString();

const isValidName = ({ name }) => {
    if(!Boolean(name.trim())) throw new InputFormatError();

    return true;
};


const validateColumns = ({ columns }) => {
    const createdAt = getIsoDate();

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

const validateSubTasks = ({ subTasks }) => {
    const createdAt = getIsoDate();

    const result = subTasks.map(({ id, description }) => {
        isValidName({ description }); 

        return {
            createdAt,
            description,
            finished: false,
            id: id ?? uuidV4(), // column id is optional to be provided by the user
        }
    });

    return result;
};

class Board {

    static async getAll({ filter }, { mongoDbConfig, user: { username } }) {
        const { boards } = await UserModel.get({ username }, { mongoDbConfig });

        return { data: boards };

    }

    static async createTask({ boardId, description, dueDate, subTasks, title,  }, { mongoDbConfig, user }) {
        const { username } = user;

        const userDetails = await UserModel.get({ username }, { mongoDbConfig });

        const validSubTasks = validateSubTasks({ subTasks });

        const task = {
            createdAt: getIsoDate(),
            dueDate, 
            description,
            finished: false,
            subTasks: validSubTasks,
            status: "ACTIVE",
            title
        };

        const board = getBoard({ boards: userDetails.boards, id: boardId });
        board.tasks.push(task);

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
}

module.exports = Board;