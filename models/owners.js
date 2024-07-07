const {stringCol, boolCol, intCol, floatCol} = require("./common");
const database = require("../utils/database");

const ownerModel = database.define("owners", {
    "id": intCol({primaryKey: true, unique: true}),
    "login": stringCol({allowNull: true}),
    "node_id": stringCol({allowNull: true}),
    "avatar_url": stringCol({allowNull: true}),
    "gravatar_id": stringCol({allowNull: true}),
    "url": stringCol({allowNull: true}),
    "html_url": stringCol({allowNull: true}),
    "followers_url": stringCol({allowNull: true}),
    "following_url": stringCol({allowNull: true}),
    "gists_url": stringCol({allowNull: true}),
    "starred_url": stringCol({allowNull: true}),
    "subscriptions_url": stringCol({allowNull: true}),
    "organizations_url": stringCol({allowNull: true}),
    "repos_url": stringCol({allowNull: true}),
    "events_url": stringCol({allowNull: true}),
    "received_events_url": stringCol({allowNull: true}),
    "type": stringCol({allowNull: true}),
    "site_admin": boolCol(),
    "score": floatCol({allowNull: true})
})

module.exports = ownerModel