const { Sequelize, Medicine, MedicinePurposeData, MedicineDosageData, MedicineEvaluationData, MedicineSideEffectsData, ReasonOfStop, Diagnosis, Symptom } = require('../../models');

const showMedicineSummary = async (req, res, next) => {
  try {
    const { medicineId } = req.query;
    const { Op } = Sequelize;

    let chartData = {
      nameKr: '',
      purposeArr: [], effectMajorArr: [], effectModerateArr: [], effectSlightArr: [], effectNoneArr: [], effectCanNotTellArr: [],
      sideEffectArr: [],
      sideEffectRankArr: [], sideEffectRankCountArr: [],
      // dosageArr: [], dosageCountArr: [],
      reasonOfStopArr: [],
      // durationNowCountArr: [],
      // durationExCountArr: [],
      adherenceCountArr: [],
      burdenCountArr: [],
      costCountArr: [],
      switchFromArr: [], switchFromCountArr: [],
      switchToArr: [], switchToCountArr: []
    }

    /** nameKr */
    const val_1 = await Medicine.findOne({ attributes: ['nameKr'], where: { id: medicineId }});
    chartData['nameKr'] = val_1.nameKr;

    /** purpose & perceivedEffectiveness
     * mvp에서는 처방목적을 진단명으로 등록한 경우만 다룬다. 추후 증상에 대한 purpose 차트를 아예 하나 더 파는 방향으로 발전(미정).
     */
    let diagnosisIdArr = [];  // 처방목적으로 등록된 수 기준 내림차순으로 diagnosis의 id만 담기는 배열.

    const val_2 = await MedicinePurposeData.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('fkDiagnosisId')), 'count']],
      where: { fkMedicineId: medicineId },
      include: [{ model: Diagnosis, attributes: ['id', 'nameKr'] }],
      group: ['fkDiagnosisId'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('fkDiagnosisId')), 'DESC']]
    });
    
    for (let i = 0; i < 5; i++) {
      if (!val_2[i]) break;  // (결과 배열 요소가 없을 경우 탈출. 5개 이하일 경우를 대비)
      else {
        chartData["purposeArr"].push(val_2[i].diagnosis.nameKr);
        diagnosisIdArr.push(val_2[i].diagnosis.id);
      }
    }

    /**
     * 뽑히는 수만큼만 자료를 추출해야 한다. 5개 이하로 뽑힐 수 있으므로 추출 개수를 딱 5개로 정해놓으면 안된다. 
     * 함수 정의 시 async를 붙여야만 내부에서 await을 쓸 수 있다(try catch를 꼭 써야 하는 것은 아니다)
     * 즉시 실행 함수 : ( function() {} )()
     * 배열 반복문 for...of는 for each와 다르게 병렬(?)로 처리를 할 수 있게 해준다고 한다.
      비동기 처리(모든 배열에 값을 다 집어 넣은 후에 return)를 위해 도입.
     * for ...of 문이 끝난 직후 즉시실행 함수 내에서 return하지 않기 위해 Promise를 리턴하도록 재구성,
      반복문이 모두 끝난 후 resolve()하며 즉시실행 함수에 await을 붙여 비동기 진행.
    */
    let countVal;

    await (  // Promise를 리턴하는 함수를 즉시 실행 + await 비동기 처리
      () => new Promise(async (resolve, reject) => {
        for(let id of diagnosisIdArr) {
          countVal = await MedicinePurposeData.count({ where: {'fkMedicineId': medicineId, 'perceivedEffectiveness': 5 }});
          chartData["effectMajorArr"].push(countVal);
          countVal = await MedicinePurposeData.count({ where: {'fkMedicineId': id, 'perceivedEffectiveness': 4 }});
          chartData["effectModerateArr"].push(countVal);
          countVal = await MedicinePurposeData.count({ where: {'fkMedicineId': id, 'perceivedEffectiveness': 3 }});
          chartData["effectSlightArr"].push(countVal);
          countVal = await MedicinePurposeData.count({ where: {'fkMedicineId': id, 'perceivedEffectiveness': 2 }});
          chartData["effectNoneArr"].push(countVal);
          countVal = await MedicinePurposeData.count({ where: {'fkMedicineId': id, 'perceivedEffectiveness': 1 }});
          chartData["effectCanNotTellArr"].push(countVal);
        }
        resolve();
      })
    )();

    /** sideEffect */
    const val_3_1 = await MedicineEvaluationData.count({ where: { 'fkMedicineId': medicineId, 'sideEffects': 5 }});
    chartData['sideEffectArr'].push(val_3_1);
    const val_3_2 = await MedicineEvaluationData.count({ where: { 'fkMedicineId': medicineId, 'sideEffects': 4 }});
    chartData['sideEffectArr'].push(val_3_2);
    const val_3_3 = await MedicineEvaluationData.count({ where: { 'fkMedicineId': medicineId, 'sideEffects': 3 }});
    chartData['sideEffectArr'].push(val_3_3);
    const val_3_4 = await MedicineEvaluationData.count({ where: { 'fkMedicineId': medicineId, 'sideEffects': 2 }});
    chartData['sideEffectArr'].push(val_3_4);

    /** sideEffect rank */
    const val_4 = await MedicineSideEffectsData.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('fkSymptomId')), 'count']],
      where: { fkMedicineId: medicineId },
      include: [{ model: Symptom, attributes: ['nameKr'] }],
      group: ['fkSymptomId'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('fkSymptomId')), 'DESC']]
    });

    for (let i = 0; i < 5; i++) {  // val_4 배열의 0 ~ 5번째 요소에 대하여
      if (!val_4[i]) break;  // (결과 배열 요소 개수가 5개 이하일 수 있으므로) 해당 배열 요소가 존재하지 않을 경우 반복문을 탈출.
      else {
        chartData["sideEffectRankArr"].push(val_4[i].symptom.nameKr);
        /* 알 수 없는 이유로 val_4[i].count 로 접근할 시 undefined가 뜸(다른 곳에서도 같은 현상).
          때문에 dataValues(sequelize가 리턴하는 특정 형식의 object 내부로 직접 접근..) */
        chartData["sideEffectRankCountArr"].push(val_4[i].dataValues.count);
      }
    }

    /** dosage : 어떻게 짜야할 지.. 모르겠다. */

    /** reasonOfStop */
    const val_6_1 = await ReasonOfStop.count({ where: { 'fkMedicineId': medicineId, 'noEffect': true }});
    chartData["reasonOfStopArr"].push(val_6_1);
    const val_6_2 = await ReasonOfStop.count({ where: { 'fkMedicineId': medicineId, 'expensive': true }});
    chartData["reasonOfStopArr"].push(val_6_2);
    const val_6_3 = await ReasonOfStop.count({ where: { 'fkMedicineId': medicineId, 'personalResearch': true }});
    chartData["reasonOfStopArr"].push(val_6_3);
    const val_6_4 = await ReasonOfStop.count({ where: { 'fkMedicineId': medicineId, 'doctorAdvice': true }});
    chartData["reasonOfStopArr"].push(val_6_4);
    const val_6_5 = await ReasonOfStop.count({ where: { 'fkMedicineId': medicineId, 'sideEffect': true }});
    chartData["reasonOfStopArr"].push(val_6_5);
    const val_6_6 = await ReasonOfStop.count({ where: { 'fkMedicineId': medicineId, 'courseDone': true }});
    chartData["reasonOfStopArr"].push(val_6_6);
    const val_6_7 = await ReasonOfStop.count({ where: { 'fkMedicineId': medicineId, 'other': true }});
    chartData["reasonOfStopArr"].push(val_6_7);

    /** duration now: 날짜 조작 까다로워서 우선 pass.. */

    /** duration ex: 날짜 조작 까다로워서 우선 pass.. */

    /** adherence */
    const val_9_1 = await MedicineEvaluationData.count({ where: { 'fkMedicineId': medicineId, 'adherence': 5 }});
    chartData["adherenceCountArr"].push(val_9_1);
    const val_9_2 = await MedicineEvaluationData.count({ where: { 'fkMedicineId': medicineId, 'adherence': 4 }});
    chartData["adherenceCountArr"].push(val_9_2);
    const val_9_3 = await MedicineEvaluationData.count({ where: { 'fkMedicineId': medicineId, 'adherence': 3 }});
    chartData["adherenceCountArr"].push(val_9_3);
    const val_9_4 = await MedicineEvaluationData.count({ where: { 'fkMedicineId': medicineId, 'adherence': 2 }});
    chartData["adherenceCountArr"].push(val_9_4);

    /** burden */
    const val_10_1 = await MedicineEvaluationData.count({ where: { 'fkMedicineId': medicineId, 'burden': 5 }});
    chartData["burdenCountArr"].push(val_10_1);
    const val_10_2 = await MedicineEvaluationData.count({ where: { 'fkMedicineId': medicineId, 'burden': 4 }});
    chartData["burdenCountArr"].push(val_10_2);
    const val_10_3 = await MedicineEvaluationData.count({ where: { 'fkMedicineId': medicineId, 'burden': 3 }});
    chartData["burdenCountArr"].push(val_10_3);
    const val_10_4 = await MedicineEvaluationData.count({ where: { 'fkMedicineId': medicineId, 'burden': 2 }});
    chartData["burdenCountArr"].push(val_10_4);

    /** cost */
    const val_11_1 = await MedicineEvaluationData.count({
      where: {
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
    })
    chartData["costCountArr"].push(val_11_1);

    const val_11_2 = await MedicineEvaluationData.count({
      where: {
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
    })
    chartData["costCountArr"].push(val_11_2);

    const val_11_3 = await MedicineEvaluationData.count({
      where: {
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
    })
    chartData["costCountArr"].push(val_11_3);

    const val_11_4 = await MedicineEvaluationData.count({
      where: {
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
    })
    chartData["costCountArr"].push(val_11_4);

    /** switchFrom
     * other medicine(list) -> current medicine
     */
    const switchFromIdArr = [];  // medicine의 id만 따로 담는 배열

    const val_12 = await MedicineDosageData.findAll({
      attributes: ['switchTo', [Sequelize.fn('COUNT', Sequelize.col('switchTo')), 'count']],
      where: { fkMedicineId: medicineId },
      group: ['switchTo'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('switchTo')), 'DESC']]
    });

    for (let i = 0; i < 5; i++) {
      if (!val_12[i].count) break;  // 배열 요소가 5개 이하일 경우를 대비 ( 여기서는 데이터가 없을 때 결과가 []이 아니라 [{"switchTo":null, "count":0}] 으로 출력됨. )
      else {
        chartData['switchFromCountArr'].push(val_12[i].dataValues.count);
        switchFromIdArr.push(val_12[i].dataValues.switchTo);
      }
    }

    let nameVal;

    await (  // Promise를 리턴하는 함수를 즉시 실행 + await 비동기 처리
      () => new Promise(async (resolve, reject) => {
        for(let id of switchFromIdArr) {  // switchFromIdArr에 담긴 만큼(최대 5개) 반복
          nameVal = await Medicine.findOne({ attributes: ['nameKr'], where: { id }});
          chartData['switchFromArr'].push(nameVal.nameKr);
        }
        resolve();
      })
    )();

    /** switchTo
     * current medicine -> other medicine(list)
     */
    const switchToIdArr = [];  // medicine의 id만 따로 담는 배열

    const val_13 = await MedicineDosageData.findAll({
      attributes: ['fkMedicineId', [Sequelize.fn('COUNT', Sequelize.col('fkMedicineId')), 'count']],
      where: { switchTo: medicineId },
      group: ['fkMedicineId'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('fkMedicineId')), 'DESC']]
    });

    for (let i = 0; i < 5; i++) {
      if (!val_13[i]) break;  // 배열 요소가 5개 이하일 경우를 대비
      else {
        chartData['switchToCountArr'].push(val_13[i].dataValues.count);
        switchToIdArr.push(val_13[i].dataValues.fkMedicineId);
      }
    }

    await (  // Promise를 리턴하는 함수를 즉시 실행 + await 비동기 처리
      () => new Promise(async (resolve, reject) => {
        for(let id of switchToIdArr) {  // switchToIdArr에 담긴 만큼(최대 5개) 반복
          nameVal = await Medicine.findOne({ attributes: ['nameKr'], where: { id }});  // nameVal: /* switchTo */ 에서 선언
          chartData['switchToArr'].push(nameVal.nameKr);
        }
        resolve();
      })
    )();

    return res.status(200).json({ chartData });
  } catch (e) {
    next(e);
  }
}

module.exports = showMedicineSummary;