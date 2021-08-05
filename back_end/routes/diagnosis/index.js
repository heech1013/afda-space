const { Sequelize, Diagnosis, DiagnosisData } = require('../../models');

const index = async (req, res, next) => {
  try {
    const contentList = await Diagnosis.findAll({
      attributes: ['id', 'nameKr', 'nameEn', [Sequelize.fn("COUNT", Sequelize.col("diagnosisData.id")), "count"]],
      include: [{
        model: DiagnosisData,
        attributes: []
      }],
      group: ['id', 'nameKr', 'nameEn'],
      order: [[Sequelize.fn("COUNT", Sequelize.col("diagnosisData.id")), 'DESC']]
    })

    return res.status(200).json({ contentList });
  } catch (e) {
    next(e);
  }
}

module.exports = index;