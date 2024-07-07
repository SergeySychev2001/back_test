const { Router } = require('express');
const route = Router();
const repositories = require("../controllers/github");

route.get('/retrieve-repository', repositories.retrieveRepository);
route.get('/retrieve-repositories', repositories.retrieveRepositories);

module.exports = route;
