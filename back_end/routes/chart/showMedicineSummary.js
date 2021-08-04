const { 
  Sequelize,
  Medicine,
  MedicinePurposeData,
  MedicineDosageData,
  MedicineEvaluationData,
  MedicineSideEffectsData,
  ReasonOfStop,
  Diagnosis,
  Symptom
} = require('../../models')
const Cache = require('../../middleware/implementation/cacheConstructor');
const format = require('date-fns/format');

const showMedicineSummary = async (req, res, next) => {
  try {
    const { medicineId } = req.query;

    /** caching */
    const cacheKey = `${medicineId}_${format(new Date(), 'yyyymmdd')}`
    const cachedData = Cache.getItem(cacheKey);
    
    if (cachedData) {
      return res.status(200).json({ chartData: cachedData });
    }

    const { Op } = Sequelize;

    let chartData = {
      /** name(kr) */
      nameKr: '',
      
      /** purpose */
      purposeArr: [],
      
      /** perceived effectiveness */
      effectMajorArr: [],
      effectModerateArr: [],
      effectSlightArr: [],
      effectNoneArr: [],
      effectCanNotTellArr: [],
      
      /** side effect */
      sideEffectArr: [],

      /** side effect ranking */
      sideEffectRankArr: [],
      sideEffectRankCountArr: [],

      /** reasons of stop */
      reasonOfStopArr: [],

      /** adherence */
      adherenceCountArr: [],

      /** burden */
      burdenCountArr: [],

      /** cost */
      costCountArr: [],

      /** switching medicine history */
      switchFromArr: [],
      switchFromCountArr: [],

      switchToArr: [],
      switchToCountArr: [],
    }

    /** nameKr */
    const { nameKr } = await Medicine.findOne({
      attributes: ['nameKr'],
      where: {
        id: medicineId,
      },
    })

    chartData.nameKr = nameKr

    /** purpose */
    const descMedicinePurposeData = await MedicinePurposeData.findAll({
      attributes: [[
        Sequelize.fn('COUNT', Sequelize.col('fkDiagnosisId')), 
        'count',
      ]],
      where: {
        fkMedicineId: medicineId
      },
      include: [
        {
          model: Diagnosis,
          attributes: ['id', 'nameKr']
        },
        { 
          model: Symptom,
          attributes: ['id', 'nameKr']
        },
      ],
      group: [
        'fkDiagnosisId'
      ],
      order: [[
        Sequelize.fn('COUNT', Sequelize.col('fkDiagnosisId')),
        'DESC',
      ]],
    });
    
    chartData.purposeArr = descMedicinePurposeData.slice(0, 5).map(obj => {
      const { nameKr: diagnosisNameKr } = obj.diagnosis
      const { nameKr: symptomNameKr } = obj.symptom

      return diagnosisNameKr
        ? diagnosisNameKr
        : symptomNameKr
    })

    /** perceivedEffectiveness */
    const effectCountPromiseArr = []
    
    descMedicinePurposeData.slice(0, 5).forEach(obj => {
      effectCountPromiseArr.push(
        MedicinePurposeData.count({
          where: {
            'fkMedicineId': medicineId,
            'perceivedEffectiveness': 5,
            'fkDiagnosisId': obj.diagnosisId,
            'fkSymptomId': obj.symptomId,
          },
        }),
        MedicinePurposeData.count({
          where: {
            'fkMedicineId': medicineId,
            'perceivedEffectiveness': 4,
            'fkDiagnosisId': obj.diagnosisId,
            'fkSymptomId': obj.symptomId,
          },
        }),
        MedicinePurposeData.count({
          where: {
            'fkMedicineId': medicineId,
            'perceivedEffectiveness': 3,
            'fkDiagnosisId': obj.diagnosisId,
            'fkSymptomId': obj.symptomId,
          },
        }),
        MedicinePurposeData.count({
          where: {
            'fkMedicineId': medicineId,
            'perceivedEffectiveness': 2,
            'fkDiagnosisId': obj.diagnosisId,
            'fkSymptomId': obj.symptomId,
          },
        }),
        MedicinePurposeData.count({
          where: {
            'fkMedicineId': medicineId,
            'perceivedEffectiveness': 1,
            'fkDiagnosisId': obj.diagnosisId,
            'fkSymptomId': obj.symptomId,
          },
        }),
      )
    })
    
    const effectCountResultArr = await Promise.all(effectCountPromiseArr)

    for (let i = 0; i < (effectCountResultArr.length / 5); i++) {
      chartData.effectMajorArr.push(effectCountResultArr[i])
      chartData.effectModerateArr.push(effectCountResultArr[i+1])
      chartData.effectSlightArr.push(effectCountResultArr[i+2])
      chartData.effectNoneArr.push(effectCountResultArr[i+3])
      chartData.effectCanNotTellArr.push(effectCountResultArr[i+4])
    }

    /** sideEffect */
    const sideEffectPromiseArr = [
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          'sideEffects': 5 
        },
      }),
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          'sideEffects': 4 
        }
      }),
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          'sideEffects': 3 
        }
      }),
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          'sideEffects': 2 
        }
      }),
    ]

    chartData.sideEffectArr = await Promise.all(sideEffectPromiseArr)

    /** sideEffect rank */
    const medicineSideEffectsData = await MedicineSideEffectsData.findAll({
      attributes: [[
        Sequelize.fn('COUNT', Sequelize.col('fkSymptomId')),
        'count'
      ]],
      where: {
        fkMedicineId: medicineId
      },
      include: [{
        model: Symptom,
        attributes: ['nameKr']
      }],
      group: [
        'fkSymptomId',
      ],
      order: [[
        Sequelize.fn('COUNT', Sequelize.col('fkSymptomId')),
        'DESC',
      ]],
    });

    chartData.sideEffectRankArr = medicineSideEffectsData.slice(0, 5).map(obj => obj.symptom.nameKr)
    chartData.sideEffectRankCountArr = medicineSideEffectsData.slice(0, 5).map(obj => obj.dataValues.count)

    /** reasonOfStop */
    const reasonOfStopPromiseArr = [
      ReasonOfStop.count({
        where: {
          'fkMedicineId': medicineId,
          'noEffect': true
        },
      }),
      ReasonOfStop.count({
        where: {
          'fkMedicineId': medicineId,
          'expensive': true
        },
      }),
      ReasonOfStop.count({
        where: {
          'fkMedicineId': medicineId,
          'personalResearch': true
        },
      }),
      ReasonOfStop.count({
        where: {
          'fkMedicineId': medicineId,
          'doctorAdvice': true
        },
      }),
      ReasonOfStop.count({
        where: {
          'fkMedicineId': medicineId,
          'sideEffect': true
        },
      }),
      ReasonOfStop.count({
        where: {
          'fkMedicineId': medicineId,
          'courseDone': true
        },
      }),
      ReasonOfStop.count({
        where: {
          'fkMedicineId': medicineId,
          'other': true
        },
      }),
    ]

    chartData.reasonOfStopArr = await Promise.all(reasonOfStopPromiseArr)

    /** adherence */
    const adherenceCountPromiseArr = [
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          'adherence': 5
        },
      }),
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          'adherence': 4
        },
      }),
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          'adherence': 3
        },
      }),
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          'adherence': 2
        },
      }),
    ]

    chartData.adherenceCountArr = await Promise.all(adherenceCountPromiseArr)

    /** burden */
    const burdenCountPromiseArr = [
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          'burden': 5
        },
      }),
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          'burden': 4
        },
      }),
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          'burden': 3
        },
      }),
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          'burden': 2
        },
      }),
    ]

    chartData.burdenCountArr = await Promise.all(burdenCountPromiseArr)

    /** cost */
    const costCountPromiseArr = [
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          [Op.or]: [
            {[Op.and]: [
              { 'costDateUnit': 1 },  // monthly
              { 'cost': { [Op.gte]: 100000 }}
            ]},
            {[Op.and]: [
              { 'costDateUnit': 2 },  // weekly
              { 'cost': { [Op.gte]: 50000 }}
            ]}
          ]
        }
      }),
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          [Op.or]: [
            {[Op.and]: [
              { 'costDateUnit': 1 },  // monthly
              { 'cost': { [Op.between]: [50000, 99999] }}
            ]},
            {[Op.and]: [
              { 'costDateUnit': 2 },  // weekly
              { 'cost': { [Op.between]: [12500, 24999] }}
            ]}
          ]
        }
      }),
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          [Op.or]: [
            {[Op.and]: [
              { 'costDateUnit': 1 },  // monthly
              { 'cost': { [Op.between]: [20000, 49999] }}
            ]},
            {[Op.and]: [
              { 'costDateUnit': 2 },  // weekly
              { 'cost': { [Op.between]: [5000, 12499] }}
            ]}
          ]
        }
      }),
      MedicineEvaluationData.count({
        where: {
          'fkMedicineId': medicineId,
          [Op.or]: [
            {[Op.and]: [
              { 'costDateUnit': 1 },  // monthly
              { 'cost': { [Op.lte]: 19999 }}
            ]},
            {[Op.and]: [
              { 'costDateUnit': 2 },  // weekly
              { 'cost': { [Op.lte]: 4999 }}
            ]}
          ]
        }
      }),
    ]

    chartData.costCountArr = await Promise.all(costCountPromiseArr)

    /** switchFrom */
    const medicineSwitchFromData = await MedicineDosageData.findAll({
      attributes: [
        'switchTo',
        [
          Sequelize.fn('COUNT', Sequelize.col('switchTo')),
          'count',
        ],
      ],
      where: {
        fkMedicineId: medicineId,
        switchTo: {
          [Op.ne]: null,
        },
      },
      group: ['switchTo'],
      order: [[
        Sequelize.fn('COUNT', Sequelize.col('switchTo')),
        'DESC',
      ]],
    })

    chartData.switchFromCountArr = medicineSwitchFromData.slice(0, 5).map(obj => obj.dataValues.count)

    const switchFromPromiseArr = medicineSwitchFromData.slice(0, 5).map(obj => (
      Medicine.findOne({
        attributes: ['nameKr'],
        where: {
          id: obj.dataValues.switchTo,
        },
      })
    ))

    chartData.switchFromArr = (await Promise.all(switchFromPromiseArr)).map(obj => obj.nameKr)

    /** switchTo */
    const medicineSwitchToData = await MedicineDosageData.findAll({
      attributes: [
        'fkMedicineId',
        [
          Sequelize.fn('COUNT', Sequelize.col('fkMedicineId')),
          'count',
        ],
      ],
      where: {
        switchTo: medicineId
      },  // '바꾸기 전 원래 복용하던 처방약이 무엇인가요?'
      group: [
        'fkMedicineId',
      ],
      order: [[
        Sequelize.fn('COUNT', Sequelize.col('fkMedicineId')),
        'DESC',
      ]],
    })

    chartData.switchToCountArr = medicineSwitchToData.slice(0, 5).map(obj => obj.dataValues.count)

    const switchToPromiseArr = medicineSwitchToData.slice(0, 5).map(obj => (
      Medicine.findOne({
        attributes: ['nameKr'],
        where: {
          id: obj.dataValues.fkMedicineId,
        },
      })
    ))

    chartData.switchToArr = (await Promise.all(switchToPromiseArr)).map(obj => obj.nameKr)

    /** new cache */
    Cache.setItem(cacheKey, chartData);

    return res.status(200).json({ chartData });
  } catch (e) {
    next(e);
  }
}

module.exports = showMedicineSummary;