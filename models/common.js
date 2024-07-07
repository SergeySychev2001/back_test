const {DataTypes} = require('sequelize');

const stringCol = (params) => ({
    type: DataTypes.STRING,
    ...params
})

const boolCol = (params) => ({
    type: DataTypes.BOOLEAN,
    ...params
})

const dateCol = (params) => ({
    type: DataTypes.DATE,
    ...params
})

const intCol = (params) => ({
    type: DataTypes.INTEGER,
    ...params
})

const floatCol = (params) => ({
    type: DataTypes.FLOAT,
    ...params
})

const arrCol = (type, params) => ({
    type: DataTypes.ARRAY(type),
    ...params
})

module.exports = {
    stringCol,
    boolCol,
    dateCol,
    intCol,
    arrCol,
    floatCol
}