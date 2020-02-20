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
        [Sequelize.fn("COUNT", Sequelize.col("DiagnosisData.id")), "count"]
      ],
      include: [{
        model: DiagnosisData,
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
    const birthYear29 = new Date(((currentYear + 1) - 29).toString());
    const birthYear39 = new Date(((currentYear + 1) - 39).toString());
    const birthYear49 = new Date(((currentYear + 1) - 49).toString());
    const birthYear59 = new Date(((currentYear + 1) - 59).toString());
    const birthYear69 = new Date(((currentYear + 1) - 69).toString());

    const val_2_1 = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: { fkDiagnosisId: diagnosisId },
      include: [{
        model: User,
        attributes: ['id'],
        required: true,  // inner join(null인 경우 포함되지 않음, profile의 where과 합쳐져서 where birthDate 조건에 맞지 않는 (profile을 가지는) user는 포함되지 않는다.)
        include: [{
          model: Profile,
          attributes: ['id'],
          where: { birthDate: {  // where clause - 자동으로 'required: true' -> inner join(null인 경우 포함되지 않음)
            [Op.gte]: birthYear19  // <= 19(살) (>= YYYY-01-01)
          }}
        }]
      }]
    });
     
    chartData["ageArr"] = [];
    chartData["ageArr"].push(val_2_1.count);
    console.log(chartData);

    const val_2_2 = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: { fkDiagnosisId: diagnosisId },
      include: [{
        model: User,
        attributes: ['id'],
        required: true,  // inner join(null인 경우 포함되지 않음, profile의 where과 합쳐져서 where birthDate 조건에 맞지 않는 (profile을 가지는) user는 포함되지 않는다.)
        include: [{
          model: Profile,
          attributes: ['id'],
          where: { birthDate: {  // where clause - 자동으로 'required: true' -> inner join(null인 경우 포함되지 않음)
            [Op.lt]: birthYear19,  //  > 19(살) (< YYYY-01-01)
            [Op.gte]: birthYear29  // <= 29(살) (>= YYYY-01-01)
          }}
        }]
      }]
    });
     
    chartData["ageArr"].push(val_2_2.count);
    console.log(chartData);

    const val_2_3 = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: { fkDiagnosisId: diagnosisId },
      include: [{
        model: User,
        attributes: ['id'],
        required: true,  // inner join(null인 경우 포함되지 않음, profile의 where과 합쳐져서 where birthDate 조건에 맞지 않는 (profile을 가지는) user는 포함되지 않는다.)
        include: [{
          model: Profile,
          attributes: ['id'],
          where: { birthDate: {  // where clause - 자동으로 'required: true' -> inner join(null인 경우 포함되지 않음)
            [Op.lt]: birthYear39,  //  > 39(살) (< YYYY-01-01)
            [Op.gte]: birthYear49  // <= 49(살) (>= YYYY-01-01)
          }}
        }]
      }]
    });
     
    chartData["ageArr"].push(val_2_3.count);
    console.log(chartData);

    const val_2_4 = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: { fkDiagnosisId: diagnosisId },
      include: [{
        model: User,
        attributes: ['id'],
        required: true,  // inner join(null인 경우 포함되지 않음, profile의 where과 합쳐져서 where birthDate 조건에 맞지 않는 (profile을 가지는) user는 포함되지 않는다.)
        include: [{
          model: Profile,
          attributes: ['id'],
          where: { birthDate: {  // where clause - 자동으로 'required: true' -> inner join(null인 경우 포함되지 않음)
            [Op.lt]: birthYear49,  //  > 49(살) (< YYYY-01-01)
            [Op.gte]: birthYear59  // <= 59(살) (>= YYYY-01-01)
          }}
        }]
      }]
    });

    chartData["ageArr"].push(val_2_4.count);
    console.log(chartData);

    const val_2_5 = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: { fkDiagnosisId: diagnosisId },
      include: [{
        model: User,
        attributes: ['id'],
        required: true,  // inner join(null인 경우 포함되지 않음, profile의 where과 합쳐져서 where birthDate 조건에 맞지 않는 (profile을 가지는) user는 포함되지 않는다.)
        include: [{
          model: Profile,
          attributes: ['id'],
          where: { birthDate: {  // where clause - 자동으로 'required: true' -> inner join(null인 경우 포함되지 않음)
            [Op.lt]: birthYear59,  //  > 59(살) (< YYYY-01-01)
            [Op.gte]: birthYear69  // <= 69(살) (>= YYYY-01-01)
          }}
        }]
      }]
    });
     
    chartData["ageArr"].push(val_2_5.count);
    console.log(chartData);

    const val_2_6 = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: { fkDiagnosisId: diagnosisId },
      include: [{
        model: User,
        attributes: ['id'],
        required: true,  // inner join(null인 경우 포함되지 않음, profile의 where과 합쳐져서 where birthDate 조건에 맞지 않는 (profile을 가지는) user는 포함되지 않는다.)
        include: [{
          model: Profile,
          attributes: ['id'],
          where: { birthDate: {  // where clause - 자동으로 'required: true' -> inner join(null인 경우 포함되지 않음)
            [Op.lt]: birthYear69  //  > 69(살) (< YYYY-01-01)
          }}
        }]
      }]
    });
     
    chartData["ageArr"].push(val_2_6.count);
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