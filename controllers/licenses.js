const {retrieveWrapper} = require("./common");
const {licenses} = require("../models");

const retrieveLicenses = retrieveWrapper(licenses);

module.exports = {
    retrieveLicenses
}