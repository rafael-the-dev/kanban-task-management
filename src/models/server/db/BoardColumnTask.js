const uuidV4 = require("uuid").v4;

const { isValidName } = require("src/helpers/board")
const { getIsoDate } = require("src/helpers/datetime");
const { getBoard, getBoardDetails, getBoardColumn } = require("src/helpers/board");
const { swapTasks } = require("src/helpers/dnd")

const UserModel = require("./User");

const validateSubTasks = ({ subTasks }) => {
    const createdAt = getIsoDate();
    console.log(subTasks)
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

class BoardColumnTask {
    static async create({ boardId, columnId, description, dueDate, subTasks, title  }, { mongoDbConfig, user }) {
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

    static async delete({ boardId, columnId, taskId  }, { mongoDbConfig, user }) {
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

    static async swap({ boardId, columnId, source, taskId  }, { mongoDbConfig, user }) {
        const { username } = user;

        const userDetails = await UserModel.get({ username }, { mongoDbConfig });

        const { board } = getBoardDetails({ boards: userDetails.boards, id: boardId });

        swapTasks({ board, source, target: { columnId, taskId }});

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

    static async update({ boardId, columnId, description, dueDate, finished, source, subTasks, title, taskId  }, { mongoDbConfig, user }) {
        const { username } = user;

        const userDetails = await UserModel.get({ username }, { mongoDbConfig });

        const { task } = getBoardDetails({ boards: userDetails.boards, id: boardId, columnId, taskId: taskId ?? source.taskId });
        
        const validSubTasks = validateSubTasks({ subTasks: subTasks ?? task.subTasks });
        
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
}

module.exports = BoardColumnTask;