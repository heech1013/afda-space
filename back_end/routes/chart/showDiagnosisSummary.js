const { Sequelize, Diagnosis, DiagnosisData, User, Profile } = require('../../models');

const showDiagnosisSummary = async (req, res, next) => {
  try {
    const { diagnosisId } = req.query;
    const { Op } = Sequelize;

    const chartData = {
      nameKr: '',
      count: 0,
      ageArr: [],
      menVal: 0,
      womenVal: 0,
    }

    /** nameKr */
    const nameKr = await Diagnosis.findOne({
      attributes: ['nameKr'],
      where: { id: diagnosisId }
    });

    chartData.nameKr = nameKr

    /** count */
    const count = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: { fkDiagnosisId: diagnosisId }
    });

    chartData.count = count

    /** ageArr
     * '0-19살', '20-29살', '30-30살', '40-49살', '50-59살', '60-69살', '70살 이상'
     */
    const MIN_AGE_LIMIT = 19
    const MAX_AGE_LIMIT = 69
    const AGE_GAP = 10

    const agePromiseArr = []
    const currentYear = new Date().getFullYear();
    let ltBirthYear, gteBirthYear

    for (let age = MIN_AGE_LIMIT; age <= MAX_AGE_LIMIT; age += AGE_GAP) {
      ltBirthYear = new Date((currentYear + 1 - (age - AGE_GAP)).toString())
      gteBirthYear = new Date((currentYear + 1 - age).toString())

      const promise = DiagnosisData.findAndCountAll({
        attributes: ['id'],
        where: {
          fkDiagnosisId: diagnosisId,
        },
        include: [{
          model: User,
          attributes: ['id'],
          required: true,
          include: [{
            model: Profile,
            attributes: ['id'],
            where: {
              birthDate: {
                ...(age !== MIN_AGE_LIMIT && { [Op.lt]: ltBirthYear }),
                ...(age !== MAX_AGE_LIMIT && { [Op.gte]: gteBirthYear }),
              },
            },
          }],
        }],
      })

      agePromiseArr.push(promise)
    }

    chartData.ageArr = (await Promise.all(agePromiseArr)).map(obj => obj.count)

    /** menVal */
    const MAN_NUM = 1

    const menVal = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: { fkDiagnosisId: diagnosisId },
      include: [{
        model: User,
        attributes: ['id'],
        required: true,
        include: [{
          model: Profile,
          attributes: ['id'],
          where: {
            sex: MAN_NUM
          },
        }]
      }]
    })
    
    chartData.menVal = menVal.count

    /** womenVal */
    const WOMEN_NUM = 2

    const womenVal = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: { fkDiagnosisId: diagnosisId },
      include: [{
        model: User,
        attributes: ['id'],
        required: true,
        include: [{
          model: Profile,
          attributes: ['id'],
          where: {
            sex: WOMEN_NUM,
          },
        }]
      }]
    })

    chartData.womenVal = womenVal.count;

    /** diagnosedVal */
    const diagnosedVal = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: {
        fkDiagnosisId: diagnosisId,
        [Op.or]: [
          { 
            firstDiagnosedYear: {
              [Op.ne]: null,
            },
          },
          {
            firstDiagnosedUnknown: {
              [Op.ne]: null,
            },
          },
        ],
      },
    })

    chartData.diagnosedVal = diagnosedVal.count;

    /** undiagnosedVal */
    const undiagnosedVal = await DiagnosisData.findAndCountAll({
      attributes: ['id'],
      where: {
        fkDiagnosisId: diagnosisId,
        firstDiagnosedUnaware: {
          [Op.notIn]: [null, 0]
        },
      },
    })
    
    chartData.undiagnosedVal = undiagnosedVal.count;

    return res.status(200).json({ chartData });
  } catch (e) {
    next(e);
  }
}

module.exports = showDiagnosisSummary;