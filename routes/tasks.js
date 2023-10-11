const express = require('express');
const router = express.Router();

const {
    getAllTasks,
    createTask,
    deleteTask,
    deleteAllTasks,
    updateTask,
} = require('../controller/tasks');

router.route('/').get(getAllTasks).post(createTask).delete(deleteAllTasks);
router.route('/:id').delete(deleteTask).patch(updateTask);
module.exports = router;