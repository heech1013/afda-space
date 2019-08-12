const { Sequelize, Medicine, MedicinePurposeData } = require('../../models');

const medicineIndex = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contentMedicineList = await MedicinePurposeData.findAll({
      /* 해당 diagnosis를 purpose로 가지는 purposeData가 한 개도 없는 medicine은 뜨지 않는다.(원래 의도와 부합하는 것 같기도.) */
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