const githubApi = require("../utils/githubApi");

const retrieveRepository = async (req, res) => {
    if (req.query.id) {
        const repData = await githubApi.get(`/repositories/${req.query.id}`);
        res.status(200).json(repData.data);
    } else if (req.query.owner || req.query.repoName) {
        if (!req.query.owner) return res.status(500).send("No owner");
        if (!req.query.repoName) return res.status(500).send("No repoName");
        try {
            const repData = await githubApi.get(`/search/repositories?q=repo:${req.query.owner}/${req.query.repoName}`);
            res.status(200).json(repData.data.items[0]);
        } catch (e) {
            res.status(e.response.status).send(e.response.data.message);
        }

    } else {
        res.send(500);
    }
}

const retrieveRepositories = async (req, res) => {
    try {
        let queryParams = Object.entries(req.query).map(i => i[0] + "=" + i[1]).join('&');
        if (queryParams.length > 0) queryParams = "&" + queryParams
        const repsData = await githubApi.get(`/search/repositories?q=stars:>0&sort=stars&order=desc${queryParams}`);
        res.status(200).json(repsData.data.items);
    } catch (e) {
        res.status(e.response.status).send(e.response.data.message);
    }
}

module.exports = {
    retrieveRepository,
    retrieveRepositories
}