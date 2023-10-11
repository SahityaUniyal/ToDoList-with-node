const mongoose = require('mongoose');


const tasksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Task name must be provided']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Tasks', tasksSchema);