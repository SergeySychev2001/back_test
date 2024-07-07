const { trendRepositories } = require("../models");
const { retrievingRepositories } = require("./tasks");
const { retrieveWrapper, deleteWrapper } = require("./common");

const resetRetrievingRepositoriesTask = async (req, res) => {
  try {
    retrievingRepositories();
    res.status(200).send("Синхронизация с GitHub сброшена");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const retrieveTrendRepositories = retrieveWrapper(trendRepositories);
const deleteTrendRepositories = deleteWrapper(trendRepositories, "pKey");

module.exports = {
  resetRetrievingRepositoriesTask,
  retrieveTrendRepositories,
  deleteTrendRepositories,
};
