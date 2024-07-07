const {stringCol} = require("./common");
const database = require("../utils/database");

const licensesModel = database.define("licenses", {
    "key": stringCol({primaryKey: true, unique: true}),
    "name": stringCol({allowNull: true}),
    "spdx_id": stringCol({allowNull: true}),
    "url": stringCol({allowNull: true}),
    "node_id": stringCol({allowNull: true})
})

module.exports = licensesModel