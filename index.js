const express = require('express');
const database = require('./utils/database');
const {repositories, github, trendRepositories} = require('./routes');
const {startTasks} = require("./controllers/tasks");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/github', github);
app.use('/api/repositories', repositories);
app.use('/api/trend-repositories', trendRepositories);

startTasks()

const start = async () => {
    try {
        await database.sync();
        app.listen(PORT, () => {
            console.log(`${PORT} listening at http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();