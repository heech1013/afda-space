const { Sequelize, Medicine, MedicinePurposeData } = require('../../models');

const medicineIndex = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contentMedicineList = await Medicine.findAll({
      attributes: ['id', 'nameKr', 'nameEn', [Sequelize.fn("COUNT", Sequelize.col("RegisteredMedicinePurposeData.id")), "count"]],
      include: [{
        model: MedicinePurposeData,
        as: "RegisteredMedicinePurposeData",
        attributes: [],
        where: { fkDiagnosisId: id },
        required: false  // LEFT OUTER JOIN (등록된 purpose data가 없는 medicine도 포함하여 조회한다.)
      }],
      group: ['id', 'nameKr', 'nameEn'],
      order: [[Sequelize.fn("COUNT", Sequelize.col("RegisteredMedicinePurposeData.id")), "DESC"]]
    });
    
    return res.status(200).json({ contentMedicineList });
  } catch (e) {
    next(e);
  }
}

module.exports = medicineIndex;