const { Router } = require('express');
const route = Router();
const licenses = require("../controllers/licenses");

route.get('/', licenses.retrieveLicenses);

module.exports = route;
