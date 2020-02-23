const { Sequelize, Diagnosis, Medicine, MedicinePurposeData, MedicineEvaluationData } = require('../../models');

const showDiagnosisMedicine = async (req, res, next) => {
  try {
    const { diagnosisId } = req.query;

    let chartData = {
      nameKr: '',
      medicineArr: [],
      effectMajorArr: [],
      effectModerateArr: [],
      effectSlightArr: [],
      effectNoneArr: [],
      effectCanNotTellArr: [],
      sideEffectSevereArr: [],
      sideEffectModerateArr: [],
      sideEffectMildArr: [],
      sideEffectNoneArr: [],
    };

    /** nameKr */
    const val_1 = await Diagnosis.findOne({
      attributes: ['nameKr'],
      where: { id: diagnosisId }
    });
    
    chartData["nameKr"] = val_1.nameKr;

    /** medicineArr */
    let medicineIdArr = [];  // medicine의 id만 담기는 배열. medicineEvaluationData의 id별 추출에 사용

    const val_2 = await Medicine.findAll({
      attributes: ['id', 'nameKr', [Sequelize.fn('COUNT', Sequelize.col('medicinePurposeData.id')), 'count']],
      include: [{
        model: MedicinePurposeData,
        attributes: [],
        where: { fkDiagnosisId: diagnosisId }  // requried: true(inner join)
      }],
      group: ['id', 'nameKr'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('medicinePurposeData.id')), 'DESC']],
      // limit: 10  // 복잡한 SQL문 상 오류 발생
    });

    for (let i = 0; i < 10; i++) {  // val_2 배열의 0 ~ 9번째 요소에 대하여
      if (!val_2[i]) break;  // (결과 배열 요소 개수가 10개 이하일 수 있으므로) 해당 배열 요소가 존재하지 않을 경우 반복문을 탈출.
      else {
        chartData["medicineArr"].push(val_2[i].nameKr);
        medicineIdArr.push(val_2[i].id);
      }
    }
    
    /* 뽑히는 수만큼만 자료를 추출해야 한다. 10개 이하로 뽑힐 수 있으므로 추출 개수를 딱 10개로 정해놓으면 안된다. */
    let countVal;

    /** 
     * 함수 정의 시 async를 붙여야만 내부에서 await을 쓸 수 있다(try catch를 꼭 써야 하는 것은 아니다)
     * 즉시 실행 함수 : ( function() {} )()
     * 배열 반복문 for...of는 for each와 다르게 병렬(?)로 처리를 할 수 있게 해준다고 한다.
      비동기 처리(모든 배열에 값을 다 집어 넣은 후에 return)를 위해 도입.
    */
    (async () => {
      for (let id of medicineIdArr) {
        countVal = await MedicinePurposeData.count({ where: {'fkMedicineId': id, 'perceivedEffectiveness': 5 }});
        chartData["effectMajorArr"].push(countVal);
        countVal = await MedicinePurposeData.count({ where: {'fkMedicineId': id, 'perceivedEffectiveness': 4 }});
        chartData["effectModerateArr"].push(countVal);
        countVal = await MedicinePurposeData.count({ where: {'fkMedicineId': id, 'perceivedEffectiveness': 3 }});
        chartData["effectSlightArr"].push(countVal);
        countVal = await MedicinePurposeData.count({ where: {'fkMedicineId': id, 'perceivedEffectiveness': 2 }});
        chartData["effectNoneArr"].push(countVal);
        countVal = await MedicinePurposeData.count({ where: {'fkMedicineId': id, 'perceivedEffectiveness': 1 }});
        chartData["effectCanNotTellArr"].push(countVal);
        countVal = await MedicineEvaluationData.count({ where: {'fkMedicineId': id, 'sideEffects': 5 }});
        chartData["sideEffectSevereArr"].push(countVal);
        countVal = await MedicineEvaluationData.count({ where: {'fkMedicineId': id, 'sideEffects': 4 }});
        chartData["sideEffectModerateArr"].push(countVal);
        countVal = await MedicineEvaluationData.count({ where: {'fkMedicineId': id, 'sideEffects': 3 }});
        chartData["sideEffectMildArr"].push(countVal);
        countVal = await MedicineEvaluationData.count({ where: {'fkMedicineId': id, 'sideEffects': 2 }});
        chartData["sideEffectNoneArr"].push(countVal);
      }
      return res.status(200).json({ chartData });
    })();
  } catch (e) {
    next(e);
  }
}

module.exports = showDiagnosisMedicine;


/** chartData = 
{
  nameKr,
  medicineArr,
  effectMajorArr,
  effectModerateArr,
  effectSlightArr,
  effectNoneArr,
  effectCanNotTellArr,
  sideEffectSevereArr,
  sideEffectModerateArr,
  sideEffectMildArr,
  sideEffectNoneArr
} */

// SELECT `medicine`.`id`, `medicine`.`nameKr`, COUNT(`medicinePurposeData`.`id`) AS `count`
// FROM `medicines` AS `medicine` INNER JOIN `medicinePurposeData` AS `medicinePurposeData`
//   ON `medicine`.`id` = `medicinePurposeData`.`fkMedicineId`
//     AND `medicinePurposeData`.`fkDiagnosisId` = '1'
// GROUP BY `nameKr` 
// ORDER BY COUNT(`medicinePurposeData`.`id`) DESC;

// SELECT `medicine`.*
// FROM (
//   SELECT `medicine`.`id`, `medicine`.`nameKr`, COUNT(`medicinePurposeData`.`id`) AS `count` 
//   FROM `medicines` AS `medicine`
//   WHERE (
//     SELECT `fkMedicineId`
//     FROM `medicinePurposeData` AS `medicinePurposeData`
//     WHERE (
//       `medicinePurposeData`.`fkDiagnosisId` = \'1\'
//         AND `medicinePurposeData`.`fkMedicineId` = `medicine`.`id`
//     ) 
//     LIMIT 1
//   ) IS NOT NULL
//   GROUP BY `nameKr`
//   ORDER BY COUNT(`medicinePurposeData`.`id`) DESC
//   LIMIT 10
// ) AS `medicine` INNER JOIN `medicinePurposeData` AS `medicinePurposeData`
//   ON `medicine`.`id` = `medicinePurposeData`.`fkMedicineId`
//     AND `medicinePurposeData`.`fkDiagnosisId` = \'1\'
// ORDER BY COUNT(`medicinePurposeData`.`id`) DESC;