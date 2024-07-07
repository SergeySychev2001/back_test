const {Sequelize} = require('sequelize');
const databaseConfig = require('../config/database');

const database = new Sequelize({
    database: databaseConfig.database,
    username: databaseConfig.user,
    password: databaseConfig.password,
    host: databaseConfig.host,
    dialect: 'postgres',
    port: databaseConfig.port,
});

module.exports = database;