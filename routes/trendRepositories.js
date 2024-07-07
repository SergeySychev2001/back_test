const { Router } = require('express');
const route = Router();
const trendRepositories = require("../controllers/trendRepositories");

route.get('/reset-sync', trendRepositories.resetRetrievingRepositoriesTask);
route.get('/', trendRepositories.retrieveTrendRepositories);
route.delete('/', trendRepositories.deleteTrendRepositories);

module.exports = route;