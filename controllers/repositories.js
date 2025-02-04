const { repositories } = require("../models");
const {
  getOwner,
  getLicense,
  deleteWrapper,
  retrieveWrapper,
} = require("./common");

const createRepositories = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const createResponse = {
        created: [],
        exists: [],
      };

      for (let i = 0; i < req.body.length; i++) {
        if (
          await repositories.findOne({
            attributes: ["id"],
            where: { id: req.body[i].id },
          })
        ) {
          createResponse.exists.push(req.body[i].full_name);
        } else {
          await repositories.create({
            ...req.body[i],
            owner: (await getOwner(req.body[i].owner))?.id,
            license: (await getLicense(req.body[i].license))?.key,
          });
          createResponse.created.push(req.body[i].full_name);
        }
      }

      res.status(200).send(`
                Репозитории уже имеются: ${createResponse.exists.join(";")}
                Добавленные репозитории: ${createResponse.created.join(";")}
            `);
    } else {
      throw new Error("Должен быть массив!");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const retrieveRepositories = retrieveWrapper(repositories);

const updateRepositories = async (req, res) => {
  try {
    const updateResponse = {
      updated: [],
      notFound: [],
    };
    if (Array.isArray(req.body)) {
        console.log(req.body)
      for (let i = 0; i < req.body.length; i++) {
        if (
          await repositories.findOne({
            attributes: ["id"],
            where: { id: req.body[i].id },
          })
        ) {
          await repositories.update(
            {
              ...req.body[i],
              owner: (await getOwner(req.body[i].owner))?.id,
              license: (await getLicense(req.body[i].license))?.key,
            },
            { where: { id: req.body[i].id } },
          );
          updateResponse.updated.push(req.body[i].full_name);
        } else {
          updateResponse.notFound.push(req.body[i].full_name);
        }
      }
      res.status(200).send(`
                Репозитории отсутствуют: ${updateResponse.notFound.join(";")}
                Обновленные репозитории: ${updateResponse.updated.join(";")}
            `);
    } else {
      throw new Error("Должен быть массив!");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const deleteRepositories = deleteWrapper(repositories);

module.exports = {
  createRepositories,
  retrieveRepositories,
  updateRepositories,
  deleteRepositories,
};
