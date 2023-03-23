const uuidV4 = require("uuid").v4;

const Error404 = require("../errors/404Error");
const InputFormatError = require("../errors/InvalidArgumentError")

const UserModel = require("./User");

const getBoard = ({ boards, id }) => boards.find(board => board.id === id);
const getBoardColumn = ({ columns, id }) => columns.find(column => column.id === id);

const getIsoDate = (date) => new Date(date ?? Date.now()).toISOString();

const isValidName = ({ value }) => {
    if(!Boolean(value.trim())) throw new InputFormatError();

    return true;
};


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

const validateSubTasks = ({ subTasks }) => {
    const createdAt = getIsoDate();

    const result = subTasks.map(({ id, name }) => {
        isValidName({ value: name }); 

        return {
            createdAt,
            description: name,
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

    static async createTask({ boardId, columnId, description, dueDate, subTasks, title  }, { mongoDbConfig, user }) {
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
        const column = getBoardColumn({ columns: board.columns, id: columnId })
        column.tasks.push(task);

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