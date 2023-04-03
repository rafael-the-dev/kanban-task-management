const uuidV4 = require("uuid").v4;

const { isValidName } = require("src/helpers/board")
const { getIsoDate } = require("src/helpers/datetime");

const Error404 = require("../errors/404Error");
const InputFormatError = require("../errors/InvalidArgumentError")

const UserModel = require("./User");

const getBoard = ({ boards, id }) => boards.find(board => board.id === id);
const getBoardColumn = ({ columns, id }) => columns.find(column => column.id === id);

const getBoardDetails = ({ boards, id, columnId, taskId }) => {
    const board = getBoard({ boards, id });
    if(!board) throw new Error404("Board not found");

    let column = null;
    if(columnId) {
        column = getBoardColumn({ columns: board.columns, id: columnId });
        if(!column) throw new Error404("Column not found");
    }

    let task = null;
    if(taskId) {
        task = column.tasks.find(currentTask => currentTask.id === taskId);
        if(!task) throw new Error404("Task not found");
    }

    return {
        board,
        column,
        task
    };
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

    const result = subTasks
        .filter(({ name }) => Boolean(name) && Boolean(name.trim()))
        .map(({ id, name }) => {
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

        let validSubTasks = null;

        if(subTasks && Array.isArray(subTasks) && subTasks.length > 0) {
            validSubTasks = validateSubTasks({ subTasks });
        }

        const task = {
            createdAt: getIsoDate(),
            dueDate, 
            description,
            finished: false,
            id: uuidV4(),
            subTasks: validSubTasks ?? [],
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

    static async deleteTask({ boardId, columnId, taskId  }, { mongoDbConfig, user }) {
        const { username } = user;

        const userDetails = await UserModel.get({ username }, { mongoDbConfig });

        const { column } = getBoardDetails({ boards: userDetails.boards, id: boardId, columnId, taskId });

        column.tasks = column.tasks.filter(task => task.id !== taskId);

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

    static async updateTask({ boardId, columnId, description, dueDate, finished, subTasks, title, taskId  }, { mongoDbConfig, user }) {
        const { username } = user;

        const userDetails = await UserModel.get({ username }, { mongoDbConfig });

        const validSubTasks = validateSubTasks({ subTasks });

        const { task } = getBoardDetails({ boards: userDetails.boards, id: boardId, columnId, taskId })
        
        task.dueDate = dueDate;
        task.description = description;
        task.finished = finished;
        task.subTasks = validSubTasks,
        task.title = title;

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