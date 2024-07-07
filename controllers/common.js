const { owners, licenses, repositories } = require("../models");

const getOwner = async (owner) => {
  return owner
    ? (await owners.findOne({ where: { id: owner.id } })) ||
        (await owners.create(owner))
    : null;
};

const getLicense = async (license) => {
  return license
    ? (await licenses.findOne({ where: { key: license.key } })) ||
        (await licenses.create(license))
    : null;
};

const retrieveWrapper = (model) => async (req, res) => {
  try {
    const count = await model.count();
    const items = await model.findAll({
      attributes: req.query.attributes?.split(","),
      limit: req.query.limit || 20,
      offset: req.query.offset,
    });
    res.status(200).json({
      count,
      items,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const deleteWrapper =
  (model, key = "id") =>
  async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        await model.destroy({ where: { [key]: req.body } });
        res.status(200).send(`Репозитории успешно удалены`);
      } else {
        throw new Error("Должен быть массив!");
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

module.exports = {
  getOwner,
  getLicense,
  deleteWrapper,
  retrieveWrapper,
};
