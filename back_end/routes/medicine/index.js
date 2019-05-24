const { Medicine } = require('../../models');

const index = async (req, res, next) => {
  try {
    const contentList = await Medicine.findAll({
      attributes: ['id', 'nameKr', 'nameEn']
    });
    return res.status(200).json({ contentList });
  } catch (e) {
    next(e);
  }
}

module.exports = index;