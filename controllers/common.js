const {owners, licenses} = require("../models");

const getOwner = async (owner) => {
    return await owners.findOne({where: {id: owner.id}}) || await owners.create(owner)
}

const getLicense = async (license) => {
    return license ? (await licenses.findOne({where: {key: license.key}}) || await licenses.create(license)) : null
}

module.exports = {
    getOwner,
    getLicense
}