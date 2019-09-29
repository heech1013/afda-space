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

    const contents = uncleanedMedicineData.map((obj) => {
      const { RegisteringMedicinePurposeData, RegisteringMedicineEvaluationData, RegisteringMedicineSideEffectsData } = obj;
      const { id } = RegisteringMedicinePurposeData;
      const medicineName = RegisteringMedicinePurposeData.RegisteredMedicinePurposeData.nameKr;  // 이름 혹은 null
      const purposeOfPrescription = RegisteringMedicinePurposeData.UsedMedicineForDiagnosis ? RegisteringMedicinePurposeData.UsedMedicineForDiagnosis.nameKr
                                      : RegisteringMedicinePurposeData.UsedMedicineForSymptom ? RegisteringMedicinePurposeData.UsedMedicineForSymptom.nameKr : null;
      const perceivedEffect = !RegisteringMedicinePurposeData.perceivedEffectiveness ? null
                                : RegisteringMedicinePurposeData.perceivedEffectiveness = 1 ? '알 수 없다'
                                  : RegisteringMedicinePurposeData.perceivedEffectiveness = 2 ? '없다'
                                    : RegisteringMedicinePurposeData.perceivedEffectiveness = 3 ? '약간'
                                      : RegisteringMedicinePurposeData.perceivedEffectiveness = 4 ? '보통'
                                        : RegisteringMedicinePurposeData.perceivedEffectiveness = 5 ? '크다' : '정보를 받아올 수 없습니다. 서버 관리자에게 문의해주세요.';
      const degreeOfSideEffect = !RegisteringMedicineEvaluationData.sideEffects ? null
                                  : RegisteringMedicineEvaluationData.sideEffects = 1 ? '없다'
                                    : RegisteringMedicineEvaluationData.sideEffects = 2 ? '약간'
                                      : RegisteringMedicineEvaluationData.sideEffects = 3 ? '중간'
                                        : RegisteringMedicineEvaluationData.sideEffects = 4 ? '심각' : '정보를 받아올 수 없습니다. 서버 관리자에게 문의해주세요.';
      const symptomOfSideEffect = RegisteringMedicineSideEffectsData ? RegisteringMedicineSideEffectsData.symptomOfSideEffect.nameKr : null;

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