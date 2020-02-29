const { Sequelize, Diagnosis, DiagnosisData, User, Profile } = require('../../models');

const showDiagnosisSummary = async (req, res, next) => {
  try {
    const { diagnosisId } = req.query;

    let chartData = {};

    const { Op } = Sequelize;

    /** nameKr */
    const val_1 = await Diagnosis.findOne({
      attributes: ['nameKr'],
      where: { id: diagnosisId }
    });

    chartData["nameKr"] = val_1.nameKr;

    /** count */
    const val_2 = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: { fkDiagnosisId: diagnosisId }
    });

    chartData["count"] = val_2.count;

    /** ageArr
     * '0-19살', '20-29살', '30-30살', '40-49살', '50-59살', '60-69살', '70살 이상'
     */
    const currentYear = new Date().getFullYear();
    const birthYear19 = new Date(((currentYear + 1) - 19).toString());
    const birthYear29 = new Date(((currentYear + 1) - 29).toString());
    const birthYear39 = new Date(((currentYear + 1) - 39).toString());
    const birthYear49 = new Date(((currentYear + 1) - 49).toString());
    const birthYear59 = new Date(((currentYear + 1) - 59).toString());
    const birthYear69 = new Date(((currentYear + 1) - 69).toString());

    chartData["ageArr"] = [];

    /** eager loading
     * the use of 'include' only when you are calling 'find' of 'findAll' (근데 findAndCountAll도 되네.)
     */
    const val_3_1 = await DiagnosisData.findAndCountAll({
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

    chartData["ageArr"].push(val_3_1.count);

    const val_3_2 = await DiagnosisData.findAndCountAll({
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
     
    chartData["ageArr"].push(val_3_2.count);

    const val_3_3 = await DiagnosisData.findAndCountAll({
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
     
    chartData["ageArr"].push(val_3_3.count);

    const val_3_4 = await DiagnosisData.findAndCountAll({
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

    chartData["ageArr"].push(val_3_4.count);

    const val_3_5 = await DiagnosisData.findAndCountAll({
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
     
    chartData["ageArr"].push(val_3_5.count);

    const val_3_6 = await DiagnosisData.findAndCountAll({
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
     
    chartData["ageArr"].push(val_3_6.count);

    // ageAtFirstSymptomArr - 생략. 어떻게 해야 할 지 감도 안온다.

    /** menVal */
    const val_4_1 = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: { fkDiagnosisId: diagnosisId },
      include: [{
        model: User,
        attributes: ['id'],
        required: true,  // inner join
        include: [{
          model: Profile,
          attributes: ['id'],
          where: { sex: 1 }
        }]
      }]
    })
    
    chartData["menVal"] = val_4_1.count

    /** womenVal */
    const val_4_2 = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: { fkDiagnosisId: diagnosisId },
      include: [{
        model: User,
        attributes: ['id'],
        required: true,  // inner join
        include: [{
          model: Profile,
          attributes: ['id'],
          where: { sex: 2 }
        }]
      }]
    })

    chartData["womenVal"] = val_4_2.count;

    /** diagnosedVal */
    const val_5_1 = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: {
        fkDiagnosisId: diagnosisId,
        [Op.or]: [
          { firstDiagnosedYear: {[Op.ne]: null}},  // firstDiagnosedYear가 null이 아니거나
          { firstDiagnosedUnknown: {[Op.ne]: null}},  // firstDiagnosedUnknown((진단은 받았지만 진단 받은 날짜를)잘 모르겠습니다)가 null이 아니거나
        ]
      }
    })

    chartData["diagnosedVal"] = val_5_1.count;

    /** undiagnosedVal */
    const val_5_2 = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: {
        fkDiagnosisId: diagnosisId,
        firstDiagnosedUnaware: {[Op.notIn]: [null, 0]}  // firstDiagnosedUnaware(진단을 받은 적은 없지만 가지고 있는 것 같습니다)가 null이나 0(체크했다가 취소한 경우 0이 됨) 아닌 경우
      }
    })
    
    chartData["undiagnosedVal"] = val_5_2.count;

    return res.status(200).json({ chartData });
  } catch (e) {
    next(e);
  }
}

module.exports = showDiagnosisSummary;

/** chartData = 
{
  nameKr,
  count,
  ageArr,
  ageAtFirstSymptomArr,
  menVal, womenVal,
  diagnosedVal, undiagnosedVal
}
 */