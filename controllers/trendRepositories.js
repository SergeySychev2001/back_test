const {trendRepositories} = require('../models');
const {retrievingRepositories} = require("./tasks")

const resetRetrievingRepositoriesTask = async (req, res) => {
    try {
        retrievingRepositories();
        res.status(200).send("Синхронизация с GitHub сброшена");
    } catch (e) {
        res.status(500).send(e.message);
    }
}

const retrieveTrendRepositories = async (req, res) => {
    try {
        const count = await trendRepositories.count();
        const items = await trendRepositories.findAll({
            attributes: req.query.attributes?.split(','),
            limit: req.query.limit || 20,
            offset: req.query.offset
        });
        res.status(200).json({
            count,
            items
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
}
const deleteTrendRepositories = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            await trendRepositories.destroy({where: {pKey: req.body}});
            res.status(200).send(`Репозитории успешно удалены`)
        } else {
            throw new Error("Должен быть массив!")
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = {
    resetRetrievingRepositoriesTask,
    retrieveTrendRepositories,
    deleteTrendRepositories
}