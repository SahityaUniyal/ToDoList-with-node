// Required packages and modules
require('dotenv').config(); // load environment variables from .env file
require('express-async-errors')
const express = require('express');
const app = express();

// database connection module
const connectDB = require('./db/connect');

// Importing Routes
const tasksRouter = require('./routes/tasks');

// MIDDLEWARE
app.use(express.json());
app.use(express.static('public'));

// TASK ROUTES
app.use('/api/v1/tasks', tasksRouter);

// Server Configuration and Database Connection
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        // connect db
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is up and listening on ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();