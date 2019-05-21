const { Medicine } = require('../../models');

const index = async (req, res, next) => {
  try {
    const medicineList = await Medicine.findAll({
      attributes: ['id', 'nameKr', 'nameEn']
    });
    return res.status(200).json({ medicineList });
  } catch (e) {
    next(e);
  }
}

module.exports = index;