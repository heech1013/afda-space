const { Sequelize, Medicine, MedicineData } = require('../../models');

const index = async (req, res, next) => {
  try {
    const contentList = await Medicine.findAll({
        attributes: ['id', 'nameKr', 'nameEn', [Sequelize.fn("COUNT", Sequelize.col("medicineData.id")), "count"]],
        include: [{
          model: MedicineData,
          attributes: [],
        }],
        group: ['id', 'nameKr', 'nameEn'],
        order: [[Sequelize.fn("COUNT", Sequelize.col("medicineData.id")), 'DESC']]
      });

    return res.status(200).json({ contentList });
  } catch (e) {
    next(e);
  }
}

module.exports = index;