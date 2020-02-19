const { Sequelize, Diagnosis, DiagnosisData, User, Profile } = require('../../models');

const showDiagnosisSummary = async (req, res, next) => {
  try {
    const { diagnosisId } = req.body;

    let chartData = {};

    /** transaction */
    const { Op } = Sequelize;

    /** eager loading
     * the use of 'include' only when you are calling 'find' of 'findAll'
     */
    const val_1 = await Diagnosis.findAll({
      where: { id: diagnosisId },
      attributes: [
        'nameKr',
        [Sequelize.fn("COUNT", Sequelize.col("RegisteredDiagnosisData.id")), "count"]
      ],
      include: [{
        model: DiagnosisData,
        as: "RegisteredDiagnosisData",
        attributes: []
      }],
      group: ['nameKr']
    });
    console.log(JSON.stringify(val_1));

    chartData["nameKr"] = val_1[0].nameKr;
    chartData["count"] = val_1[0].count;
    console.log(chartData);

    // '0-19살', '20-29살', '30-30살', '40-49살', '50-59살', '60-69살', '70살 이상'
    const currentYear = new Date().getFullYear();
    const birthYear19 = new Date(((currentYear + 1) - 19).toString());

    const val_2_1 = await DiagnosisData.findAll({
      attributes: [],
      where: { fkDiagnosisId: diagnosisId },
      include: [{
        model: User,
        as: 'RegisteringDiagnosisData',
        // attributes: [],
        include: [{
          model: Profile,
          as: 'Profile',
          // attributes: [],
          where: { birthDate: {
            [Op.lte]: birthYear19  // <= 19(살)
          }},
          required: false
        }]
      }]
    });
    console.log(JSON.stringify(val_2_1));
    
    chartData["ageArr"] = [];
    chartData["ageArr"].push(val_2_1[0].count);
    console.log(chartData);


    return res.status(200).json({ chartData });
  } catch (e) {
    next(e);
  }
}

module.exports = showDiagnosisSummary;

/** chartData = 
{
  nameKr,  // Diagnosis.nameKr
  count,  // Diagnosis(where: diagnosisId) -> count(DiagnosisData)
  ageArr,  // Diagnosis -> DiagnosisData -> User -> Profile.birthDate
  ageAtFirstSymptomArr,  // Diagnosis -> DiagnosisData.firstNoticeYear & Profile.birthDate
  menVal, womenVal,  // Diagnosis -> DiagnosisData -> User -> Profile.sex
  diagnosedVal, undiagnosedVal  // Diagnosis -> DiagnosisData.diagnosedSomething..
}
 */