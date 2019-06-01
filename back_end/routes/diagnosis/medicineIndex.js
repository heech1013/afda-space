const { Sequelize, Medicine, MedicinePurposeData } = require('../../models');

const medicineIndex = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contentMedicineList = await MedicinePurposeData.findAll({
      attributes: ['fkMedicineId', [Sequelize.fn('COUNT', Sequelize.col('fkMedicineId')), 'count']],
      where: { fkDiagnosisId: id },
      include: [
        {
          model: Medicine,
          as: 'RegisteredMedicinePurposeData',
          attributes: ['nameKr', 'nameEn']
        }
      ],
      group: ['fkMedicineId']
    });
    
    return res.status(200).json({ contentMedicineList });
  } catch (e) {
    next(e);
  }
}

module.exports = medicineIndex;