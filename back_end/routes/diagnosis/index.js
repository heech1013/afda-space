const { Sequelize, Diagnosis, DiagnosisData } = require('../../models');

const index = async (req, res, next) => {
  try {
    /** aggregation with associated model
     * the primary key of the included models must be excluded with 'attributes: []'.
     * the aggregation must be done on the main model.
     * https://stackoverflow.com/questions/28206680/using-group-by-and-joins-in-sequelize
     */
    const contentList = await Diagnosis.findAll({
      attributes: ['id', 'nameKr', 'nameEn', [Sequelize.fn("COUNT", Sequelize.col("RegisteredDiagnosisData.id")), "count"]],
      include: [{
        model: DiagnosisData,
        as: "RegisteredDiagnosisData",
        attributes: []
      }],
      group: ['id', 'nameKr', 'nameEn'],
      order: [[Sequelize.fn("COUNT", Sequelize.col("RegisteredDiagnosisData.id")), 'DESC']]
    })

    return res.status(200).json({ contentList });
  } catch (e) {
    next(e);
  }
}

module.exports = index;