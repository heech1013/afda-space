const { User, Medicine, MedicineData, MedicineEvaluationData, MedicineSideEffectsData, MedicinePurposeData, Diagnosis, Symptom } = require('../../../models');

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    const uncleanedMedicineData = await User.findOne({
      attributes: ['id'], where: { id },
      include: [
        {
          model: MedicineData, as: 'RegisteringMedicineData', attributes: ['id'],
          include: [{
              model: Medicine, as: 'RegisteredMedicineData', attributes: ['nameKr'],
              include: [
                {
                  model: MedicinePurposeData, as: 'RegisteredMedicinePurposeData', attributes: ['id', 'perceivedEffectiveness'],
                  include: [
                    { model: Diagnosis, as: 'UsedMedicineForDiagnosis', attributes: ['nameKr']},
                    { model: Symptom, as: 'UsedMedicineForSymptom', attributes: ['nameKr']},
                  ]
                },
                { model: MedicineEvaluationData, as: 'RegisteredMedicineEvaluationData', attributes: ['sideEffects', 'fkMedicineId']},
                {
                  model: MedicineSideEffectsData, as: 'RegisteredMedicineSideEffectsData', attributes: ['id'],
                  include: [{ model: Symptom, as: 'SymptomOfSideEffects', attributes: ['nameKr']}]
                }
              ]
          }]
          
          // model: MedicinePurposeData, as: 'RegisteringMedicinePurposeData', attributes: ['id', 'perceivedEffectiveness'],
          // include: [
          //   { model: Diagnosis, as: 'UsedMedicineForDiagnosis', attributes: ['nameKr']},
          //   { model: Symptom, as: 'UsedMedicineForSymptom', attributes: ['nameKr']},
          //   {
          //     model: Medicine, as: 'RegisteredMedicinePurposeData', attributes: ['nameKr'],
          //     include: [
          //       { model: MedicineEvaluationData, as: 'RegisteredMedicineEvaluationData', attributes: ['sideEffects', 'fkMedicineId']},
          //       {
          //         model: MedicineSideEffectsData, as: 'RegisteredMedicineSideEffectsData', attributes: ['id'],
          //         include: [{ model: Symptom, as: 'SymptomOfSideEffects', attributes: ['nameKr']}]
          //       }
          //     ]
          //   }
          // ]
        }
      ]
    });

    // console.log(uncleanedMedicineData.RegisteringMedicineData);

    const contents = uncleanedMedicineData.RegisteringMedicineData.map((obj) => {
      const { id } = obj;
      const medicineName = obj.RegisteredMedicineData.nameKr;  // 이름 혹은 null
      
      // let purposeOfPrescription;
      // if (obj.RegisteredMedicineData.RegisteredMedicinePurposeData.UsedMedicineForDiagnosis) purposeOfPrescription = obj.RegisteredMedicineData.RegisteredMedicinePurposeData.UsedMedicineForDiagnosis.nameKr;
      // else if (obj.RegisteredMedicineData.RegisteredMedicinePurposeData.UsedMedicineForSymptom) purposeOfPrescription = obj.RegisteredMedicineData.RegisteredMedicinePurposeData.UsedMedicineForSymptom.nameKr;
      // else purposeOfPrescription = '-';
      
      const purposeData = obj.RegisteredMedicineData.RegisteredMedicinePurposeData;
      const purposeOfPrescription = purposeData.UsedMedicineForDiagnosis ? purposeData.UsedMedicineForDiagnosis.nameKr
                                      : purposeData.UsedMedicineForSymptom ? purposeData.UsedMedicineForSymptom.nameKr : '-';
      console.log("1111111111:\n", purposeData, '\n');

      let perceivedEffect;
      switch (purposeData.perceivedEffectiveness) {
        case 1: perceivedEffect = '알 수 없다'; break;
        case 2: perceivedEffect = '없다'; break;
        case 3: perceivedEffect = '약간'; break;
        case 4: perceivedEffect = '보통'; break;
        case 5: perceivedEffect = '크다'; break;
        default: perceivedEffect = '-';
      }
      console.log("2222222222:\n", purposeData.perceivedEffectiveness, '\n');
      // const perceivedEffect = !purposeData.perceivedEffectiveness ? '-'
      //                           : purposeData.perceivedEffectiveness = 1 ? '알 수 없다'
      //                             : purposeData.perceivedEffectiveness = 2 ? '없다'
      //                               : purposeData.perceivedEffectiveness = 3 ? '약간'
      //                                 : purposeData.perceivedEffectiveness = 4 ? '보통'
      //                                   : purposeData.perceivedEffectiveness = 5 ? '크다' : '정보를 받아올 수 없습니다. 서버 관리자에게 문의해주세요.';

      let degreeOfSideEffect;
      switch (obj.RegisteredMedicineData.RegisteredMedicineEvaluationData.sideEffects) {
        case 1: degreeOfSideEffect = '없다'; break;
        case 2: degreeOfSideEffect = '약간'; break;
        case 3: degreeOfSideEffect = '중간'; break;
        case 4: degreeOfSideEffect = '심각'; break;
        default: degreeOfSideEffect = '-';
      }
      console.log("3333333333:\n", obj.RegisteredMedicineData.RegisteredMedicineEvaluationData.sideEffects, '\n');

      // const degreeOfSideEffect = !obj.RegisteredMedicineData.RegisteredMedicineEvaluationData.sideEffects ? '-'
      //                             : obj.RegisteredMedicineData.RegisteredMedicineEvaluationData.sideEffects = 1 ? '없다'
      //                               : obj.RegisteredMedicineData.RegisteredMedicineEvaluationData.sideEffects = 2 ? '약간'
      //                                 : obj.RegisteredMedicineData.RegisteredMedicineEvaluationData.sideEffects = 3 ? '중간'
      //                                   : obj.RegisteredMedicineData.RegisteredMedicineEvaluationData.sideEffects = 4 ? '심각' : '정보를 받아올 수 없습니다. 서버 관리자에게 문의해주세요.';
      const symptomOfSideEffect = obj.RegisteredMedicineData.RegisteredMedicineSideEffectsData ? obj.RegisteredMedicineData.RegisteredMedicineSideEffectsData[0].SymptomOfSideEffects.nameKr + ' 등' : '-';

      return {
        id,
        medicineName,
        purposeOfPrescription,
        perceivedEffect,
        degreeOfSideEffect,
        symptomOfSideEffect
      }
    });

    return res.json({ contents });
  } catch (error) {
    next(error);
  }
};

module.exports = index;