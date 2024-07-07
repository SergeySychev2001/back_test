const githubApi = require("../../utils/githubApi");
const { trendRepositories } = require("../../models");
const { getOwner, getLicense } = require("../common");

const MINUTES_AGO = 0.5;

const retrievingRepositories = () => {
  const func = async () => {
    try {
      const dateRange = new Date(
        new Date() - MINUTES_AGO * 60000,
      ).toISOString();

      const reps = await githubApi.get(
        `/search/repositories?q=created:>${dateRange}&sort=stars&order=desc&per_page=5`,
      );

      const repsItems = [];
      for (let i = 0; i < reps.data.items.length; i++) {
        repsItems.push({
          ...reps.data.items[i],
          owner: (await getOwner(reps.data.items[i].owner))?.id,
          license: (await getLicense(reps.data.items[i].license))?.key,
        });
      }

      await trendRepositories.bulkCreate(repsItems);
    } catch (e) {
      console.log(e.message);
    }
  };

  let timeout;

  const start = async () => {
    clearTimeout(timeout);
    await func();
    timeout = setTimeout(() => start(), MINUTES_AGO * 60000);
  };

  return start;
};

module.exports = retrievingRepositories();
