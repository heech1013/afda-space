const { Symptom } = require('../../models');

const index = async (req, res, next) => {
  try {
    const contentList = await Symptom.findAll({
      attributes: ['id', 'nameKr']
    });

    return res.status(200).json({ contentList });
  } catch (e) {
    next(e);
  }
}

module.exports = index;