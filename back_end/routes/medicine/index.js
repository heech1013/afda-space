const { Sequelize, Medicine, MedicinePurposeData } = require('../../models');

const index = async (req, res, next) => {
  try {
    const contentList = await MedicinePurposeData.findAll({
      attributes: ['fkMedicineId', [Sequelize.fn('COUNT', Sequelize.col('fkMedicineId')), 'count']],
      include: [
        {
          model: Medicine,
          as: 'RegisteredMedicinePurposeData',
          attributes: ['nameKr', 'nameEn']
        }
      ],
      group: ['fkMedicineId']
    })
    return res.status(200).json({ contentList });
  } catch (e) {
    next(e);
  }
}

module.exports = index;