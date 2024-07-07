const {retrieveWrapper} = require("./common");
const {owners} = require("../models");

const retrieveOwners = retrieveWrapper(owners);

module.exports = {
    retrieveOwners
}