const { Sequelize, DiagnosisData, Symptom, SymptomData } = require('../../models');
const userIdArrMaker = require('../../middleware/maker/userIdArrMaker');

const symptomIndex = async (req, res, next) => {
  try {
    const { id } = req.params;

    const diagnosedUserList = await DiagnosisData.findAll({
      attributes: ['id'],
      where: { 'fkDiagnosisId': id }
    });

    const userIdArr = await userIdArrMaker(diagnosedUserList);

    const contentSymptomList = await SymptomData.findAll({
      attributes: ['fkSymptomId', [Sequelize.fn('COUNT', Sequelize.col('fkSymptomId')), 'count']],
      where: {'fkUserId': { [Sequelize.Op.in]: userIdArr }},
      include: [
        {
          model: Symptom,
          as: 'RegisteredSymptomData',
          attributes: ['nameKr']
        }
      ],
      group: ['fkSymptomId']
    });
    
    return res.status(200).json({ contentSymptomList });
  } catch (e) {
    next(e);
  }
};

module.exports = symptomIndex;