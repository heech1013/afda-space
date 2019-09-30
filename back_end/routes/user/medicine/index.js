const { User, Medicine, MedicineEvaluationData, MedicineSideEffectsData, MedicinePurposeData, Diagnosis, Symptom } = require('../../../models');

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    const uncleanedMedicineData = await User.findOne({
      attributes: ['id'], where: { id },
      include: [
        {
          model: MedicinePurposeData, as: 'RegisteringMedicinePurposeData', attributes: ['id', 'perceivedEffectiveness'],
          include: [
            { model: Diagnosis, as: 'UsedMedicineForDiagnosis', attributes: ['nameKr']},
            { model: Symptom, as: 'UsedMedicineForSymptom', attributes: ['nameKr']},
            {
              model: Medicine, as: 'RegisteredMedicinePurposeData', attributes: ['nameKr'],
              include: [
                { model: MedicineEvaluationData, as: 'RegisteredMedicineEvaluationData', attributes: ['sideEffects', 'fkMedicineId']},
                {
                  model: MedicineSideEffectsData, as: 'RegisteredMedicineSideEffectsData', attributes: ['id'],
                  include: [{ model: Symptom, as: 'SymptomOfSideEffects', attributes: ['nameKr']}]
                }
              ]
            }
          ]
        }
      ]
    });

    const contents = uncleanedMedicineData.RegisteringMedicinePurposeData.map((obj) => {
      const { id } = obj;
      const medicineName = obj.RegisteredMedicinePurposeData.nameKr;  // 이름 혹은 null
      const purposeOfPrescription = obj.UsedMedicineForDiagnosis ? obj.UsedMedicineForDiagnosis.nameKr
                                      : obj.UsedMedicineForSymptom ? obj.UsedMedicineForSymptom.nameKr : null;
      const perceivedEffect = !obj.perceivedEffectiveness ? null
                                : obj.perceivedEffectiveness = 1 ? '알 수 없다'
                                  : obj.perceivedEffectiveness = 2 ? '없다'
                                    : obj.perceivedEffectiveness = 3 ? '약간'
                                      : obj.perceivedEffectiveness = 4 ? '보통'
                                        : obj.perceivedEffectiveness = 5 ? '크다' : '정보를 받아올 수 없습니다. 서버 관리자에게 문의해주세요.';
      const degreeOfSideEffect = !obj.RegisteredMedicinePurposeData.RegisteredMedicineEvaluationData.sideEffects ? null
                                  : obj.RegisteredMedicinePurposeData.RegisteredMedicineEvaluationData.sideEffects = 1 ? '없다'
                                    : obj.RegisteredMedicinePurposeData.RegisteredMedicineEvaluationData.sideEffects = 2 ? '약간'
                                      : obj.RegisteredMedicinePurposeData.RegisteredMedicineEvaluationData.sideEffects = 3 ? '중간'
                                        : obj.RegisteredMedicinePurposeData.RegisteredMedicineEvaluationData.sideEffects = 4 ? '심각' : '정보를 받아올 수 없습니다. 서버 관리자에게 문의해주세요.';
      const symptomOfSideEffect = obj.RegisteredMedicinePurposeData.RegisteredMedicineSideEffectsData ? obj.RegisteredMedicinePurposeData.RegisteredMedicineSideEffectsData[0].SymptomOfSideEffects.nameKr : null;

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