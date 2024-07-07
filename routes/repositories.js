const { Router } = require('express');
const route = Router();
const repositories = require("../controllers/repositories");

route.get('/', repositories.retrieveRepositories);
route.post('/', repositories.createRepositories);
route.put('/', repositories.updateRepositories);
route.delete('/', repositories.deleteRepositories);

module.exports = route;
