const { Router } = require("express");
const route = Router();
const owners = require("../controllers/owners");

route.get("/", owners.retrieveOwners);

module.exports = route;
