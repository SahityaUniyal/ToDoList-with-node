// database model
const Tasks = require('../model/tasks');

// Getting all tasks from Database
const getAllTasks = async (req, res) => {
    const tasks = await Tasks.find();
    res.status(200).json({ tasks });
}

// Creating a task
const createTask = async (req, res) => {
    const task = await Tasks.create(req.body)
    res.status(201).json({ task });
}
// Delete All tasks
const deleteAllTasks = async (req, res) => {
    const task = await Tasks.deleteMany({});
    res.status(200).json({ msg: 'All Tasks Deleted' })
}
// Delete single task
const deleteTask = async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Tasks.findOneAndDelete({ _id: taskID });
    if (!task) {
        throw Error(`No Task with id : ${taskID}`);
    }
    res.status(200).json({ task });
}

// Edit Task
const updateTask = async (req, res) => {
    const { id: taskID } = req.params;
    const updateInfo = req.body;
    const task = await Tasks.findOneAndUpdate({ _id: taskID }, updateInfo, {
        new: true,
        runValidators: true
    });
    if (!task) {
        throw Error(`No task with id ${taskID}`);
    }
    res.status(200).json({ task });
}
module.exports = {
    getAllTasks,
    createTask,
    deleteAllTasks,
    deleteTask,
    updateTask
}