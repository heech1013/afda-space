const { Sequelize, DiagnosisData, Symptom, SymptomData } = require('../../models');

const symptomIndex = async (req, res, next) => {
  try {
    const { id } = req.params;

    const diagnosedUserList = await DiagnosisData.findAll({
      attributes: ['fkUserId'],
      where: { 'fkDiagnosisId': id }
    });

    const userIdArr = diagnosedUserList.map(user => user.fkUserId)

    const contentSymptomList = await Symptom.findAll({
      attributes: ['id', 'nameKr', [Sequelize.fn("COUNT", Sequelize.col("symptomData.id")), "count"]],
      include: [{
        model: SymptomData,
        attributes: [],
        where: { 'fkUserId': { [Sequelize.Op.in]: userIdArr }},
        required: false
      }],
      group: ['id', 'nameKr'],
      order: [[Sequelize.fn("COUNT", Sequelize.col("symptomData.id")), "DESC"]]
    });
    
    return res.status(200).json({ contentSymptomList });
  } catch (e) {
    next(e);
  }
};

module.exports = symptomIndex;