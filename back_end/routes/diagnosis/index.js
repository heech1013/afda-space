const { Diagnosis } = require('../../models');

const index = async (req, res, next) => {
  try {
    const contentList = await Diagnosis.findAll({
      attributes: ['id', 'nameKr', 'nameEn']
    });

    return res.status(200).json({ contentList });
  } catch (e) {
    next(e);
  }
}

module.exports = index;