const { Sequelize, Diagnosis, DiagnosisData } = require('../../models');

const index = async (req, res, next) => {
  try {
    const contentList = await DiagnosisData.findAll({
      attributes: ['fkDiagnosisId', [Sequelize.fn('COUNT', Sequelize.col('fkDiagnosisId')), 'count']],
      include: [
        {
          model: Diagnosis,
          as: 'RegisteredDiagnosisData',
          attributes: ['nameKr', 'nameEn']
        }
      ],
      group: ['fkDiagnosisId']
    });

    return res.status(200).json({ contentList });
  } catch (e) {
    next(e);
  }
}

module.exports = index;