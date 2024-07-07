const retrievingRepositories = require("./retrievingRepositories");

const startTasks = () => {
    retrievingRepositories()
}

module.exports = {
    retrievingRepositories,
    startTasks
}